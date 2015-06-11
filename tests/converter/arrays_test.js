/**
 * icu-converter
 * https://github.com/alex-dow/icu-converter
 *
 * Copyright (c) 2015 Alex Dowgailenko
 * Licensed under the MIT License
 * https://github.com/alex-dow/icu-converter/blob/master/LICENSE
 */

var expect = require('chai').expect;
var ICUConverter = require('../../src/icu-converter');
var fs = require('fs');

describe("Converter", function() {

  function getJsObj(fileName) {
    var jsObj = ICUConverter.parse(fs.readFileSync(fileName, 'utf-8'));
    return jsObj;
  }

  it("can process a simple array", function() {

    var fixtureFile = "tests/fixtures/arrays/array1.txt";
    var jsObj = getJsObj(fixtureFile);

    expect(jsObj.root.arrayitem).to.be.an('array');
    expect(jsObj.root.arrayitem[0]).to.equal('string1');
    expect(jsObj.root.arrayitem[1]).to.equal('string2');
    expect(jsObj.root.arrayitem[2]).to.equal('string3');
  });

  it ("can process an array with a table as the first item", function() {
    var fixtureFile = "tests/fixtures/arrays/array2.txt";
    var jsObj = getJsObj(fixtureFile);

    expect(jsObj.root.arrayitem).to.be.an('array');
    expect(jsObj.root.arrayitem[0]).to.be.an('object');
    expect(jsObj.root.arrayitem[0].tableitem).to.be.an('object');
    expect(jsObj.root.arrayitem[0].tableitem.fldName).to.equal('string1');
    expect(jsObj.root.arrayitem[1]).to.equal('string2');
    expect(jsObj.root.arrayitem[2]).to.equal('string3');
  });

  it("can process an array with a table as the second item", function() {
    var fixtureFile = "tests/fixtures/arrays/array3.txt";
    var jsObj = getJsObj(fixtureFile);

    expect(jsObj.root.arrayitem[0]).to.equal('string1');
    expect(jsObj.root.arrayitem[1]).to.be.an('object');
    expect(jsObj.root.arrayitem[1].tableitem).to.be.an('object');
    expect(jsObj.root.arrayitem[1].tableitem.fldname).to.equal('string2');
    expect(jsObj.root.arrayitem[2]).to.equal('string3');
  });

  it("can process an array with a table as the last item", function() {
    var fixtureFile = "tests/fixtures/arrays/array4.txt";
    var jsObj = getJsObj(fixtureFile);

    expect(jsObj.root.arrayitem[0]).to.equal('string1');
    expect(jsObj.root.arrayitem[1]).to.equal('string2');
    expect(jsObj.root.arrayitem[2]).to.be.an('object');
    expect(jsObj.root.arrayitem[2].tableitem).to.be.an('object');
    expect(jsObj.root.arrayitem[2].tableitem.fldname).to.equal('string3');
  });

  it("can process a simple array deeper in the hierarchy", function() {
    var fixtureFile = "tests/fixtures/arrays/array5.txt";
    var jsObj = getJsObj(fixtureFile);

    expect(jsObj.root.object.arrayitem[0]).to.equal('string1');
    expect(jsObj.root.object.arrayitem[1]).to.equal('string2');
    expect(jsObj.root.object.arrayitem[2]).to.equal('string3');
  });

  it("can process an array deeper in the hierarchy with a table as the first item", function() {
    var fixtureFile = "tests/fixtures/arrays/array6.txt";
    var jsObj = getJsObj(fixtureFile);

    expect(jsObj.root.object.arrayitem[0].tableitem.fldname).to.equal('string1');
    expect(jsObj.root.object.arrayitem[1]).to.equal('string2');
    expect(jsObj.root.object.arrayitem[2]).to.equal('string3');
  });

  it("can process an array deeper in the hierarchy with a table as the second item", function() {
    var fixtureFile = "tests/fixtures/arrays/array7.txt";
    var jsObj = getJsObj(fixtureFile);

    expect(jsObj.root.object.arrayitem[0]).to.equal('string1');
    expect(jsObj.root.object.arrayitem[1].tableitem.fldname).to.equal('string2');
    expect(jsObj.root.object.arrayitem[2]).to.equal('string3');
  });

  it("can process an array deeper in the hierarchy with a table as the last item", function() {
    var fixtureFile = "tests/fixtures/arrays/array8.txt";
    var jsObj = getJsObj(fixtureFile);

    expect(jsObj.root.object.arrayitem[0]).to.equal('string1');
    expect(jsObj.root.object.arrayitem[1]).to.equal('string2');
    expect(jsObj.root.object.arrayitem[2].tableitem.fldname).to.equal('string3');
  });

  it("can process an array as the first item in an array", function() {
    var fixtureFile = "tests/fixtures/arrays/array9.txt";
    var jsObj = getJsObj(fixtureFile);

    expect(jsObj.root.arrayitem[0][0]).to.equal('string1');
    expect(jsObj.root.arrayitem[0][1]).to.equal('string2');
    expect(jsObj.root.arrayitem[0][2]).to.equal('string3');
    expect(jsObj.root.arrayitem[1]).to.equal('string2');
    expect(jsObj.root.arrayitem[2]).to.equal('string3');
  });

  it("can process an array as the second item in an array", function() {
    var fixtureFile = "tests/fixtures/arrays/array10.txt";
    var jsObj = getJsObj(fixtureFile);

    expect(jsObj.root.arrayitem[0]).to.equal('string1');
    expect(jsObj.root.arrayitem[1][0]).to.equal('string1');
    expect(jsObj.root.arrayitem[1][1]).to.equal('string2');
    expect(jsObj.root.arrayitem[1][2]).to.equal('string3');
    expect(jsObj.root.arrayitem[2]).to.equal('string3');
  });

  it("can process an array as the last item in an array", function() {
    var fixtureFile = "tests/fixtures/arrays/array11.txt";
    var jsObj = getJsObj(fixtureFile);

    expect(jsObj.root.arrayitem[0]).to.equal('string1');
    expect(jsObj.root.arrayitem[1]).to.equal('string2');
    expect(jsObj.root.arrayitem[2][0]).to.equal('string1');
    expect(jsObj.root.arrayitem[2][1]).to.equal('string2');
    expect(jsObj.root.arrayitem[2][2]).to.equal('string3');
  });

  it("will force element to be an array if keyname has :array suffix", function() {
    var fixtureFile = "tests/fixtures/arrays/array12.txt";
    var jsObj = getJsObj(fixtureFile);

    expect(jsObj.root.arrayitem[0]).to.equal('string1');
  });
});

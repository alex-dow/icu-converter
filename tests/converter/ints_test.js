/**
 * icu-converter
 * https://github.com/alex-dow/icu-converter
 *
 * Copyright (c) 2015 Alex Dowgailenko
 * Licensed under the MIT License
 * https://github.com/alex-dow/icu-converter/blob/master/LICENSE
 */

describe("Converter", function() {

  var ICUConverter = require('../../src/icu-converter');
  var fs = require('fs');
  var expect = require('chai').expect;

  function getJsObj(fileName) {
    var jsObj = ICUConverter.parse(fs.readFileSync(fileName, 'utf-8'));
    return jsObj;
  }

  it("can process a list of ints", function() {
    var jsObj = getJsObj("tests/fixtures/ints/int1.txt");
    expect(jsObj.root.numbers).to.eql([1,2,3]);
  });

  it("can process a list of negative ints", function() {
    var jsObj = getJsObj("tests/fixtures/ints/int2.txt");
    expect(jsObj.root.numbers).to.eql([-1,-2,-3]);
  });

  it("can process a single int value", function() {
    var jsObj = getJsObj("tests/fixtures/ints/int3.txt");
    expect(jsObj.root.number).to.equal(1);
  });

  it("can process a single negative int value", function() {
    var jsObj = getJsObj("tests/fixtures/ints/int4.txt");
    expect(jsObj.root.number).to.equal(-1);
  });

  it("can process a list of ints that have numeric keys", function() {
    var jsObj = getJsObj('tests/fixtures/ints/int5.txt');
    expect(jsObj.root['1000'][0]).to.equal(1);
    expect(jsObj.root['1000'][1]).to.equal(2);
    expect(jsObj.root['1000'][2]).to.equal(3);

    expect(jsObj.root['1001'][0]).to.equal(1);
    expect(jsObj.root['1001'][1]).to.equal(2);
    expect(jsObj.root['1001'][2]).to.equal(3);
  });

});

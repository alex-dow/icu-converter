/**
 * icu-converter
 * https://github.com/alex-dow/icu-converter
 *
 * Copyright (c) 2015 Alex Dowgailenko
 * Licensed under the MIT License
 * https://github.com/alex-dow/icu-converter/blob/master/LICENSE
 */

describe("Converter", function() {

  var ICUConverter = require('../../src/converter');
  var fs = require('fs');
  var expect = require('chai').expect;

  function getJsObj(fileName) {
    var converter = new ICUConverter();
    var jsObj = converter.convert(fs.readFileSync(fileName, 'utf-8'));
    return jsObj;
  } 

  it("can handle everything being explicitly typed", function() {
    var obj = getJsObj("tests/fixtures/types/type1.txt");
    expect(obj.root.msgid).to.equal('string1');
    expect(obj.root.msgid2).to.eql(['string1','string2','string3']);
    expect(obj.root.msgid3).to.eql(['string1','string2','string3']);
    expect(obj.root.msgid4).to.equal(10);
    expect(obj.root.msgid5).to.equal(5);
    expect(obj.root.msgid6).to.eql([1,2,3]);
  });

  it("can handle an array of strings typed all differently", function() {
    var obj = getJsObj("tests/fixtures/types/type2.txt");
    expect(obj.root.msgs).to.eql(['string1','string2','string3']);
  });
 
  it("can handle converting strings to integers when possible", function() {
    var obj = getJsObj("tests/fixtures/types/type3.txt");
    expect(obj.root.msgid).to.equal(10);
    expect(obj.root.msgid2).to.equal(10);
  });
 
  it("can force a single item to be an array", function() {
    var obj = getJsObj("tests/fixtures/types/type4.txt");
    expect(obj.root.arr).to.eql(['string1']);
  });

  it("can force a nested single tiem to be an array", function() {
    var obj = getJsObj("tests/fixtures/types/type5.txt");
    expect(obj.root.msgid.arr).to.eql(['string1']);
  });
});

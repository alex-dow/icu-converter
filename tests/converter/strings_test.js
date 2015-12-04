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

  it("can process a simple string", function() {
    var jsObj = getJsObj("tests/fixtures/strings/string1.txt");
    expect(jsObj.root.msgid).to.equal('string');
  });

  it("can process a string on multiple lines", function() {
    var jsObj = getJsObj("tests/fixtures/strings/string2.txt");
    expect(jsObj.root.msgid).to.equal('string\nstring\nstring');
  });

  it("can process a MessageFormat string on a single line", function() {
    var jsObj = getJsObj("tests/fixtures/strings/string3.txt");
    expect(jsObj.root.msgid).to.equal('MessageFormat {0, plural, {one{stuff}}}');
  });

  it("can process a MessageFormat string on multiple lines", function() {
    var jsObj = getJsObj("tests/fixtures/strings/string4.txt");
    expect(jsObj.root.msgid).to.equal('MessageFormat {0, plural, \n    { one\n      { stuff }\n    }\n  }');
  });

  it("treats a list of strings without a comma as a single string", function() {
    var jsObj = getJsObj("tests/fixtures/strings/string5.txt");
    expect(jsObj.root.msgid).to.eql('string1string2string3');
  });

  it("treats a list of strings with a comma as an array", function() {
    var jsObj = getJsObj("tests/fixtures/strings/string6.txt");
    expect(jsObj.root.msgid).to.eql(['string1','string2','string3']);
  });

  it("handles escaped characters", function() {
    var jsObj = getJsObj("tests/fixtures/strings/string7.txt");
    expect(jsObj.root.msgid).to.eql('"string"');
  });

});

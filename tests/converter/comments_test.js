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

  it("can process a simple comment", function() {
    var jsObj = getJsObj("tests/fixtures/comments/comments1.txt");
    expect(jsObj.root.msgid).to.equal('string');
  });
  
  it("can process a tailing comment", function() {
	var jsObj = getJsObj("tests/fixtures/comments/comments2.txt");
	expect(jsObj.root.msgid).to.equal('string');
  });
  
  it("can process a nested comment", function() {
	var jsObj = getJsObj("tests/fixtures/comments/comments3.txt");
	expect(jsObj.root.msgid).to.equal('string');
	expect(jsObj.root.nested.somestring).to.equal('somestring');
  });

});

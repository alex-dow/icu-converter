describe("Converter", function() {

  var ICUConverter = require('../../src/converter');
  var fs = require('fs');
  var expect = require('chai').expect;

  function getJsObj(fileName) {
    var converter = new ICUConverter();
    var jsObj = converter.convert(fs.readFileSync(fileName, 'utf-8'));
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
    expect(jsObj.root.msgid).to.equal('MessageFormat {0, plural,\n{ one\n{ stuff }\n}\n}');
  }); 
});

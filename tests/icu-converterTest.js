var expect = require('chai').expect;
var ICUConverter = require('../src/icu-converter');

describe("Converter", function() {

  it("converts a string resource to a JS object", function() {

    var simpleResource = 'root { msgid { "message" } }';

    var converter = new ICUConverter();

    var bundleObj = converter.convert(simpleResource);

    expect(bundleObj.root.msgid).to.equal('message');
  });

  it("converts a simple array resource to a JS object", function() {

    var arrayResource = 'root { msgid { { "message 1" }, { "message 2" }}}';

    var converter = new ICUConverter();
    
    var bundleObj = converter.convert(arrayResource);

    expect(bundleObj.root.msgid[0]).to.equal('message 1');
    expect(bundleObj.root.msgid[1]).to.equal('message 2');

  });

  it("converts complex types in array resources to json strings without new lines", function() {

    var arrayResource = 'root { msgid { { "message 1" }, { tableName { fldName { "string" } } } } }';

    var converter = new ICUConverter();
    var bundleObj = converter.convert(arrayResource);

    expect(bundleObj.root.msgid[0]).to.equal('message 1');
    expect(bundleObj.root.msgid[1].tableName.fldName).to.equal('string');
    console.log(bundleObj);

  });

});

describe("Converter", function() {

  function getJsObj(fileName) {
    var converter = new ICUConverter();
    var jsObj = converter.convert(fs.readFileSync(fileName, 'utf-8'));
    return jsObj;
  }

  var expect = require('chai').expect;
  var ICUConverter = require('../../src/icu-converter');
  var fs = require('fs');

  it("can process a deeply nested structure", function() {
    var jsObj = getJsObj('tests/fixtures/tables/table1.txt');
    expect(jsObj.root.table1.table2.table3.table4.fldname).to.equal('string');
  });

  it("can process multiple second level tables", function() {
    var jsObj = getJsObj('tests/fixtures/tables/table2.txt');
    expect(jsObj.root.table1.fldname).to.equal('string');
    expect(jsObj.root.table2.fldname).to.equal('string');
  });



});

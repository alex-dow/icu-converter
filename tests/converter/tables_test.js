/**
 * icu-converter
 * https://github.com/alex-dow/icu-converter
 *
 * Copyright (c) 2015 Alex Dowgailenko
 * Licensed under the MIT License
 * https://github.com/alex-dow/icu-converter/blob/master/LICENSE
 */

describe("Converter", function() {

  var expect = require('chai').expect;
  var ICUConverter = require('../../src/icu-converter');
  var fs = require('fs');

  function getJsObj(fileName) {
    var jsObj = ICUConverter.parse(fs.readFileSync(fileName, 'utf-8'));
    return jsObj;
  }

  it("can process a deeply nested structure", function() {
    var jsObj = getJsObj('tests/fixtures/tables/table1.txt');
    expect(jsObj.root.table1.table2.table3.table4.fldname).to.equal('string');
  });

  it("can process multiple second level tables", function() {
    var jsObj = getJsObj('tests/fixtures/tables/table2.txt');
    expect(jsObj.root.table1.fldname).to.equal('string');
    expect(jsObj.root.table2.fldname).to.equal('string');
  });

  it("can process a nested structure with a mix of numeric and string keys", function() {
    var jsObj = getJsObj('tests/fixtures/tables/table4.txt');
    expect(jsObj.root.msgid).to.equal('string');
    expect(jsObj.root['1000']).to.equal('string2');
    expect(jsObj.root.nest1['1000']).to.equal('second string 1');
    expect(jsObj.root.nest1['1001']).to.equal('second string 2');
    expect(jsObj.root.nest2.nest22.id1).to.equal('third string 1');
    expect(jsObj.root.nest2.nest22.id2).to.equal('third string 2');
    expect(jsObj.root.nest2['1000'].id1).to.equal('fourth string 1');
    expect(jsObj.root.nest2['1000'].id2).to.equal('fourth string 2');
  });

});

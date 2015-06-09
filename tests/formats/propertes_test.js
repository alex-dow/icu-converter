describe("The Properties Writer", function() {

  var expect = require('chai').expect;
  var fs = require('fs');
  var writer, spy;
  var sinon = require('sinon');
  var mockery = require('mockery');
  var ICUConverter = require('../../src/converter');
  var parser = require('../../src/formats/properties');

  function getJsObj(fileName) {
    var converter = new ICUConverter();
    var jsObj = converter.convert(fs.readFileSync(fileName, 'utf-8'));
    return jsObj;
  }

  it("handles a simple array", function() {
    var expected = fs.readFileSync('tests/fixtures/arrays/array1.properties', 'utf-8');
    var jsObj = getJsObj('tests/fixtures/arrays/array1.txt');    

    var content = parser.stringify(jsObj);
    expect(content).to.equal(expected);
  });

  it("handles an array with a table as first item", function() {
    var expected = fs.readFileSync('tests/fixtures/arrays/array2.properties', 'utf-8');
    var jsObj = getJsObj('tests/fixtures/arrays/array2.txt');

    var content = parser.stringify(jsObj);
    expect(content).to.equal(expected);
  });

  it("handles an array with a table as the second item", function() {
    var expected = fs.readFileSync('tests/fixtures/arrays/array3.properties', 'utf-8');
    var jsObj = getJsObj('tests/fixtures/arrays/array3.txt');

    var content = parser.stringify(jsObj);
    expect(content).to.equal(expected);
  });

  it("handles an array with a table as the third item", function() {
    var expected = fs.readFileSync('tests/fixtures/arrays/array4.properties', 'utf-8');
    var jsObj = getJsObj('tests/fixtures/arrays/array4.txt');

    var content = parser.stringify(jsObj);
    expect(content).to.equal(expected);
  });

  it("handles a simple array deeper in the heirarchy", function() {
    var expected = fs.readFileSync('tests/fixtures/arrays/array5.properties', 'utf-8');
    var jsObj = getJsObj('tests/fixtures/arrays/array5.txt');

    var content = parser.stringify(jsObj);
    expect(content).to.equal(content);  
  });

  it("handles an array with a table as the first item deeper in the heirarchy", function() {
    var expected = fs.readFileSync('tests/fixtures/arrays/array6.properties', 'utf-8');
    var jsObj = getJsObj('tests/fixtures/arrays/array6.txt');

    var content = parser.stringify(jsObj);
    expect(content).to.equal(expected);  
  });

  it("handles an array with a table as the second item deeper in the heirarchy", function() {
    var expected = fs.readFileSync('tests/fixtures/arrays/array7.properties', 'utf-8');
    var jsObj = getJsObj('tests/fixtures/arrays/array7.txt');

    var content = parser.stringify(jsObj);
    expect(content).to.equal(expected);  
  });

  it("handles an array with a table as the last item deeper in the heirarchy", function() {
    var expected = fs.readFileSync('tests/fixtures/arrays/array8.properties', 'utf-8');
    var jsObj = getJsObj('tests/fixtures/arrays/array8.txt');


    var content = parser.stringify(jsObj);
    expect(content).to.equal(expected);  
  });

  it("handles an array with an array as the first item", function() {
    var expected = fs.readFileSync('tests/fixtures/arrays/array9.properties', 'utf-8');
    var jsObj = getJsObj('tests/fixtures/arrays/array9.txt');

    var content = parser.stringify(jsObj);
    expect(content).to.equal(expected);  
  });

  it("handles an array with an array as the second item", function() {
    var expected = fs.readFileSync('tests/fixtures/arrays/array10.properties', 'utf-8');
    var jsObj = getJsObj('tests/fixtures/arrays/array10.txt');

    var content = parser.stringify(jsObj);
    expect(content).to.equal(expected);  
  });

  it("handles an array with an array as the lastt item", function() {
    var expected = fs.readFileSync('tests/fixtures/arrays/array11.properties', 'utf-8');
    var jsObj = getJsObj('tests/fixtures/arrays/array11.txt');

    var content = parser.stringify(jsObj);
    expect(content).to.equal(expected);  
  });

});

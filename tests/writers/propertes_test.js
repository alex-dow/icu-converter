describe("The Properties Writer", function() {

  var expect = require('chai').expect;
  var fs = require('fs');
  var writer, spy;
  var sinon = require('sinon');
  var mockery = require('mockery');
  var ICUConverter = require('../../src/converter');

  function getJsObj(fileName) {
    var converter = new ICUConverter();
    var jsObj = converter.convert(fs.readFileSync(fileName, 'utf-8'));
    return jsObj;
  }

  before(function() {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true
    });

    spy = sinon.spy();

    mockery.registerMock('fs', {
      'writeFileSync': spy
    });

    writer = require('../../src/writers/properties');

  });

  after(function() {
    mockery.deregisterAll();
    mockery.disable();
  });

  it("handles a simple array", function() {
    var expected = fs.readFileSync('tests/fixtures/arrays/array1.properties', 'utf-8');
    var jsObj = getJsObj('tests/fixtures/arrays/array1.txt');    

    writer(jsObj, 'fileName', {
      mkdir: false
    });
    expect(spy.args[0][1]).to.equal(expected);
  });

  it("handles an array with a table as first item", function() {
    var expected = fs.readFileSync('tests/fixtures/arrays/array2.properties', 'utf-8');
    var jsObj = getJsObj('tests/fixtures/arrays/array2.txt');

    writer(jsObj, 'fileName', {
      mkdir: false
    });
    expect(spy.args[1][1]).to.equal(expected);
  });

  it("handles an array with a table as the second item", function() {
    var expected = fs.readFileSync('tests/fixtures/arrays/array3.properties', 'utf-8');
    var jsObj = getJsObj('tests/fixtures/arrays/array3.txt');

    writer(jsObj, 'fileName', {
      mkdir: false
    });
  
    expect(spy.args[2][1]).to.equal(expected);
  });

  it("handles an array with a table as the third item", function() {
    var expected = fs.readFileSync('tests/fixtures/arrays/array4.properties', 'utf-8');
    var jsObj = getJsObj('tests/fixtures/arrays/array4.txt');

    writer(jsObj, 'fileName', {
      mkdir: false
    });

    expect(spy.args[3][1]).to.equal(expected);
  });

  it("handles a simple array deeper in the heirarchy", function() {
    var expected = fs.readFileSync('tests/fixtures/arrays/array5.properties', 'utf-8');
    var jsObj = getJsObj('tests/fixtures/arrays/array5.txt');
  
    writer(jsObj, 'fileName', {
      mkdir: false
    });

    expect(spy.args[4][1]).to.equal(expected);
  });

  it("handles an array with a table as the first item deeper in the heirarchy", function() {
    var expected = fs.readFileSync('tests/fixtures/arrays/array6.properties', 'utf-8');
    var jsObj = getJsObj('tests/fixtures/arrays/array6.txt');
  
    writer(jsObj, 'fileName', {
      mkdir: false
    });

    expect(spy.args[5][1]).to.equal(expected);
  });

  it("handles an array with a table as the second item deeper in the heirarchy", function() {
    var expected = fs.readFileSync('tests/fixtures/arrays/array7.properties', 'utf-8');
    var jsObj = getJsObj('tests/fixtures/arrays/array7.txt');
  
    writer(jsObj, 'fileName', {
      mkdir: false
    });

    expect(spy.args[6][1]).to.equal(expected);
  });

  it("handles an array with a table as the last item deeper in the heirarchy", function() {
    var expected = fs.readFileSync('tests/fixtures/arrays/array8.properties', 'utf-8');
    var jsObj = getJsObj('tests/fixtures/arrays/array8.txt');
  
    writer(jsObj, 'fileName', {
      mkdir: false
    });

    expect(spy.args[7][1]).to.equal(expected);
  });

  it("handles an array with an array as the first item", function() {
    var expected = fs.readFileSync('tests/fixtures/arrays/array9.properties', 'utf-8');
    var jsObj = getJsObj('tests/fixtures/arrays/array9.txt');
  
    writer(jsObj, 'fileName', {
      mkdir: false
    });

    expect(spy.args[8][1]).to.equal(expected);
  });

  it("handles an array with an array as the second item", function() {
    var expected = fs.readFileSync('tests/fixtures/arrays/array10.properties', 'utf-8');
    var jsObj = getJsObj('tests/fixtures/arrays/array10.txt');
  
    writer(jsObj, 'fileName', {
      mkdir: false
    });

    expect(spy.args[9][1]).to.equal(expected);
  });

  it("handles an array with an array as the lastt item", function() {
    var expected = fs.readFileSync('tests/fixtures/arrays/array11.properties', 'utf-8');
    var jsObj = getJsObj('tests/fixtures/arrays/array11.txt');
  
    writer(jsObj, 'fileName', {
      mkdir: false
    });

    expect(spy.args[10][1]).to.equal(expected);
  });

});

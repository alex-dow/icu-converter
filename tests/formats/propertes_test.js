/**
 * icu-converter
 * https://github.com/alex-dow/icu-converter
 *
 * Copyright (c) 2015 Alex Dowgailenko
 * Licensed under the MIT License
 * https://github.com/alex-dow/icu-converter/blob/master/LICENSE
 */

describe("The Properties Parser", function() {

  var expect = require('chai').expect;
  var fs = require('fs');
  var writer, spy;
  var sinon = require('sinon');
  var mockery = require('mockery');
  var ICUConverter = require('../../src/icu-converter');
  var parser = require('../../src/formats/properties');

  function getJsObj(fileName) {
    var jsObj = ICUConverter.parse(fs.readFileSync(fileName, 'utf-8'));
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

  it("can be configured to use a custom newline character", function() {

    var jsObj = { root: {
      key1: 'val1',
      key2: 'val2'
    }};

    var content = parser.stringify(jsObj, {
      newlineChar: '\r'
    });

    expect(content).to.equal('root.key1=val1\rroot.key2=val2\r');
  });

  it("escapes unicode characters by default", function() {

    var jsObj = { root: {
      key1: '\u2600',
      key2: '\u0301'
    }};

    var content = parser.stringify(jsObj);

    expect(content).to.equal('root.key1=\\u2600\nroot.key2=\\u0301\n');

  });

  it("does not escape unicode characters when configured to do so", function() {
    var jsObj = { root: {
      key1: '\u2600'
    }};
  
    var content = parser.stringify(jsObj, {
      unicode: true
    });
    expect(content).to.equal('root.key1=\u2600\n');
  });

  it("uses the configured separator", function() {
    var jsObj = { root: { key1: 'val1' } };
    
    var content = parser.stringify(jsObj, {
      separator: ':'
    });

    expect(content).to.equal('root.key1:val1\n');

    content = parser.stringify(jsObj, {
      separator: ' : '
    });
  
    expect(content).to.equal('root.key1 : val1\n');
  });

  it("escapes other whitespace properly", function() {
    var jsObj = { root: { key1: 'this has spaces' } };

    var content = parser.stringify(jsObj);
    expect(content).to.equal('root.key1=this has spaces\n');

    jsObj = { root: { key1: 'this has a \t tab'} };
    content = parser.stringify(jsObj);
    expect(content).to.equal('root.key1=this has a \\t tab\n');

    jsObj = { root: { key1: 'this has a \f form feed'} };
    content = parser.stringify(jsObj);
    expect(content).to.equal('root.key1=this has a \\f form feed\n');
  });

  it("escapes newlines by default", function() {
    var jsObj = { root: { key: 'on\nmany\nlines'}};
    var content = parser.stringify(jsObj);

    expect(content).to.equal('root.key=on\\nmany\\nlines\n');

    jsObj = { root: { key: 'on\rmany\rlines'}};
    var content = parser.stringify(jsObj);
    expect(content).to.equal('root.key=on\\rmany\\rlines\n');
  });

  it("can render multiline values if enabled", function() {
    var jsObj = { root: { key: 'on\nmany\nlines'}};
    var content = parser.stringify(jsObj, {
      newline: true
    });
    expect(content).to.equal('root.key=on\\\nmany\\\nlines\n');

    jsObj = { root: { key: 'on\rmany\rlines'}};
    content = parser.stringify(jsObj, {
      newline: true
    });
    expect(content).to.equal('root.key=on\\\rmany\\\rlines\n');
  });
});

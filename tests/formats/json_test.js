/**
 * icu-converter
 * https://github.com/alex-dow/icu-converter
 *
 * Copyright (c) 2015 Alex Dowgailenko
 * Licensed under the MIT License
 * https://github.com/alex-dow/icu-converter/blob/master/LICENSE
 */

describe("The JSON Parser", function() {

  var parser = require('../../src/formats/json');
  var expect = require('chai').expect;

  it("creates JSON string", function() {

    var jsObj = { root: { key: "val1" } };
    var results = parser.stringify(jsObj);

    expect(results).to.equal('{"root":{"key":"val1"}}');
  });

  it("passes configuration to JSON.stringify() properly", function() {
    var jsObj = { root: { key: "val1" } };
    var results = parser.stringify(jsObj, {
      spaces: 1
    });
    expect(results).to.equal('{\n "root": {\n  "key": "val1"\n }\n}');
  });
});


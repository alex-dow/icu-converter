/**
 * icu-converter
 * https://github.com/alex-dow/icu-converter
 *
 * Copyright (c) 2015 Alex Dowgailenko
 * Licensed under the MIT License
 * https://github.com/alex-dow/icu-converter/blob/master/LICENSE
 */
'use strict';

var _ = require('lodash');
var fs = require('fs');
var parser = require('./icu-format-parser');

module.exports = {

  /**
   * Parse a resource bundle
   *
   * @param string
   */
  parse: function(bundle) {
    return parser.parse(bundle);
  },

  /**
   * Parse a resource bundle file
   *
   * @param encoding Defaults to utf-8
   */
  parseFile: function(fn, encoding) {
    if (!encoding) {
      encoding = "utf-8";
    }
    
    var bundle = fs.readFileSync(fn, encoding);
    return parser.parse(bundle);
  },

  /**
   * Get a formatter
   *
   * Get a formatter that will convert a JS object to a specific format
   * @param format Name of the format, supported values are 'json', 'debug', and 'properties'
   */
  getFormatter: function(format) {
    return require('./formats/' + format);
  }
};


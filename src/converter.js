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

/**
 * ICU Converter
 *
 * Converts a resource bundle to a Javascript object
 */
var ICUConverter = function(opts) {

    var defaultOptions = {
        encoding: 'utf-8'
    };

    this.options = _.defaults({}, opts, defaultOptions);
};


/**
 * Convert the contents of a file and write it to output dir
 */
ICUConverter.prototype.convertFile = function(fileName) {

  var grammar = fs.readFileSync(fileName, this.options.encoding);

  return this.convert(grammar);

};

/**
 * Convert a resource bundle to a javascript object
 */
ICUConverter.prototype.convert = function(resourceBundle) {
  return parser.parse(resourceBundle);
};

module.exports = ICUConverter;

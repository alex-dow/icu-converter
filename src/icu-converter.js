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
var ICUConverter = require('./converter');

module.exports = {
  convert: function(opts) {
    var c = new ICUConverter(opts);
    return c.convert();
  },
  convertFile: function(fn, opts) {
    var c = new ICUConverter(opts);
    return c.convertFile(fn);
  },
  getWriter: function(format) {
    return require('./writers/' + format);
  }
};


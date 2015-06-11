/**
 * icu-converter
 * https://github.com/alex-dow/icu-converter
 *
 * Copyright (c) 2015 Alex Dowgailenko
 * Licensed under the MIT License
 * https://github.com/alex-dow/icu-converter/blob/master/LICENSE
 */

var _ = require('lodash');

function stringify(obj, argOptions) {

  var defaultOptions = {
    spaces: null,
    replacer: null
  };

  var options = _.defaults({}, argOptions, defaultOptions);

  return JSON.stringify(obj, options.replacer, parseInt(options.spaces));

}

module.exports = stringify;

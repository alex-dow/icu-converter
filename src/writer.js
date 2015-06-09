/**
 * icu-converter
 * https://github.com/alex-dow/icu-converter
 *
 * Copyright (c) 2015 Alex Dowgailenko
 * Licensed under the MIT License
 * https://github.com/alex-dow/icu-converter/blob/master/LICENSE
 */

var _ = require('lodash');
var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');

/**
 * Basic Writer
 *
 * Options:
 *    mkdir: boolean  -  Make the directory structure
 *    encoding: string  - Which encoding to use
 */
var writer = function(fileName, content, argOptions) {

  var defaultOptions = {
    mkdir: true,
    encoding: 'utf-8'
  };

  var options = _.defaults({}, defaultOptions, argOptions);

  var outputDir = path.dirname(fileName);

  if (options.mkdir) {
    if (!fs.existsSync(options.mkdir)) {
      mkdirp(outputDir);
    }
  }

  fs.writeFileSync(fileName, content, {
    encoding: options.encoding
  });
};

module.exports = writer;

var _ = require('lodash');
var fs = require('fs');
var parser = require('./icu-format-parser');

'use strict';

function icu_converter(opts) {

    var defaultOptions = {
        format: 'json',
        nested: false,
        outputDir: '.',
        converterOptions: {
        }
    };

    this.options = _.defaults({}, opts, defaultOptions);
}

icu_converter.prototype.convert = function(fileName) {

  var grammar = fs.readFileSync(fileName, 'utf-8');

  var ast = parser.parse(fs.readFileSync(fileName, 'utf-8'));

  var rootKey = ast.keyName;
  var rootValue = ast.elements;

  var Converter = require('./converters/' + this.options.format);

  var options = _.defaults({}, this.options, { filename: fileName });

  var converter = new Converter(rootKey, rootValue, options);
  converter.writeFile();

};

module.exports = icu_converter; 

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

    this.validTypes = [
      'array',
      'string',
      'table'
    ];
};

/**
 * Checks to see if a string ends with a particular suffix
 */
function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

/**
 * Parse a resource bundle
 */
ICUConverter.prototype.parse = function(resourceBundle) {
  return parser.parse(resourceBundle);
};

/**
 * Parses a key name.
 * 
 * If the keyname ends in :[datatype] then it is removed
 */
ICUConverter.prototype.parseKeyname = function(keyname) {

  this.validTypes.forEach(function(type) {
    var keyType = ':' + type;
    if (endsWith(keyname, keyType)) {
      keyname = keyname.substr(0, keyname.length - keyType.length);
    }
  });

  return keyname;
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

  var ast = this.parse(resourceBundle);

  var processedObject;

  if (_.isArray(ast.elements)) {
    processedObject = [];
    processedObject[this.parseKeyname(ast.keyName)] = {};
    ast.elements.forEach(function(el) {
      processedObject.push(this.deferProcessing(el));
    }.bind(this));
  } else {
    processedObject = this.deferProcessing(ast.elements);
  }

  var res = {};
  if (_.isArray(processedObject)) {
    processedObject.forEach(function(obj) {
      var key = this.parseKeyname(_.keys(obj).pop());
      res[key] = obj[key];
    }.bind(this));
  } else {
    res = processedObject;
  }

  var returnValue = {};
  returnValue[this.parseKeyname(ast.keyName)] = res;

  return returnValue;
};

/**
 * Process a table element
 */
ICUConverter.prototype.processTable = function(obj) {

  var tbl = {};
  if (_.isArray(obj.elements)) {
    obj.elements.forEach(function(el) {
      tbl[this.parseKeyname(el.keyName)] = this.deferProcessing(el);
    }.bind(this));
  } else {
    tbl[this.parseKeyname(obj.keyName)] = this.deferProcessing(obj.elements);
  }
  return tbl;
};

/**
 * Process an array element
 */
ICUConverter.prototype.processArray = function(obj) {
  var res = [];
  obj.value.forEach(function(el) {
    res.push(this.deferProcessing(el));
  }.bind(this));
  return res;
};

ICUConverter.prototype.processMultilineString = function(str) {
  var lines = str.split("\n");
  var newString = [];
  for (var i = 0; i < lines.length; i++) {
    newString.push(lines[i].trim());
  }
  return newString.join('\n');
};

/**
 * Process a string element
 */
ICUConverter.prototype.processString = function(obj) {

  var str = obj.value;  

  if (str.indexOf("\n") !== -1) {
    str = this.processMultilineString(str);
  }
  return str;
};

/**
 * Take an element, and process it using the appropriate method for that element's type
 */
ICUConverter.prototype.deferProcessing = function(obj) {
  var returnValue;
  switch (obj.type) {
    case 'table':
      returnValue = this.processTable(obj);
      break;
    case 'string':
      returnValue = this.processString(obj);
      break;
    case 'array':
      returnValue = this.processArray(obj);
      break;
    default:
      throw new Error('Unknown type: ' + obj.type);
  }
  return returnValue;
};

module.exports = ICUConverter;

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
// var ASTObject = require('./icu-ast');

var ICUConverter = function(opts) {

    var defaultOptions = {
        format: 'json',
        outputDir: '.',
        encoding: 'utf-8',
        writerOptions: {} 
    };

    this.options = _.defaults({}, opts, defaultOptions);
  
    this.validTypes = [
      'array',
      'string',
      'table'
    ];
};


function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

ICUConverter.prototype.parse = function(grammar) {
  return parser.parse(grammar);
};

ICUConverter.prototype.parseKeyname = function(keyname) {

  this.validTypes.forEach(function(type) {
    var keyType = ':' + type;
    if (endsWith(keyname, keyType)) {
      keyname = keyname.substr(0, keyname.length - keyType.length);
    }
  });

  return keyname;
};

ICUConverter.prototype.convertFile = function(fileName) {

  var grammar = fs.readFileSync(fileName, this.options.encoding);

  var obj = this.convert(grammar);

  var writer = require('./writers/' + this.options.format);
  writer(obj, fileName, this.options.outputDir, this.options.writerOptions);
};

ICUConverter.prototype.convert = function(grammar) {

  var ast = this.parse(grammar);

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

ICUConverter.prototype.processTable = function(obj) {

  

  var tbl = {};
  if (_.isArray(obj.elements)) {
    var tblElements = {};
    
    obj.elements.forEach(function(el) {
      tbl[this.parseKeyname(el.keyName)] = this.deferProcessing(el);
    }.bind(this));

  } else {
    tbl[this.parseKeyname(obj.keyName)] = this.deferProcessing(obj.elements);
  }
  return tbl;
};

ICUConverter.prototype.processArray = function(obj) {
  var res = [];
  obj.value.forEach(function(el) {
    res.push(this.deferProcessing(el));
  }.bind(this));
  return res;
};

ICUConverter.prototype.processString = function(obj) {
  return obj.value;
};


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

ICUConverter.prototype.processObject = function(obj) {
  var res;
  if (_.isArray(obj)) {
    res = [];
    obj.forEach(function(o) {
      res.push(this.deferProcessing(o));
    }.bind(this));

  } else {
    res = this.deferProcessing(obj);
  }
  return res;
};

module.exports = ICUConverter;

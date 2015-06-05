var _ = require('lodash');
var fs = require('fs');
var parser = require('./icu-format-parser');

'use strict';

function icu_converter(opts) {

    var defaultOptions = {
        format: 'json',
        outputDir: '.',
        encoding: 'utf-8',
        writerOptions: {
        }
    };

    this.options = _.defaults({}, opts, defaultOptions);
}

icu_converter.prototype.parse = function(grammar) {
  return parser.parse(grammar);
}

icu_converter.prototype.convertFile = function(fileName) {

  var grammar = fs.readFileSync(fileName, this.options.encoding);

  var obj = this.convert(grammar);

  var writer = require('./writers/' + this.options.format);
  writer(obj, fileName, this.options.outputDir, this.options.writerOptions);
}

icu_converter.prototype.convert = function(grammar) {

  var ast = this.parse(grammar);

  var res = {};
  var processedObject = this.processObject(ast);

  if (_.isArray(processedObject)) {
    processedObject.forEach(function(obj) {
      var key = _.keys(obj).pop();
      res[key] = obj[key];
    });
  } else {
    res = processedObject;
  }

  return res;
};

icu_converter.prototype.processTable = function(obj) {
  var tbl = {};

  if (_.isArray(obj.elements)) {
    var tblElements = {};
    tbl[obj.keyName] = {};
    obj.elements.forEach(function(el) {
      tblElements[el.keyName] = this.deferProcessing(el);
    }.bind(this));
    tbl[obj.keyName] = tblElements;
  } else {
    if (obj.elements.type === "array" || obj.elements.type === "string") {
      tbl = this.deferProcessing(obj.elements);
    } else {
      tbl[obj.keyName] = this.deferProcessing(obj.elements);
    }
  }
  return tbl;
};

icu_converter.prototype.processArray = function(obj) {
  var res = [];
  obj.value.forEach(function(el) {
    res.push(this.deferProcessing(el));
  }.bind(this));
  return res;
};

icu_converter.prototype.processString = function(obj) {
  return obj.value;
};


icu_converter.prototype.deferProcessing = function(obj) {
  switch (obj.type) {
    case "table":
      return this.processTable(obj);
      break;
    case "string":
      return this.processString(obj);
      break;
    case "array":
      return this.processArray(obj);
      break;
  }
};

icu_converter.prototype.processObject = function(obj) {
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

module.exports = icu_converter;

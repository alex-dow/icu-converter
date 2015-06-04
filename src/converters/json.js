var _ = require('lodash');
var path = require('path');
var mkdirp = require('mkdirp');
var fs = require('fs');

var cleanString = function(string) {
  return string.replace("\n", "\\n");
}

var Converter = function(rootKey, rootObject, options)
{
  this.rootKey = rootKey;
  this.rootObject = rootObject;
  this.options = options;

  this.json = {};
}

Converter.prototype.writeFile = function() {
  this.convert();
  var jsonStr = JSON.stringify(this.json, null, 4);
  
  var outputDir = this.options.outputDir;
  var outputFile = outputDir + "/" + path.basename(this.options.filename).replace(path.extname(this.options.filename), '') + ".json";

  mkdirp(outputDir);
  fs.writeFileSync(outputFile, jsonStr);
}

Converter.prototype.convert = function() {
  var res = {};
  var processedObject = this.processObject(this.rootObject);

  if (_.isArray(processedObject)) {
    processedObject.forEach(function(obj) {
      var key = _.keys(obj).pop();
      res[key] = obj[key];
    });
  } else {
    res = processedObject;
  }

  this.json[this.rootKey] = res;
  return this.json;
};

Converter.prototype.processTable = function(obj) {
  var tbl = {};
  var self = this;

  if (_.isArray(obj.elements)) {
    var tblElements = {};
    tbl[obj.keyName] = {};
    obj.elements.forEach(function(el) {
      tblElements[el.keyName] = self.deferProcessing(el);
    });
    tbl[obj.keyName] = tblElements;
  } else {

    if (obj.elements.type === "array" || obj.elements.type === "string") {
      tbl = self.deferProcessing(obj.elements);
    } else {
      tbl[obj.keyName] = self.deferProcessing(obj.elements);
    }
  }
  return tbl;
};

Converter.prototype.processArray = function(obj) {
  var res = [];
  var self = this;
  obj.value.forEach(function(el) {
    res.push(self.deferProcessing(el));
  });
  return res;
}

Converter.prototype.processString = function(obj) {
  return obj.value;
}

Converter.prototype.deferProcessing = function(obj) {
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

Converter.prototype.processObject = function(obj) {

  var self = this;
  var res;
  if (_.isArray(obj)) {
    res = [];
    obj.forEach(function(o) {
      res.push(self.deferProcessing(o));
    });
  } else {
    res = self.deferProcessing(obj);
  }
  return res;
}

    

module.exports = Converter;

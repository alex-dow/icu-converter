var _ = require('lodash');
var path = require('path');
var mkdirp = require('mkdirp');
var fs = require('fs');

var Converter = function(ast, options)
{
  this.options = options;
  this.rootObject = ast;

  this._properties = [];

  var JsonConverter = require('./json');


  this.jsonConverter = new JsonConverter(ast, options);
}

Converter.prototype.writeFile = function() {
  var properties = this.convert();
  var outputDir = this.options.outputDir;
  var outputFile = outputDir + "/" + path.basename(this.options.filename).replace(path.extname(this.options.filename), '') + '.properties';
  mkdirp(outputDir);
  fs.writeFileSync(outputFile, properties);
}

Converter.prototype.processString = function(str) {

  str = str.replace(/\n/g, ' \\\n');
  return str;

}

Converter.prototype.flatten = function(obj, parentKey) {
  for (var property in obj) {
    if (obj.hasOwnProperty(property)) {
      if (_.isObject(obj[property]) && !_.isArray(obj[property]) && !_.isString(obj[property])) {
        this.flatten(obj[property], parentKey + '.' + property);
      } else if (_.isString(obj[property])) {
        var propObj = {};
        propObj[parentKey + '.' + property] = this.processString(obj[property]);
        this._properties.push(propObj);
      } else if (_.isArray(obj[property])) {
        for (var i = 0; i < obj[property].length; i++) {

          propObj = {};
          var val = obj[property][i];
          var propKey = parentKey + '.' + property + '.' + i;

          if (_.isString(val)) {
            propObj[propKey] = this.processString(val);
          } else {
            // FIXME There is only so much that can be done here
            propObj[propKey] = JSON.stringify(val);
          }
          this._properties.push(propObj);
        }
      } else {
        console.log('unsupported data type');
      }
    }
  }
};

Converter.prototype.convert = function() {

  var properties = require('properties');
  var options = {
    path: false,
    namespaces: true,
    sections: false,
    variables: true,
    include: true
  }

  var obj = this.jsonConverter.convert();

  for (var k in obj) {
    if (obj.hasOwnProperty(k)) {
      this.flatten(obj[k], k);
    }
  }

  var propertiesFile = "";

  this._properties.forEach(function(prop) {

    var key = _.keys(prop).pop();
    var value = prop[key];

    propertiesFile += key + "=" + value + "\n";
  });

  return propertiesFile;
}

module.exports = Converter;

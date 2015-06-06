var _ = require('lodash');
var path = require('path');
var mkdirp = require('mkdirp');
var fs = require('fs');

'use strict';

var Writer = function(obj, inputFile, outputDir, argOptions) {

  var defaultOptions = {};

  var options = _.defaults({}, argOptions, defaultOptions);

  var inputFileName = path.basename(inputFile);
  var fileExtension = path.extname(inputFileName);

  var outputFileName = inputFileName.replace(fileExtension, '.properties');
  var outputFile = outputDir + '/' + outputFileName;

  mkdirp(outputDir);

  var properties = processObject(obj);

  var propertiesFile = "";
  properties.forEach(function(prop) {
    var key = _.keys(prop).pop();
    var value = prop[key];

    propertiesFile += key + "=" + value + "\n";
  });

  console.log("Writing to " + outputFile);
  fs.writeFileSync(outputFile, propertiesFile);

}

function processString(str) {
  str = str.replace(/\n/g, '\\\n');
  str = str.replace(/\r/g, '\\\r');
  return str;
}

function flatten(obj, parentKey, processedObject) {
  for (var property in obj) {
    if (obj.hasOwnProperty(property)) {
      if (_.isObject(obj[property]) && !_.isArray(obj[property]) && !_.isString(obj[property])) {

        flatten(obj[property], parentKey + '.' + property, processedObject);

      } else if (_.isString(obj[property])) {

        var propObj = {};

        propObj[parentKey + '.' + property] = processString(obj[property]);
        processedObject.push(propObj);

      } else if (_.isArray(obj[property])) {
        for (var i = 0; i < obj[property].length; i++) {

          propObj = {};
          var val = obj[property][i];
          var propKey = parentKey + '.' + property + '.' + i;

          if (_.isString(val)) {
            propObj[propKey] = processString(val);
          } else {
            // FIXME There is only so much that can be done here
            propObj[propKey] = JSON.stringify(val);
          }

          processedObject.push(propObj);
        }
      } else {
        console.log('unsupported data type, dude that blows. I don"t even know how we go there?');
      }
    }
  }
}


function processObject(obj) {

  var processedObject = [];

  for (var k in obj) {
    if (obj.hasOwnProperty(k)) {
      flatten(obj[k], k, processedObject);
    }
  }

  return processedObject;
}

module.exports = Writer;
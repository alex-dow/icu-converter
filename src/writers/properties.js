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
var path = require('path');
var mkdirp = require('mkdirp');
var fs = require('fs');

function processString(str) {
  str = str.replace(/\n/g, ' \\\n');
  str = str.replace(/\r/g, ' \\\r');
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
        var arr = processArray(obj[property], parentKey + '.' + property);
        processedObject.push.apply(processedObject, arr);

      } else {
        console.log('unsupported data type, dude that blows. I don"t even know how we go there?');
      }
    }
  }
}


function processArray(arr, key) {

  var newArr = [];

  arr.forEach(function(obj, idx) {
    var propObj;
    var propKey = key + '.' + idx;
    if (_.isString(obj)) {
      propObj = {};
      propObj[propKey] = processString(obj);
      newArr.push(propObj);
    } else if (_.isArray(obj)) {
      propObj = processArray(obj, propKey);
      newArr = newArr.concat(propObj);
    } else {
      propObj = [];
      flatten(obj, propKey, propObj);
      newArr = newArr.concat(propObj);
    }

  });

  return newArr;

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

var Writer = function(obj, fileName, argOptions) {

  var defaultOptions = {
    mkdir: true
  };

  var options = _.defaults({}, argOptions, defaultOptions);

  var outputDir = path.dirname(fileName);

  if (options.mkdir) {
    mkdirp(outputDir);
  }

  var properties = processObject(obj);

  var propertiesFile = "";
  properties.forEach(function(prop) {
    var key = _.keys(prop).pop();
    var value = prop[key];

    propertiesFile += key + "=" + value + "\n";
  });

  console.log("Writing to " + fileName);
  fs.writeFileSync(fileName, propertiesFile);

};

module.exports = Writer;

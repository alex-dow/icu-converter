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
var charEscape = require('./escape');

function processString(str, options) {

  var processedStr = "";

  var meta = {
    whitespace: true,
    key: false
  };


  for (var i = 0; i < str.length; i++) {
    meta.whitespace = false;
    var c = str[i];
    var code = str.charCodeAt(i);

    if (code !== 32 && code !== 9 && code !== 12) {
      meta['whitespace'] = false;
    }

    processedStr += charEscape(c, code, meta, options);
  }

  return processedStr;
}

function flatten(obj, parentKey, processedObject) {

  for (var property in obj) {
    if (obj.hasOwnProperty(property)) {
      if (_.isObject(obj[property]) && !_.isArray(obj[property]) && !_.isString(obj[property])) {
        flatten(obj[property], parentKey + '.' + property, processedObject);

      } else if (_.isString(obj[property])) {

        var propObj = {};
        propObj[parentKey + '.' + property] = obj[property];
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

function stringify(obj, argOptions) {

  var defaultOptions = {
    'separator': '=',
    'replacer': null,
    'unicode': false,
    'newline': false,
    'newlineChar': '\n'
  };

  var options = _.defaults({}, argOptions, defaultOptions);

  var properties = processObject(obj);

  var propertiesFile = '';
  properties.forEach(function(prop) {
    var key = _.keys(prop).pop();
    var value = processString(prop[key], {
      newline: options.newline,
      unicode: options.unicode
    });

    propertiesFile += key + options.separator + value + options.newlineChar;
  });

  return propertiesFile;
}

module.exports = {
  stringify: stringify
};

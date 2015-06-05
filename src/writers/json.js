var _ = require('lodash');
var path = require('path');
var mkdirp = require('mkdirp');
var fs = require('fs');

var Writer = function(obj, inputFile, outputDir, argOptions) {

  var defaultOptions = {
    replacer: null,
    space: 4
  };

  var options = _.defaults({}, argOptions, defaultOptions);

  var inputFileName = path.basename(inputFile);
  var fileExtension = path.extname(inputFileName);

  var outputFileName = inputFileName.replace(fileExtension, '.json');
  var outputFile = outputDir + '/' + outputFileName;

  mkdirp(outputDir);

  var optsArray = [obj, options.replacer, options.space];
  var jsonStr = JSON.stringify.apply(JSON, optsArray);
  fs.writeFileSync(outputFile, jsonStr);
}


module.exports = Writer;

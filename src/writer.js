var _ = require('lodash');
var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');

var writer = function(fileName, content, argOptions) {

  var defaultOptions = {
    mkdir: true,
    encoding: 'utf-8'
  };

  var options = _.defaults({}, defaultOptions, argOptions);

  var outputDir = path.dirname(fileName);

  if (options.mkdir) {
    if (!fs.existsSync(options.mkdir)) {
      mkdirp(outputDir);
    }
  }

  fs.writeFileSync(fileName, content, {
    encoding: options.encoding
  });
};

module.exports = writer;

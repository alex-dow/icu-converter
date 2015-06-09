var _ = require('lodash');

function stringify(obj, argOptions) {

  var defaultOptions = {
    spaces: null,
    replacer: null
  };

  var options = _.defaults({}, defaultOptions, argOptions);

  return JSON.stringify(obj, options.replacer, options.spaces);

}

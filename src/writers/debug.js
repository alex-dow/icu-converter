/**
 * icu-converter
 * https://github.com/alex-dow/icu-converter
 *
 * Copyright (c) 2015 Alex Dowgailenko
 * Licensed under the MIT License
 * https://github.com/alex-dow/icu-converter/blob/master/LICENSE
 */

'use strict';

/**
 * A debug writer
 *
 * will just inspect the object and log it to stdout
 */
var Writer = function(obj) {

  console.log('\n\n\n');
  console.log('--------------------------------------------');
  console.log('  Final convertered Javascript Object');
  console.log(' ');


  console.log(require('util').inspect(obj, {
    depth: 100,
    colors: true,
    customInspect: false
  }));

};

module.exports = Writer;

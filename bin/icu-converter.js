#!/usr/bin/env node

var convertFile = require('../src/icu-converter').convertFile;
var writer = require('../src/icu-converter').getWriter;

var program = require('commander');
var fs = require('fs');
var path = require('path');

program
  .version('0.1.0-dev')
  .usage('[options] <file...>')
  .option('-f --format <format>', 'Select which format to use')
  .option('-e --encoding <encoding>', 'Specify the encoding of the resource bundle (defaults to utf-8)')
  .option('-o --output-dir <dir>', 'Directory to output converted files')
  .parse(process.argv)

program.args.forEach(function(fn) {
  console.log("Processing: " + fn);

  var jsObj = convertFile(fn, {encoding: program.encoding});
  var formatWriter = writer(program.format);

  var outputDir = program.outputDir;
  var fileExt = path.extname(fn);

  var outputFn = path.basename(fn).replace('.' + fileExt) + '.' + program.format
  var outputFile = outputDir + '/' + outputFn;
  console.log("Writing: " + outputFile);
  formatWriter(jsObj, outputFile);
});


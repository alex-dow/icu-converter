#!/usr/bin/env node
var Converter = require('../');
var program = require('commander');
var fs = require('fs');

program
  .version('0.0.1')
  .usage('[options] <file...>')
  .option('-f --format <format>', 'Select which format to use')
  .option('-o --output-dir <dir>', 'Directory to output converted files')
  .parse(process.argv)

var converter = new Converter({
  format: program.format,
  outputDir: program.outputDir
});

program.args.forEach(function(fn) {
  console.log("Processing: " + fn);

  converter.convertFile(fn);

});

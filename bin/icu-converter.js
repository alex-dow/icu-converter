#!/usr/bin/env node

var converter = require('../src/icu-converter').converter;
var writer = require('../src/icu-converter').getWriter;

var program = require('commander');
var fs = require('fs');

program
  .version('0.0.1')
  .usage('[options] <file...>')
  .option('-f --format <format>', 'Select which format to use')
  .option('-e --encoding <encoding>', 'Specify the encoding of the resource bundle (defaults to utf-8)')
  .option('-o --output-dir <dir>', 'Directory to output converted files')
  .parse(process.argv)

program.args.forEach(function(fn) {
  console.log("Processing: " + fn);

  var jsObj = converter({encoding: program.encoding}).convertFile(fn);
  var formatWriter = writer(program.format);

  formatWriter(jsObj, fn, program.outputDir);
});


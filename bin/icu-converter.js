#!/usr/bin/env node

var Converter = require('../');
var program = require('commander');
var fs = require('fs');

program
  .version('0.0.1')
  .usage('[options] <file...>')
  .option('-f --format <format>', 'Select which format to use')
  .option('-e --encoding <encoding>', 'Specify the encoding of the resource bundle (defaults to utf-8)')
  .option('-o --output-dir <dir>', 'Directory to output converted files')
  .parse(process.argv)

var converter = new Converter({
  encoding: program.encoding
});

program.args.forEach(function(fn) {
  console.log("Processing: " + fn);
  var jsObj = converter.convertFile(fn);

  var writerFormat = program.format;
  var writer = require('../src/writers/' + writerFormat);

  writer(jsObj, fn, program.outputDir);
});


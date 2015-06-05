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

//  var res = fs.readFileSync(fn, 'utf-8');
  var res = 'root { key { "stringValue" } }';
  console.log(require('util').inspect(res, true, 10));
  // var results = converter.convertFile(fn);

});

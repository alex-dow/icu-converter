#!/usr/bin/env node

var parseFile = require('../src/icu-converter').parseFile;
var getFormatter = require('../src/icu-converter').getFormatter;
var writer = require('../src/writer');

var program = require('commander');
var fs = require('fs');
var path = require('path');

function getFormatOptions(program, format) {
  
  var formatOptions = {};

  for (var prop in program) {
    if (program.hasOwnProperty(prop)) {
      if (prop.indexOf(format) === 0) {
        var newProp = prop.substr(format.length, prop.length);
        newProp = newProp.charAt(0).toLowerCase() + newProp.slice(1);

        if (newProp.indexOf('enable') === 0) {
          newProp = newProp.replace('enable', '');
          newProp = newProp.charAt(0).toLowerCase() + newProp.slice(1);
        }

        formatOptions[newProp] = program[prop];
      }
    }
  }

  return formatOptions;
}

function getOutputFilename(fn, format, outputDir) {

  var outputDir = outputDir;
  var fileExt = path.extname(fn);

  var outputFn = path.basename(fn).replace(fileExt, '') + '.' + format
  var outputFile = outputDir + '/' + outputFn;
 
  return outputFile;
}



program
  .version('0.1.0-dev')
  .usage('[options] <file...>')
  .option('-f, --format <format>', 'Select which format to use')
  .option('-e, --inputEncoding <inputEncoding>', 'Specify the encoding of the resource bundle (defaults to utf-8)')
  .option('-E, --encoding <outputEncoding>', 'Specify the encoding of the output file (defaults to utf-8)')
  .option('-o, --output-dir <dir>', 'Directory to output converted files')
  .option('--properties-enable-newline', 'Allow values to have new linews')
  .option('--properties-enable-unicode', 'Allow unicode characters, otherwise they are escaped')
  .option('--properties-separator <separator>', 'Separator character, defaults to =')
  .option('--properties-newlineChar <newlineChar>', 'New line character, defaults to \\n')
  .option('--json-spaces <spaces>', 'Indent items by a number of spaces', 0)
  .parse(process.argv)

program.args.forEach(function(fn) {

  console.log("Convert contents of " + fn + " to a javascript object");
  var jsObj = convertFile(fn, program.inputEncoding);

  console.log("Convert javascript object to selected format (" + program.format + ")");

  var format = program.format;

  var formatter = getFormatter(format);
  var formatOptions = getFormatOptions(program, format);
  
  var content = formatter.stringify(jsObj, formatOptions);

  if (content) {

    var outputFile = getOutputFilename(fn, format, program.outputDir);
    console.log("Writing content to " + outputFile);
    writer(outputFile, content, {
      encoding: program.outputEncoding,
      mkdir: true
    });
  } else {
    console.log("No content to write");
  }
  
});


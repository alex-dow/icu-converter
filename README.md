# icu-converter
version 0.0.1

icu-converter is a nodejs-based tool to convert ICU Resource Bundles into other formats.

This project is in the early phases of development.

## Available Formats

Currently, only JSON is availabe. The next priority will be Properties files for use with ICU4J.

## Why not genrb?

genrb does not generate JSON, which is useful to use with FormatJS, MessageFormat, and other projects. This is also easier to integrate into your Grunt or Gulp build files, and will work fine on Windows.

## Installation

You currently can not install this from NPM, yet ;). Instead, you have to clone the repository, and you must compile the PEG file. To compile the PEG file, you have to install the grunt-cli tool:

```
sudo npm install -g grunt-cli
```

Afterwards, clone directly from github and compile:

```
git clone https://github.com/alex-dow/icu-converter
cd icu-converter
npm install
grunt peg
```

To test things out, there is a sample resource bundle located in `tests/fixtures/root.txt`.

## CLI

```
bin/icu-converter.js --help
```

Example usage:

```
$ bin/icu-converter.js --format=json --output-dir=./output ./tests/fixtures/root.txt 
> Processing: ./tests/fixtures/root.txt
$
```

This will generate a JSON file at `./output/root.json`.

## API

Currently very simple. Example usage:

```javascript
var Converter = require('icu-converter');

var c = new Converter({
  format: 'json',
  outputDir: './output'
});

c.convert('/path/to/resourceBundle.txt');
```

This will create a file located at `./output/resourceBundle.json`.

## Limitations

Only table, array, and string types are currently handled.
The only available format is JSON.

## Release History
* 2015-06-05	v0.0.2	Fixed an issue with JSON converter, where string resources were stored in an needed nested object
* 2015-06-04	v0.0.1	Initial release

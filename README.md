# icu-converter
version 0.0.3

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

## Missing Features

1. Only `table`, `array`, and `string` types are handled. This means that `integer`, `intvector`, and `binary` are not supported.
2. Aliasing and imports are not supported.

## Limitations of the Properties format

Properties files are somewhat supported now, but properties files are not as flexible as json.

### Arrays

```
root {
  array {
    { "message" }
    { "message" }
    { "message" }
  }
}
```

Will be turned into:

```
root.array.0=message
root.array.1=message
root.array.2=message
```

### Arrays with complex elements

If an element in an array is another array or table however, then this will not be properly represented in Properties files. The current behavior is to export it as JSON.

```
root {
  array {
    { "message" }
    { newTable {
      field { "message" }
    }}
  }
}
```

Will be turned into

```
root.array.0=message
root.array.1={ newTable: { field: "message" } }
```

### Strings on new lines

If a string element spans multiple lines, then it will also be split on multiple lines in the properties file, with each line ending in a `\`

```
root {
  message { "multi
line
message" }
}
```

Will be turned into

```
root.message=multi \
line \
message
```

### What to expect in future versions
All of this behavior is hard coded for now. It's planned to allow more functionality when handling data structures that property files do not handle.


## Release History
* 2015-06-05  v0.0.3  Added preliminary properties file converter, and other bug fixes
* 2015-06-05	v0.0.2	Fixed an issue with JSON converter, where string resources were stored in an needed nested object
* 2015-06-04	v0.0.1	Initial release

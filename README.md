# icu-converter
version 0.0.5

icu-converter is a nodejs-based tool to convert ICU Resource Bundles into other formats.

This project is in the early phases of development.

## Available Formats

[Java-style Properties Format](http://en.wikipedia.org/wiki/.properties)
[JSON](http://json.org/)

## Why not genrb?

genrb does not generate JSON, which is useful to use with FormatJS, MessageFormat, and other projects. This is also easier to integrate into your Grunt or Gulp build files, and will work fine on Windows.

## Installation

If you wish to use the command line interpreter easily, install icu-converter globally:

```
npm install -g icu-converter
```

Remove the -g flag if you just want to use the library.

## CLI

```
icu-converter.js --help
```

Example usage:

```
$ icu-converter.js --format=json --output-dir=./output ./tests/fixtures/root.txt
> Processing: ./tests/fixtures/root.txt
$
```

This will generate a JSON file at `./output/root.json`.

Valid values for format are:

* `json`
* `properties`

## API

### Generating Files

Currently very simple. Example usage:

```javascript
var Converter = require('icu-converter');

var c = new Converter({
  format: 'json',
  outputDir: './output'
});

c.convertFile('/path/to/resourceBundle.txt');
```

This will create a file located at `./output/resourceBundle.json`.

### Converting to an Object

To convert a resource bundle to a plain javascript object:

```javascript
var Converter = require('icu-converter');

var c = new Converter({
  format: 'json',
  outputDir: './output'
});

var bundle = 'root { key { "stringValue" } }';

var obj = c.parse(bundle);

console.log(obj); // 'root { key { "stringValue" } }'
```

This will output `'root { key { "stringValue" } }'`

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
* 2015-06-06  v0.0.5  Bug fixes, better array handling, and starting the unit tests
* 2015-06-05  v0.0.4  Bug fixes and improved architecture
* 2015-06-04  v0.0.3  Added preliminary properties file converter, and other bug fixes
* 2015-06-04	v0.0.2	Fixed an issue with JSON converter, where string resources were stored in an needed nested object
* 2015-06-03	v0.0.1	Initial release

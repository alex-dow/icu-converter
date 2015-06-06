[![build status](http://hq.psikon.net:20020/jenkins/job/icu-converter/badge/icon)](http://hq.psikon.net:20020/jenkins/job/icu-converter)
[![npm version](https://badge.fury.io/js/icu-converter.svg)](http://badge.fury.io/js/icu-converter)

# icu-converter
version 0.1.0-dev

icu-converter is a nodejs-based tool to convert ICU Resource Bundles into other formats.

* Sonar: http://hq.psikon.net:20010/dashboard/index?id=icu-converter
* Jenkins: http://hq.psikon.net:20020/jenkins/job/icu-converter/
* NPM: https://www.npmjs.com/package/icu-converter

## Available Formats

* [Java-style Properties Format](http://en.wikipedia.org/wiki/.properties)
* [JSON](http://json.org/)

## Why not genrb?

genrb does not generate JSON, which is useful to use with FormatJS, MessageFormat, and other projects. This is also easier to integrate into your Grunt or Gulp build files, and will work fine on Windows.

## Installation

If you wish to use the command line interpreter easily, install icu-converter globally:

```
npm install -g icu-converter
```

Remove the -g flag if you just want to use the library.

If you want bleeding edge code with no promises then clone the `develop` branch. You should also install the grunt-cli tool to run the build.

```
git clone https://github.com/alex-dow/icu-converter.git
cd icu-converter
git checkout develop
npm install
sudo npm install -g grunt-cli
grunt
```

## CLI

```
icu-converter --help
```

Example usage:

```
$ icu-converter --format=json --output-dir=./output ./tests/fixtures/root.txt
> Processing: ./tests/fixtures/root.txt
$
```

This will generate a JSON file at `./output/root.json`.

Valid values for format are:

* `json`
* `properties`

## API

### Converting a Resource Bundle to an Object

From a file:

```javascript
var converter = require('icu-converter').convertFile;
var jsObj = converter('/path/to/resourceBundle.txt', {
  encoding: 'utf-8'
});

console.log(require('util').inspect(jsObj, true, 10));
```

From a string:

```javascript
var converter = require('icu-converter').convert;
var resource = "root { msgid { "string" } }";
var jsObj = converter(resource);

console.log(jsObj);
```

### Converting a Resource Bundle to Another Format

To convert a resource bundle to a JSON or Properties file format:

```javascript
var convertFile = require('icu-converter').convertFile;
var getWriter = require('icu-converter').getWriter;

var resourceFile = 'tests/fixtures/tables/table1.txt';

var jsObj = convertFile(resourceFile, {
  encoding: 'utf-8'
});
var jsonWriter = getWriter('json');
var propertiesWriter = getWriter('properties');

jsonWriter.writeFile(jsObj, resourceFile, './compiled');
propertiesWriter.writeFile(jsObj, resourceFile, './compiled');
```

This will create two files:

* `compiled/table.json`
* `compiled/table.properties`

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


## Contributing

If you want to submit changes to the PEG file itself, then there must be extensive unit tests done to ensure that it works. Create fixtures for numerous examples and place in `tests/fixtures` and create tests for them.

Please respect the `.editorconfig`, `.jshintrc`, and `.jscsrc` files.

## Release History
* 2015-06-06  v0.0.5  Bug fixes, better array handling, and starting the unit tests
* 2015-06-05  v0.0.4  Bug fixes and improved architecture
* 2015-06-04  v0.0.3  Added preliminary properties file converter, and other bug fixes
* 2015-06-04	v0.0.2	Fixed an issue with JSON converter, where string resources were stored in an needed nested object
* 2015-06-03	v0.0.1	Initial release

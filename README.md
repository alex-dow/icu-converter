[![build status](http://hq.psikon.net:20020/jenkins/job/icu-converter/badge/icon)](http://hq.psikon.net:20020/jenkins/job/icu-converter)
[![npm version](https://badge.fury.io/js/icu-converter.svg)](http://badge.fury.io/js/icu-converter)

# icu-converter
version 0.1.1

icu-converter is a nodejs-based tool to convert [ICU Resource Bundles](http://userguide.icu-project.org/locale/resources) into other formats.

* Sonar: http://hq.psikon.net:20010/dashboard/index?id=icu-converter
* Jenkins: http://hq.psikon.net:20020/jenkins/job/icu-converter/
* NPM: https://www.npmjs.com/package/icu-converter

## Available Formats

* [Java-style Properties Format](http://en.wikipedia.org/wiki/.properties)
* [JSON](http://json.org/)

## Why not use genrb?

genrb is the C-based tool ICU provides, which can compile ICU Resource Bundles into java properties, and a binary format. Unfortunately, it does not generate JSON, and at the time there was no Windows build of the tool. In the future, other formats will be supported as well.

## Why use this format?

The ICU Resource Bundle format is very tolerant and simple. But it's best feature, is cleanly handling new lines. Something many other formats have a hard time handling. It is much better geared towards non-programmers (such as your translators!).

For more information on this format, and best practices to resource bundle organization, visit the [ICU Resources](http://userguide.icu-project.org/locale/resources) information at http://userguide.icu-project.org/locale/resources

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

## Unspported Features

1. Binary Data Type
2. Imports
3. Aliasing


## API

### Converting a Resource Bundle to an Object

From a file:

```javascript
var parseFile = require('icu-converter').parseFile;
var jsObj = parseFile('/path/to/resourceBundle.txt', {
  encoding: 'utf-8'
});

console.log(jsObj);
```

From a string:

```javascript
var parse = require('icu-converter').parse;
var resource = "root { msgid { "string" } }";
var jsObj = parse(resource);

console.log(jsObj);
```

### Converting a Resource Bundle to Another Format

To convert a resource bundle to a different format, you must fetch a parser of the format you'd like to use:

```javascript
var parseFile = require('icu-converter').parseFile;
var formatter = require('icu-converter').getFormatter('json');

var resourceFile = 'tests/fixtures/tables/table1.txt';

var jsObj = parseFile(resourceFile, {
  encoding: 'utf-8'
});
var content = formatter.stringify(jsObj);
```

Each parser has a method called `stringify` that takes a javascript object and converts it to a string.

### JSON Parser

The JSON Parser accepts only two options, which are used with `JSON.stringify()`

#### spaces

Type: `string` or `int`
Default: `0`

A String or Number object that's used to insert white space into the output JSON string for readability purposes. If this is a Number, it indicates the number of space characters to use as white space; this number is capped at 10 if it's larger than that. Values less than 1 indicate that no space should be used. If this is a String, the string (or the first 10 characters of the string, if it's longer than that) is used as white space. If this parameter is not provided (or is null), no white space is used.

#### replacer

Type: `function`
Default: `null`

A function that alters the behavior of the stringification process, or an array of String and Number objects that serve as a whitelist for selecting the properties of the value object to be included in the JSON string. If this value is null or not provided, all properties of the object are included in the resulting JSON string.

### Properties Parser

The Properties parser will compile a Javascript object to the standard Java Properties format. Bare in mind that complex data structures are not easily representable in this format. As well, the standard Java properties library expects properties files to use the `iso-8859-1` encoding. As such, unicode characters must be escaped.

The following options are available:

#### newline

Type: `boolean`
Default: `false`

If enabled, then strings that have new lines in them will have their new lines escaped by `\s\\\n` instead of `\\n`.

With it enabled:
```
myProperty=string \
on \
many lines
```

With it disabled:
```
myProperty=string\non\nmany\nlines
```

#### newlineChar

Type: `string`
Default: `\n`

Specifcy which character or characters to use as the newline character.

#### separator

Type: `string`
Default: '='

Specify which character or characters you wish to use to separate the key from the value

#### unicode

Type: `boolean`
Default: false

If enabled, then unicode characters will not be converted to \u[0000-ffff] escape sequences

### Properties format examples

#### Arrays

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

#### Arrays with complex elements

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

#### Strings on new lines

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

#### What to expect in future versions
All of this behavior is hard coded for now. It's planned to allow more functionality when handling data structures that property files do not handle.


## Contributing

If you want to submit changes to the PEG file itself, then there must be extensive unit tests done to ensure that it works. Create fixtures for numerous examples and place in `tests/fixtures` and create tests for them.

Please respect the `.editorconfig`, `.jshintrc`, and `.jscsrc` files.

## Release History
* 2015-11-10  v0.1.1  Fix issue #22
* 2015-06-11  v0.1.0  Completely different architecture, bug fixes, support for integer data types, better support for type coersion
* 2015-06-06  v0.0.5  Bug fixes, better array handling, and starting the unit tests
* 2015-06-05  v0.0.4  Bug fixes and improved architecture
* 2015-06-04  v0.0.3  Added preliminary properties file converter, and other bug fixes
* 2015-06-04	v0.0.2	Fixed an issue with JSON converter, where string resources were stored in an needed nested object
* 2015-06-03	v0.0.1	Initial release

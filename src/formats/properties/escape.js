/**
 * icu-converter
 * https://github.com/alex-dow/icu-converter
 *
 * Copyright (c) 2015 Alex Dowgailenko
 * Licensed under the MIT License
 * https://github.com/alex-dow/icu-converter/blob/master/LICENSE
 *
 * This function is based on Gabriel Llamas's node-properties
 * project:
 * https://github.com/gagle/node-properties
 *
 * Added support for turning newlines into \s\\\n instead of \\n. This
 * allows for properties like this:
 *
 * foobar=value \
 * on \
 * new \
 * lines
 *
 * meta options:
 * key: boolean   - Escapes string based on rules for a key
 * unicode: boolean - Escapes unicode strings to be ISO-8859-1 compliant
 * whitespace: boolean - Escapes whitespace
 * newline: boolean - splits value on new lines
 */

"use strict";

var unicode = function (code){
  var unicode = code.toString (16);
  while (unicode.length !== 4){
    unicode = "0" + unicode;
  }
  return "\\u" + unicode;
};

module.exports = function (c, code, meta, options){
  //Encode characters to their unicode representation to be compatible with
  //ISO 8859-1 (latin1)

  //code 61: =
  //code 58: :
  if (meta.key && (code === 61 || code === 58 || code === meta.separator)){
    //Escape the separator in the key string
    return "\\" + c;
  }
  
  //ASCII printable characters
  if (code > 31 && code < 127) {
    //Space at the begining of a word
    //If whitespace is true the space needs to be escaped
    //In comments, meta.whitespace is always false
    if (code === 32 && meta.whitespace) {
      return "\\ ";
    }
    //Backslash
    if (code === 92) {
      return "\\\\";
    }
    return c;
  }
  
  //ASCII non-printable characters
  //Escaped
  if (code === 9) {
    return "\\t";
  }

  if (code === 12) {
    return "\\f";
  }

  if (code === 10) {
   return (options.newline) ? "\\\n" : "\\n";
  }

  if (code === 13) {
    return (options.newline) ? "\\\r" : "\\r";
  }
  
  //Control sets 0 and 1
  if (code < 160) {
    return unicode (code);
  }
  
  //Printable 8-bit character
  if (code < 256) {
    return c;
  }
  
  //Latin1 multibyte character
  return options.unicode === false ? unicode (code) : c;
};

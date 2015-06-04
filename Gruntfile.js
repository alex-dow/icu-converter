'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    
    peg: {
      all: {
        src: "src/icu-pegjs.txt",
        dest: "src/icu-format-parser.js"
      }
    }

  });

  grunt.loadNpmTasks('grunt-peg');

  grunt.registerTask('default', ['peg']);
};

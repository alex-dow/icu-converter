'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),    
    peg: {
      all: {
        src: "src/icu-pegjs.txt",
        dest: "src/icu-format-parser.js"
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          quiet: false,
          clearRequireCache: true
        },
        src: ['tests/**/*_test.js']
      }
    },
    jshint: {
      all: {
        src: ['src/**/*.js', '!src/icu-format-parser.js'],
        options: {
          jshintrc: '.jshintrc'
        }
      }
    },
    jscs: {
      all: {
        options: {
          config: '.jscsrc',
          files: {
            src: ['src/**/*.js', '!src/icu-format-parser.js'],
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-peg');

  grunt.registerTask('test', [
    'jshint:all',
    'jscs',
    'mochaTest'
  ]);

  grunt.registerTask('default', ['peg', 'test']);
};

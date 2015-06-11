'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    env: {
      coverage: {
        APP_DIR_FOR_CODE_COVERAGE: '../build/coverage/instrument/src'
      }
    },
    clean: {
      build: ['build/'],
      peg: ['src/icu-format-parser.js']
    },
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
      },
      report: {
        src: ['src/**/*.js', '!src/icu-format-parser.js'],
        options: {
          jshintrc: '.jshintrc',
          reporter: require('jshint-jenkins-checkstyle-reporter'),
          reporterOutput: 'build/reports/report-jshint-checkstyle.xml'
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
    },

    
    mocha_istanbul: {
      coverage: {
        src: ['tests/**/*_test.js'],
        options: {
          coverageFolder: 'build/reports/coverage',
          reportFormats: ['html', 'lcovonly', 'cobertura'],
          mask: '**/*_test.js',
          root: './src'
        }
      }
    },
    
    sloccount: {
      options: {
        reportPath: 'build/reports/sloc.sc'
      },
      src: ['src/**/*.js', '!src/icu-format-parser.js', '!**/*.cm']
    }
     

  });

  grunt.loadNpmTasks('grunt-mocha-istanbul');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-peg');
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-sloccount');

  grunt.registerTask('reports', [
    'coverage',
    'sloccount',
    'jshint:report'
  ]);

  grunt.registerTask('coverage', [
    'mocha_istanbul'
  ]);

  grunt.registerTask('test', [
    'mochaTest:test'
  ]);

  grunt.registerTask('analyze', [
    'jshint:all',
    'jscs'
  ]);

  grunt.registerTask('prepare', [
    'clean:build',
    'clean:peg'
  ]);

  grunt.registerTask('default', ['prepare', 'peg', 'analyze', 'test', 'reports']);
};

'use strict';

module.exports = function (config) {
  config.set({
    basePath: 'client/',

    frameworks: ['jasmine', 'requirejs'],

    files: [
      'js/spec-main.js',

      {
        pattern: 'js/**/*.js',
        included: false
      },

      {
        pattern: 'bower_components/**/*.js',
        included: false,
        watched: false
      },

      {
        pattern: 'html/**/*.html',
        included: false
      },

      {
        pattern: '*.html',
        included: false
      }
    ],


    preprocessors: {
      '**/js/**/*.js': 'coverage'
    },

    exclude: [

    ],

    reporters: ['progress', 'coverage'],

    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    },

    port: 9876,

    runnerPort: 9100,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['PhantomJS'],

    captureTimeout: 60000,

    singleRun: true
  });
};
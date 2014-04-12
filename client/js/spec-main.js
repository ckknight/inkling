/*global requirejs: false*/
requirejs.config({
  baseUrl: "/base/js",

  deps: [
    'angular',
    'angular-mocks'
  ],

  paths: {
    'angular': '../bower_components/angular/angular',
    'angular-mocks': '../bower_components/angular-mocks/angular-mocks',
    'jquery': '../bower_components/jquery/dist/jquery',
    'json3': '../bower_components/json3/lib/json3',
    'es5-shim': '../bower_components/es5-shim/es5-shim',
    'es5-sham': '../bower_components/es5-shim/es5-sham',
    'es6-shim': '../bower_components/es6-shim/es6-shim',
    'angular-ui-router': '../bower_components/angular-ui-router/release/angular-ui-router',
    'lodash': '../bower_components/lodash/dits/lodash'
  },

  shim: {
    angular: {
      deps: [
        'jquery',
        'json3',
        'es5-shim',
        'es5-sham',
        'es6-shim'
      ]
    },
    "angular-mocks": ["angular"]
  },

  callback: function () {
    'use strict';

    requirejs(['./app'], function () {
      var tests = [];
      for (var file in window.__karma__.files) {
        if (window.__karma__.files.hasOwnProperty(file)) {
          if (/\.spec\.js$/i.test(file)) {
            tests.push(file);
          }
        }
      }
      requirejs(tests, function () {
        window.__karma__.start();
      })
    });
  }
});
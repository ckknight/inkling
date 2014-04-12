/*global requirejs: false*/
requirejs.config({
  deps: [
    'angular'
  ],

  paths: {
    'angular': '../bower_components/angular/angular',
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
    }
  },

  callback: function () {
    'use strict';

    requirejs(['jquery', './app'], function ($) {
      $(function () {
        angular.bootstrap(document, ["myApp"]);
      });
    });
  }
});
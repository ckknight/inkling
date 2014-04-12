define(function (require) {
  'use strict';

  require('angular-ui-router');

  return angular
    .module('myApp', [
      'ui.router'
    ])
    .controller('AppController', require('./controllers/AppController'))
    .controller('HomeController', require('./controllers/HomeController'))
    .config(['$urlRouterProvider', '$stateProvider',
      function ($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
          .state('home', {
            url: '/',
            templateUrl: 'html/home.html',
            controller: 'HomeController'
          })
      }
    ]);
});
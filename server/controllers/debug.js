'use strict';

var route = require('koa-route');

exports.init = function (app) {
  app.use(route.get('/api/brew-coffee', brewCoffee));
  app.use(route.get('/api/throw-error', throwError));
};

function * brewCoffee() {
  this.status = 418;
  this.body = 'I am a teapot';
}

function * throwError() {
  throw new Error('Test error thrown');
}
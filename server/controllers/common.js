'use strict';

var route = require('koa-route');

exports.init = function (app) {
  app.use(handle404);
};

function * handle404(next) {
  yield next;

  if (this.status) {
    // already handled
    return;
  }

  this.status = 404;
  switch (this.accepts('html', 'json')) {
  case 'html':
    this.type = 'html';
    // TODO: change to a send call
    this.body = '<p>Page Not Found</p>';
    break;
  case 'json':
    this.body = {
      message: 'Page Not Found'
    };
    break;
  default:
    this.type = 'text';
    this.body = 'Page Not Found';
  }
}
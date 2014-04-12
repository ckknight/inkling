'use strict';

var fs = require('fs'),
  logger = require('koa-logger'),
  etag = require('koa-etag'),
  send = require('koa-send'),
  serve = require('koa-static'),
  json = require('koa-json'),
  session = require('koa-session'),
  compress = require('koa-compress'),
  err = require('koa-err'),
  responseTime = require('koa-response-time'),
  conditional = require('koa-conditional-get'),
  config = require('./config'),
  path = require('path');

module.exports = function (app) {
  // middleware configuration
  app.use(responseTime());
  app.use(err());

  if (config.app.env !== 'test') {
    app.use(logger());
  }

  app.use(conditional());
  app.use(compress());
  app.use(etag());
  if (config.app.env === 'development') {
    // upgrade to the real koa-livereload when issue #5 is fixed
    app.use(require('./koa-livereload')({
      excludes: ['/modules', '/templates']
    }));
  }

  if (config.app.env !== 'production') {
    app.use(json());
  }

  app.use(serve(path.join(__dirname, '../../client')));

  app.keys = [config.secret];
  app.use(session());

  // mount all the routes defined in the api controllers
  fs.readdirSync(path.join(__dirname, '../controllers')).forEach(function (file) {
    require('../controllers/' + file).init(app);
  });
};
'use strict';

var fs = require('fs'),
  logger = require('koa-logger'),
  etag = require('koa-etag'),
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
    app.use(require('koa-livereload')({
      excludes: ['/modules']
    }));
  }

  if (config.app.env !== 'production') {
    app.use(json());
  }

  // serve the angular static files from the /client directory, use caching (7 days) only in production
  // if the file is not found and requested path is not /api, serve index.html page and let angular handle routing
  var sendOpts = config.app.env === 'production' ? {
    root: 'client',
    maxage: 1000 * 60 * 60 * 24 * 7
  } : {
    root: 'client'
  };

  app.use(serve(path.join(__dirname, '../../client')));

  app.keys = [config.secret];
  app.use(session());

  // mount all the routes defined in the api controllers
  fs.readdirSync(path.join(__dirname, '../controllers')).forEach(function (file) {
    require('../controllers/' + file).init(app);
  });
};
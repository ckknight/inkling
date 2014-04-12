'use strict';

/**
 * Entry point for KOAN app. Initiates database connection and starts listening for requests on configured port.
 */

require('es6-shim');
var config = require('./server/config/config'),
  koaConfig = require('./server/config/koa'),
  co = require('co'),
  koa = require('koa'),
  app = koa();

module.exports = app;

app.init = co(function * () {
  // koa config
  koaConfig(app);

  // create http and start listening for requests
  app.server = app.listen(config.app.port);
  if (config.app.env !== 'test') {
    console.log(config.app.name + ' listening on port ' + config.app.port);
  }
});

// auto init if this app is not being initialized by another module (i.e. using require('./app').init();)
if (!module.parent) {
  app.init();
}
'use strict';

var path = require('path'),
  _ = require('lodash');

/**
 * Environment variables and application configuration.
 */
var baseConfig = {
  app: {
    name: "Inkling",
    root: path.normalize(path.join(__dirname, '../..')),
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development',
    secret: 'secret key'
  }
};

var platformConfig = {
  development: {},

  test: {
    app: {
      port: 3001
    }
  },

  production: {}
};

// override the base configuration with the platform specific values
_.merge(baseConfig, platformConfig[baseConfig.app.env]);
module.exports = baseConfig;
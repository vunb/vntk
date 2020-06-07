'use strict'
const kites = require('@kites/core');
const apiRoutes = require('./api')

kites
  .engine({
    loadConfig: true,
    discover: true,
  })
  .use(apiRoutes)
  .init()
  .then(function (kites) {
    kites.logger.info('VNTK API Server has initialized!');
  })
  .catch(function (e) {
    console.error(e.stack);
    process.exit(1);
  })

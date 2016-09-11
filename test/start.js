var path = require('path');

/**
 * Import specs
 */
var dir = '../test/specs/';
[
  'ws'
].forEach((script) => {
  require(path.join(dir, script));
});
var path = require('path');

/**
 * Import specs
 */
var dir = '../test/specs/';
[
  'ws',
  'util'
].forEach((script) => {
  require(path.join(dir, script));
});
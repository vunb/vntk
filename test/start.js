var path = require('path');

/**
 * Import specs
 */
var dir = '../test/specs/';
[
  'util',
  'tokenizer',
  'normalizer'
].forEach((script) => {
  require(path.join(dir, script));
});
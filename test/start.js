var path = require('path');

/**
 * Import specs
 */
var dir = '../test/specs/';
[
  'util',
  'tokenizer',
  'normalizer',
  'word_sent'
].forEach((script) => {
  require(path.join(dir, script));
});
var path = require('path');

/**
 * Import specs
 */
var dir = '../test/specs/';
[
  'util',
  'tokenizer',
  'normalizer',
  'tokenizer/word_tokenizer',
  'pos_tag',
  'chunking',
  'ner',
  'tfidf',
  'bayes_classifier',
  'langid',
  'dictionary',
  'crfsuite',
].forEach((script) => {
  require(path.join(dir, script));
});

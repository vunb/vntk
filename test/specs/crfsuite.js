'use strict';
var test = require('tape'),
  path = require('path'),
  crfsuite = require('../../lib/crfsuite');
// crfsuite = vntk.crfsuite();

test('crfsuite load trained model', function (t) {
  t.plan(1);

  var tagger = new crfsuite.Tagger();
  var modelFilename = path.resolve(__dirname, './models/model.bin');
  var result = tagger.open(modelFilename);

  t.true(result, 'Open model file should be ok!');
})

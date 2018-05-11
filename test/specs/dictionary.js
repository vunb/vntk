'use strict';
const test = require('tape');
const vntk = require('../../lib/vntk');
const dictionary = vntk.dictionary();

test('vntk dictionary', function (t) {
    t.plan(1);
    t.true(dictionary.has('chào'), 'Check a word is exists in dictionary');
})
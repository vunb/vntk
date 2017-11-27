'use strict';
const test = require('tape');
const vntk = require('../../lib/vntk');

test('perform binary classifcation', function (t) {
    t.plan(2);

    let classifier = new vntk.BayesClassifier();

    classifier.addExample([1, 1, 1, 0, 0, 0], 'one');
    classifier.addExample([1, 0, 1, 0, 0, 0], 'one');
    classifier.addExample([1, 1, 1, 0, 0, 0], 'one');
    classifier.addExample([0, 0, 0, 1, 1, 1], 'two');
    classifier.addExample([0, 0, 0, 1, 0, 1], 'two');
    classifier.addExample([0, 0, 0, 1, 1, 0], 'two');

    classifier.train();

    t.equal(classifier.classify([1, 1, 0, 0, 0, 0]), 'one');
    t.equal(classifier.classify([0, 0, 0, 0, 1, 1]), 'two');

})

test('classify text', function (t) {
    t.plan(2);

    let classifier = new vntk.BayesClassifier();

    classifier.addDocument('i fixed the box', 'computing');
    classifier.addDocument('i write code', 'computing');
    classifier.addDocument('nasty script code', 'computing');
    classifier.addDocument('write a book', 'literature');
    classifier.addDocument('read a book', 'literature');
    classifier.addDocument('study the books', 'literature');

    classifier.train();
    

    t.equal(classifier.classify('a bug in the code'), 'computing');
    t.equal(classifier.classify('read all the books'), 'literature');

})
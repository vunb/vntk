/**
 * Public VNTK APIs
 * 
 * Copyright (C) 2016 VNTK Project
 * Author: Nhu Bao Vu <nhubaovu@gmail.com>
 * Homepage: https://vntk.github.io/
 */

'use strict';
// singleton instance

exports.util = require('./util');
exports.tokenizer = require('./tokenizer');
exports.word_sent = require('./word_sent');
exports.pos_tag = require('./pos_tag');
exports.chunking = require('./chunking');
exports.ner = require('./ner');

// exports class

exports.TfIdf = require('./tfidf');
exports.BayesClassifier = require('./classifiers').BayesClassifier;
exports.LogisticRegressionClassifier = require('./classifiers').LogisticRegressionClassifier;
exports.FastTextClassifier = require('./classifiers').FastTextClassifier;
exports.Langid = () => require('./langid');

// external components
exports.getDictionary = () => require('@vntk/dictionary');
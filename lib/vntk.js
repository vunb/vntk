/**
 * Public VNTK APIs
 * 
 * Copyright (C) 2016 VNTK Project
 * Author: Nhu Bao Vu <nhubaovu@gmail.com>
 * Homepage: https://vntk.github.io/
 */

'use strict';
const fs = require('fs')
// singleton instance

exports.util = () => require('./util');
exports.tokenizer = () => require('./tokenizer');

/**
 * Word Segmentation
 * @param {String} modelFileName new custom model
 */
exports.wordSent = (modelFileName) => {
    if(modelFileName && fs.existsSync(modelFileName)) {
        return require('./word_sent').newModel(modelFileName)
    } else  {
        return require('./word_sent')
    }
}

/**
 * POS Tagging
 * @param {String} modelFileName new custom model
 */
exports.posTag = (modelFileName) => {
    if(modelFileName && fs.existsSync(modelFileName)) {
        return require('./pos_tag').newModel(modelFileName)
    } else  {
        return require('./pos_tag')
    }
}

/**
 * get Chunking tool
 * @param {String} modelFileName new custom model
 */
exports.chunking = (modelFileName) => {
    if(modelFileName && fs.existsSync(modelFileName)) {
        return require('./chunking').newModel(modelFileName)
    } else  {
        return require('./chunking')
    }
};

/**
 * get NER - Named Entity Recognition
 * @param {String} modelFileName new custom model
 */
exports.ner = (modelFileName) => {
    if(modelFileName && fs.existsSync(modelFileName)) {
        return require('./ner').newModel(modelFileName)
    } else  {
        return require('./ner')
    }
};

// exports class

exports.TfIdf = require('./tfidf');
exports.BayesClassifier = require('./classifiers').BayesClassifier;
exports.LogisticRegressionClassifier = require('./classifiers').LogisticRegressionClassifier;
exports.FastTextClassifier = require('./classifiers').FastTextClassifier;
exports.Langid = () => require('./langid');

// external components
exports.getDictionary = () => require('@vntk/dictionary');
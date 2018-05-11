/**
 * Public VNTK APIs
 * 
 * Copyright (C) 2016 VNTK Project
 * Author: Nhu Bao Vu <nhubaovu@gmail.com>
 * Homepage: https://vntk.github.io/
 */

'use strict';
const fs = require('fs')
const util = require('util')
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

/**
 * Langid - Language identification
 * @param {String} modelFileName new custom model
 */
exports.langid = (modelFileName) => {
    if(modelFileName && fs.existsSync(modelFileName)) {
        return require('./langid').newModel(modelFileName)
    } else  {
        return require('./langid')
    }
};

exports.dictionary = (modelFileName) => {
    if(modelFileName && fs.existsSync(modelFileName)) {
        return new require('@vntk/dictionary').Dictionary(modelFileName)
    } else  {
        return require('@vntk/dictionary')
    }
}

// exports class
// Use with CamelCase convention.
exports.TfIdf = require('./tfidf');
exports.BayesClassifier = require('./classifiers').BayesClassifier;
exports.LogisticRegressionClassifier = require('./classifiers').LogisticRegressionClassifier;
exports.FastTextClassifier = require('./classifiers').FastTextClassifier;

/**
 * Depreciated
 * Please use lower camelCase api with custom model.
 */
exports.Langid = util.deprecate(exports.langid, '`vntk.Langid()` is depreciated, please use `vntk.langid([custom_model])` instead.')
exports.getDictionary = util.deprecate(exports.dictionary, '`vntk.getDictionary()` is depreciated, please use `vntk.dictionary([custom_model])` instead.')

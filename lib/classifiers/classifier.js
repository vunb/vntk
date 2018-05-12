'use strict';

const EventEmitter = require('events').EventEmitter;
const tagger = require('../word_tokenizer');
const stopwords = require('../util/stopwords');

class Classifier extends EventEmitter {

    constructor() {
        super();

        this.docs = [];
        this.features = {};
    }

    tokenize(text, keepStops) {
        let tokens = [];
        let words = tagger.tag(text);

        if (!keepStops) {
            for (let w of words) {
                // remove stopwords
                if (stopwords.words.indexOf(w) < 0) {
                    tokens.push(w);
                }
            }
        } else {
            tokens = words;
        }

        // console.log(text, tokens);
        return tokens;
    }

    textToFeatures(text) {
        let features = [];
        if (typeof text === 'string') {
            text = this.tokenize(text, true);
        }

        for (let feature in this.features) {
            if (text.indexOf(feature) < 0) {
                features.push(0)
            } else {
                features.push(1)
            }
        }

        return features;
    }

    train() {
        for (let doc of this.docs) {
            let features = this.textToFeatures(doc.text);
            this.addExample(features, doc.label);
        }
        // execute instance trainer
        this.doTrain();
    }

    doTrain() {
        throw 'Not implemented'
    }

    classify(observation) {
        let classifications = this.getClassifications(this.textToFeatures(observation));
        if (!classifications || classifications.length === 0)
            throw 'Not Trained'

        // console.log(observation, classifications);
        return classifications[0].label;
    }

    addExample(observation, classification) {
        throw 'Not implemented'
    }

    getClassifications(observation) {
        throw 'Not Trained'
    }

    addDocument(text, classification) {
        if (typeof classification === 'undefined') return;

        if (typeof classification === 'string') {
            classification = classification.trim();
        }

        // word segmentation
        if (typeof text === 'string') {
            text = this.tokenize(text, true);
        }

        // check input is empty
        if (text.length === 0) return;

        this.docs.push({
            label: classification,
            text: text
        });

        for (let token of text) {
            this.features[token] = (this.features[token] || 0) + 1;
        }
    }

}

module.exports = Classifier;
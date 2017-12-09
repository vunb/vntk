'use strict';
const _ = require('lodash');
const fs = require('fs');
const tokenizer = require('../tokenizer');
const stopwords = require('../util/stopwords').words;

/**
 * Term Frequency–Inverse Document Frequency (tf-idf)
 * Tf-Idf determine how important a word (or words) is to a document relative to a corpus.
 */
module.exports = class TfIdf {

    constructor(options) {

        // override
        this.options = Object.assign({
            documents: [],
        }, options);

        this._documents = this.options.documents;
        this._idfCache = this.empty;
        this.tokenizer = tokenizer;
    }

    get documents() {
        return this._documents;
    }

    get empty() {
        return Object.create(null);
    }

    setTokenizer(tokenizer) {
        if (!_.isFunction(tokenizer.tokenize)) throw new Error('Expected a valid Tokenizer');
        this.tokenizer = tokenizer;
    }

    documentHasTerm(term, doc) {
        return doc[term] > 0;
    }

    buildDocument(text, key) {
        if (typeof text === 'string') {
            text = this.tokenizer.tokenize(text.toLowerCase())
        } else if (!_.isArray(text)) {
            return text;
        }

        // build document as an map of terms
        // Object.create(null) resolves https://github.com/NaturalNode/natural/issues/119
        let doc = Object.assign(this.empty, {__key: key});
        return text.reduce((doc, term) => {
            if (stopwords.indexOf(term) < 0) {
                doc[term] = (doc[term] || 0) + 1
            }
            return doc;
        }, doc);
    }

    tf(term, doc) {
        return doc[term] || 0;
    }

    idf(term, force) {
        // search new term-idf caching
        if (this._idfCache[term] && force !== true) {
            return this._idfCache[term];
        }

        // calculate idf
        let count = this.documents.reduce((count, doc) => {
            return count + this.documentHasTerm(term, doc)   
        }, 0);

        let idf = 1 + Math.log(this.documents.length / (1 + count));
        // add idf of term to cache
        this._idfCache[term] = idf;
        return idf;
    }

    tfidf(terms, docIndex) {
        if (!_.isArray(terms)) {
            terms = this.tokenizer.tokenize(terms.toString().toLowerCase())
        }

        return terms.reduce((value, term) => {
            let idf = this.idf(term);
            idf = idf === Infinity ? 0 : idf;
            return value + (this.tf(term, this.documents[docIndex]) * idf);
        }, 0.0);
    }

    tfidfs(terms, callback) {
        let tfidfs = [];
        
        for (let index = 0; index < this.documents.length; index++) {
            let tfidf = this.tfidf(terms, index)
            tfidfs.push(tfidf);

            callback && callback(index, tfidf, this.documents[index].__key);
        }

        return tfidfs;
    }

    addDocument(doc, key, restoreCache) {
        this.documents.push(this.buildDocument(doc, key));

        if (restoreCache === true) {
            // re-calculate idf with option force
            for (let term in this._idfCache) {
                this.idf(term, true)
            }
        } else {
            // remove cache
            this._idfCache = this.empty;
        }
    }

    listTerms(d) {
        let terms = [];
        let documents = Object.assign({}, this.documents);
        delete documents['__key'];

        for(let term in documents[d]) {
            terms.push({term: term, tfidf: this.tfidf(term, d)});
        }

        return terms.sort((x, y) => y.tfidf - x.tfidf);
    }

}
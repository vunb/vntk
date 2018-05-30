'use strict';
const vntk = require('../lib/vntk');

const tokenizer = vntk.wordTokenizer();
const posTag = vntk.posTag();
const chunking = vntk.chunking();
const ner = vntk.ner();

// kites extension definition
module.exports = function (kites) {
    kites.on('expressConfigure', (app) => {

        /**
         * API Homepage
         */
        app.get('/', (req, res) => {
            res.send('This is an example Vntk Server!')
        })

        /**
         * Word Tokenizer
         */
        app.get('/api/tok/:text', (req, res) => {
            var text = req.param('text')
            var format = req.param('format')
            var result = tokenizer.tag(text, format)
            res.ok(result)
        });
        
        /**
         * POS Tagging
         */
        app.get('/api/pos/:text', (req, res) => {
            var text = req.param('text')
            var format = req.param('format')
            var result = posTag.tag(text, format)
            res.ok(result)
        })

        /**
         * Chunking
         */
        app.get('/api/chunking/:text', (req, res) => {
            var text = req.param('text')
            var format = req.param('format')
            var result = chunking.tag(text, format)
            res.ok(result)
        })

        /**
         * Named Entity Recognition
         */
        app.get('/api/ner/:text', (req, res) => {
            var text = req.param('text')
            var format = req.param('format')
            var result = ner.tag(text, format)
            res.ok(result)
        })

    })
}
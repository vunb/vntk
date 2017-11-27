'use strict';
const test = require('tape');
const vntk = require('../../lib/vntk');

test('functions test', function (t) {
    t.plan(2)

    let tfidf = new vntk.TfIdf()

    t.equal(tfidf.tf('document', { document: 2, one: 1}), 2, 'tf count (2) for "document"')
    t.equal(tfidf.tf('document', { two: 2, one: 1}), 0, 'tf count (0) for "document"')
})

test('build documents', function (t) {
    t.plan(2)

    let tfidf = new vntk.TfIdf()
    
    tfidf.addDocument('document one', 'mot')
    tfidf.addDocument('document Two', 'hai')

    tfidf.tfidfs('two', (i, tfidf, key) => {
        if (i === 0) {
            t.equal(key, 'mot')
        } else {
            t.equal(key, 'hai')
        }
    })
})

test('parse a deserialized object', function (t) {
    t.plan(2)

    let tfidf = new vntk.TfIdf({
        documents: [
            {
                __key: 'mot',
                document: 1,
                one: 1
            },
            {
                __key: 'hai',
                document: 1,
                two: 1
            }
        ]
    })

    tfidf.tfidfs('two', (i, tfidf, key) => {
        if (i === 0) {
            t.equal(key, 'mot')
        } else {
            t.equal(key, 'hai')
        }
    })
})


test('tf calculations', function (t) {
    t.plan(2)

    let tfidf = new vntk.TfIdf()

    tfidf.addDocument('this document is about node.');
    tfidf.addDocument('this document is about ruby.');
    tfidf.addDocument('this document is about ruby and node.');
    tfidf.addDocument('this document is about node. it has node examples');

    t.equal(tfidf.idf('node'), (1 + Math.log(4.0 / 4.0)))

    tfidf.addDocument({text: 'this document is about python'});
    tfidf.addDocument(['this', 'document', 'is', 'about', 'node', 'and', 'JavaScript']);

    t.equal(tfidf.idf('node'), (1 + Math.log(6.0 / 5.0)))    
})


test('tf-idf calculations', function (t) {
    t.plan(3)

    let tfidf = new vntk.TfIdf()
    
    // Add 2 documents
    tfidf.addDocument('this document is about node.', 0);
    tfidf.addDocument('this document is about ruby.', 1);

    // check the tf-idf for 'node'
    t.equal(tfidf.tfidf('ruby', 0), 0)    
    t.equal(tfidf.tfidf('node', 0), 1 * ( 1 + Math.log( 2.0 / 2.0 ) ))    
    
    // Add 2 more documents
    tfidf.addDocument('this document is about ruby and node.');
    tfidf.addDocument('this document is about node. it has node examples');

    // Ensure that the tf-idf in the same document has changed to reflect the new idf.
    t.equal(tfidf.tfidf('node', 0), 1 * ( 1 + Math.log( 4.0 / 4.0 ) ))    
    
})
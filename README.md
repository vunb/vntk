# VNTK

Vietnamese NLP Toolkit for Node

[![npm version](https://img.shields.io/npm/v/vntk.svg?style=flat)](https://www.npmjs.com/package/vntk)
[![npm downloads](https://img.shields.io/npm/dm/vntk.svg)](https://www.npmjs.com/package/vntk)
[![Travis](https://travis-ci.org/vunb/vntk.svg?branch=master)](https://travis-ci.org/vunb/vntk)
[![Appveyor](https://ci.appveyor.com/api/projects/status/3xej24k2f9qlm2v8/branch/master?svg=true)](https://ci.appveyor.com/project/Vunb/vntk/branch/master)


# Installation In A Nutshell

1. Install [Node.js](http://nodejs.org/)
2. Run: `$ npm install -g vntk`

If you are interested in contributing to **vntk**, or just hacking on it, then fork it away!

# API Usage

* [1. Tokenizer](#1-tokenizer)
* [2. Word Segmentation](#2-word-segmentation)
* [3. POS Tagging](#3-pos-tagging)
* [4. Chunking](#4-chunking)
* [5. Named Entity Recognition](#5-named-entity-recognition)
* [6. Utility](#6-utility)
* [7. TF-IDF](#7-tf-idf)
* [8. Classifiers](#8-classifiers)
* [9. Language identification](#9-language-identification)

## 1. Tokenizer

> Word Tokenizer using Regular Expression.  
> Tokenizer is provided to break text into arrays of tokens!

Example:

```js
var vntk = require('vntk');
var tokenizer = vntk.tokenizer;

console.log(tokenizer.tokenize('Giá khuyến mãi: 140.000đ / kg  ==> giảm được 20%'))
// [ 'Giá', 'khuyến', 'mãi', ':', '140.000', 'đ', '/', 'kg', '==>', 'giảm', 'được', '20', '%' ]

console.log(tokenizer.stokenize('Giá khuyến mãi: 140.000đ / kg  ==> giảm được 20%'))
// Giá khuyến mãi : 140.000 đ / kg ==> giảm được 20 %
```

Command line: `vntk tok <file_name.txt>`

## 2. Word Segmentation

> Vietnamese Word Segmentation using Conditional Random Fields, called: `word_sent`.  
> Word_Sent helps break text into arrays of words!

```js
var vntk = require('vntk');
var word_sent = vntk.word_sent;

console.log(word_sent.tag('Chào mừng các bạn trẻ tới thành phố Hà Nội'))
// [ 'Chào mừng', 'các', 'bạn', 'trẻ', 'tới', 'thành phố', 'Hà Nội' ]

console.log(word_sent.tag('Chào mừng các bạn trẻ tới thành phố Hà Nội', 'text'))
// Chào_mừng các bạn trẻ tới thành_phố Hà_Nội
```

Command line: `vntk ws <file_name.txt>`

## 3. POS Tagging

> Vietnamese Part of Speech Tagging using Conditional Random Fields, called: `pos_tag`.  
> Pos_Tag helps labeling the part of speech of sentences!

```js
var vntk = require('vntk');
var pos_tag = vntk.pos_tag;

console.log(pos_tag.tag('Chợ thịt chó nổi tiếng ở TP Hồ Chí Minh bị truy quét'))
// [ [ 'Chợ', 'N' ],
//   [ 'thịt', 'N' ],
//   [ 'chó', 'N' ],
//   [ 'nổi tiếng', 'A' ],
//   [ 'ở', 'E' ],
//   [ 'TP', 'N' ],
//   [ 'Hồ', 'Np' ],
//   [ 'Chí', 'Np' ],
//   [ 'Minh', 'Np' ],
//   [ 'bị', 'V' ],
//   [ 'truy quét', 'V' ] ]
```

Command line: `vntk pos <file_name.txt>`

## 4. Chunking

> Vietnamese Chunking using Conditional Random Fields  
> Chucking helps labeling the part of speech of sentences and short phrases (like noun phrases)!

```js
var vntk = require('vntk');
var chunking = vntk.chunking;

console.log(chunking.tag('Nhật ký SEA Games ngày 21/8: Ánh Viên thắng giòn giã ở vòng loại.'))
// [ [ 'Nhật ký', 'N', 'B-NP' ],
//   [ 'SEA', 'N', 'B-NP' ],
//   [ 'Games', 'Np', 'B-NP' ],
//   [ 'ngày', 'N', 'B-NP' ],
//   [ '21/8', 'M', 'B-NP' ],
//   [ ':', 'CH', 'O' ],
//   [ 'Ánh', 'Np', 'B-NP' ],
//   [ 'Viên', 'Np', 'I-NP' ],
//   [ 'thắng', 'V', 'B-VP' ],
//   [ 'giòn giã', 'N', 'B-NP' ],
//   [ 'ở', 'E', 'B-PP' ],
//   [ 'vòng', 'N', 'B-NP' ],
//   [ 'loại', 'N', 'B-NP' ],
//   [ '.', 'CH', 'O' ] ]
```

Command line: `vntk chunk <file_name.txt>`

## 5. Named Entity Recognition

> Vietnamese Named Entity Recognition (NER) using Conditional Random Fields  
> In NER, your goal is to find named entities, which tend to be noun phrases (though aren't always)

```js
var vntk = require('vntk');
var ner = vntk.ner;

console.log(ner.tag('Chưa tiết lộ lịch trình tới Việt Nam của Tổng thống Mỹ Donald Trump'))
// [ [ 'Chưa', 'R', 'O', 'O' ],
//   [ 'tiết lộ', 'V', 'B-VP', 'O' ],
//   [ 'lịch trình', 'V', 'B-VP', 'O' ],
//   [ 'tới', 'E', 'B-PP', 'O' ],
//   [ 'Việt Nam', 'Np', 'B-NP', 'B-LOC' ],
//   [ 'của', 'E', 'B-PP', 'O' ],
//   [ 'Tổng thống', 'N', 'B-NP', 'O' ],
//   [ 'Mỹ', 'Np', 'B-NP', 'B-LOC' ],
//   [ 'Donald', 'Np', 'B-NP', 'B-PER' ],
//   [ 'Trump', 'Np', 'B-NP', 'I-PER' ] ]
```

Command line: `vntk ner <file_name.txt>`

## 6. Utility

### Clean html

```javascript
var vntk = require("vntk");
var util = vntk.util;

util.clean_html("<span style='color: #4b67a1;'>Xin chào!!!</span>");
// Xin chào!!!
```

```bash
# command line
vntk clean <file_name1.txt>
```

## 7. TF-IDF

[Term Frequency–Inverse Document Frequency (tf-idf)](http://en.wikipedia.org/wiki/Tf%E2%80%93idf) is implemented to determine how important a word (or words) is to a document relative to a corpus. See following example.

```js
var vntk = require('./lib/vntk');
var tfidf = new vntk.TfIdf();

tfidf.addDocument('Đại tướng Trần Đại Quang - Ủy viên Bộ Chính trị, Bí thư Đảng ủy Công an Trung ương, Bộ trưởng Bộ Công an.');
tfidf.addDocument('Thượng tướng Tô Lâm - Ủy viên Bộ Chính trị - Thứ trưởng Bộ Công an.');
tfidf.addDocument('Thượng tướng Lê Quý Vương - Ủy viên Trung ương Đảng - Thứ trưởng Bộ Công an.');
tfidf.addDocument('Thiếu tướng Bùi Mậu Quân - Phó Tổng cục trưởng Tổng cục An ninh');

console.log('Bộ Công an --------------------------------');
tfidf.tfidfs('Bộ Công an', function(i, measure) {
    console.log('document #' + i + ' is ' + measure);
});

console.log('Tổng cục An ninh --------------------------------');
tfidf.tfidfs('Tổng cục An ninh', function(i, measure) {
    console.log('document #' + i + ' is ' + measure);
});
```

The above output:

```text
Bộ Công an --------------------------------
document #0 is 6.553712897371581
document #1 is 3.7768564486857903
document #2 is 2.7768564486857903
document #3 is 0.7768564486857903
Tổng cục An ninh --------------------------
document #0 is 1.5537128973715806
document #1 is 0.7768564486857903
document #2 is 0.7768564486857903
document #3 is 9.242592351485516
```

## 8. Classifiers

[Naive Bayes](http://en.wikipedia.org/wiki/Naive_Bayes_classifier), [fastText](https://github.com/facebookresearch/fastText) are classifiers currently supported.

The following examples use the **BayesClassifier** class:

```js
var vntk = require('vntk');

var classifier = new vntk.BayesClassifier();

classifier.addDocument('khi nào trận chiến đã kết thúc?', 'when');
classifier.addDocument('tàu rời đi lúc mấy giờ?', 'when');
classifier.addDocument('trận đấu diễn ra vào thời gian nào?', 'when');
classifier.addDocument('anh ấy rời đi vào lúc mấy giờ?', 'when');
classifier.addDocument('bao giờ thì đến lễ hội hóa trang?', 'when');
classifier.addDocument('ai phát hiện ra điện ?', 'who');
classifier.addDocument('người sáng lập ra microsoft là ai?', 'who');
classifier.addDocument('ai kiếm được tiền của họ một cách chăm chỉ ?', 'who');
classifier.addDocument('người phát minh tạo ra.', 'who');
classifier.addDocument('gia đình bạn gồm những ai?', 'who');

classifier.train();


console.log(classifier.classify('chiến tranh thế giới bắt đầu vào lúc nào?'));
// output: when

console.log(classifier.classify('kẻ thù của luffy là ai?'));
// output: who
```

### FastText Classifier

According to [fasttext.cc](https://fasttext.cc/docs/en/supervised-tutorial.html). We have a simple classifier for executing prediction models about `cooking` from stackexchange questions:

```js
const path = require('path');
const vntk = require('vntk');

const model = path.resolve(__dirname, './model_cooking.bin');
const classifier = new vntk.FastTextClassifier(model);

classifier.predict('Why not put knives in the dishwasher?', 5, (err, res) => {
    if (err) {
        console.error(err);
    } else if (res.length > 0) {
        let tag = res[0].label; // __label__knives
        let confidence = res[0].value // 0.8787146210670471
        console.log('classify', tag, confidence, res);
    } else {
        console.log('No matches');
    }
});
```

## 9. Language identification

**VNTK Langid** can identify 176 languages from text samples and return confidence scores for each (see the list of ISO codes below). This model was trained by [fastText](https://fasttext.cc/docs/en/language-identification.html) on data from Wikipedia, Tatoeba and SETimes, used under CC-BY-SA.

Api usage example:

* langid.detect([input])
* langid.getLanguages([input, num, callback])
* langid.langids - list of supported languages

```js
const langid = require('vntk').Langid;

// returns the most accuracy language detected
langid.detect('sử dụng vntk với fastext rất tuyệt?')
    .then((lid) => {
        console.log(lid)
        // vi
    });

// returns the list of detectable languages
langid.getLanguages('Wie lange bleiben Sie?', 5)
    .then((res) => {
        let lid = res[0].label;
        t.equal(lid, 'de', 'German');
        t.equal(res.length, 5, 'number of languagues are detected');
        console.log(res)
    });

// returns list of supported languagues
console.log(langid.langids)
```


List of supported languages

> af als am an ar arz as ast av az azb ba bar bcl be bg bh bn bo bpy br bs bxr ca cbk ce ceb ckb co cs cv cy da de diq dsb dty dv el eml en eo es et eu fa fi fr frr fy ga gd gl gn gom gu gv he hi hif hr hsb ht hu hy ia id ie ilo io is it ja jbo jv ka kk km kn ko krc ku kv kw ky la lb lez li lmo lo lrc lt lv mai mg mhr min mk ml mn mr mrj ms mt mwl my myv mzn nah nap nds ne new nl nn no oc or os pa pam pfl pl pms pnb ps pt qu rm ro ru rue sa sah sc scn sco sd sh si sk sl so sq sr su sv sw ta te tg th tk tl tr tt tyv ug uk ur uz vec vep vi vls vo wa war wuu xal xmf yi yo yue zh

# Contributing

Pull requests and stars are highly welcome.

For bugs and feature requests, please [create an issue](https://github.com/vunb/vntk/issues/new).

LICENSE
========

MIT.
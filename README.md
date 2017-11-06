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
// Giá khuyến mãi : 140.000 đ / kg ==> giảm được 20
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

# Contributing

Pull requests and stars are highly welcome.

For bugs and feature requests, please [create an issue](https://github.com/vunb/vntk/issues/new).

LICENSE
========

MIT.
# VNTK

Vietnamese language toolkit

[![npm version](https://img.shields.io/npm/v/vntk.svg?style=flat)](https://www.npmjs.com/package/vntk)
[![Travis](https://travis-ci.org/Vunb/vntk.svg?branch=master)](https://travis-ci.org/Vunb/vntk)
[![Appveyor](https://ci.appveyor.com/api/projects/status/3xej24k2f9qlm2v8/branch/master?svg=true)](https://ci.appveyor.com/project/Vunb/vntk/branch/master)


# Installation In A Nutshell

1. Install [Node.js](http://nodejs.org/)
2. Run: `$ npm install -g vntk`

# API Usage

Cách sử dụng các api / tiện ích dòng lệnh hỗ trợ xử lý tiếng Việt.

## Tiện ích tách từ

Chạy một tiện ích trong `vntk`, ví dụ cho bài toán tách từ tiếng Việt (word segmentation) như sau:

### Xử lý input là một chuỗi
```bash
$ vntk ws "Chào mừng bạn đến với đất nước Việt Nam"
$ Chào mừng bạn đến với đất_nước Việt_Nam
```

### Xử lý input là một tệp tin
```bash
$ vntk ws demo.txt another.txt -f
$ Result: demo.txt.seg, another.txt.seg
```

### Xử lý như một thư viện
```javascript
var vntk = require("vntk");
var ws = vntk.ws();

ws.segment("Chào mừng bạn đến với đất nước Việt Nam");
// Output: Chào mừng bạn đến với đất_nước Việt_Nam

ws.segmentF("ws_demo.txt");
// Output: ws_demo.txt.seg

ws.tokenize('Xin chào Việt Nam')
// Output: ['Xin', 'chào', 'Việt Nam']

```

## Tiện ích làm sạch văn bản

### Xử lý input là một chuỗi
```bash
$ vntk clean "<span style='color: #4b67a1;'>Xin chào!!!</span>"
$ Xin chào!!!
```

### Xử lý input là một tệp tin
```bash
$ vntk clean demo.html another.html -f
$ Result: demo.html.cleaned, another.html.cleaned
```

### Xử lý như một thư viện
```javascript
var vntk = require("vntk");
var util = vntk.util;

util.clean_html("<span style='color: #4b67a1;'>Xin chào!!!</span>");
// Output: Xin chào!!!
```

LICENSE
========

MIT.
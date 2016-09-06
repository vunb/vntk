# VNTK

Vietnamese language toolkit

# Installation In A Nutshell

1. Install [Node.js](http://nodejs.org/)
2. Run: `$ npm install -g vntk`

# API Usage

Chạy một tiện ích trong `vntk`, ví dụ cho bài toán tách từ tiếng Việt (word segmentation) như sau:

### Xử lý input là một chuỗi
```bash
$ vntk ws "Chào mừng bạn đến với đất nước Việt Nam"
$ Chào_mừng bạn đến với đất_nước Việt_Nam
```

### Xử lý input là một tệp tin
```bash
$ vntk ws -f demo.txt another.txt
$ Result: demo.txt.seg, another.txt.seg
```

### Xử lý như một thư viện
```javascript
var vntk = require("vntk");

vntk.ws("Chào mừng bạn đến với đất nước Việt Nam");
// Output: Chào_mừng bạn đến với đất_nước Việt_Nam
```

LICENSE
========

MIT.
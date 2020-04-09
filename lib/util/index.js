/**
 * Natural Language Toolkit: Utility functions
 * 
 * Copyright (C) 2016 VNTK Project
 * Author: Nhu Bao Vu <nhubaovu@gmail.com>
 * Homepage: https://vntk.github.io/
 */

var vm = module.exports;

/**
 * Remove HTML markup from the given string.
 * 
 * @html: the HTML string to be cleaned
 * @return: string
 */
vm.clean_html = function (html) {
    var cleaned = html;
    // First we remove inline JavaScript/CSS (http://stackoverflow.com/a/18052486/1896897)
    cleaned = cleaned.replace(/<script([^'"]|"(\\.|[^"\\])*"|'(\\.|[^'\\])*')*?<\/script>/gim, "");
    cleaned = cleaned.replace(/<style([^'"]|"(\\.|[^"\\])*"|'(\\.|[^'\\])*')*?<\/style>/gim, "");
    // Then we remove html comments (https://regex101.com/r/gB9iY8/3)
    cleaned = cleaned.replace(/<!--((.|[\r\n])*?)-->/g, "");
    // Next we can remove the remaining tags
    cleaned = cleaned.replace(/<.*?>/gi, " ");
    // Finally, we deal with whitespace
    cleaned = cleaned.replace(/&nbsp;/gi, " ");
    cleaned = cleaned.replace(/  /g, " ");
    cleaned = cleaned.replace(/  /g, " ");
    cleaned = cleaned.replace(/\n\s*\n/g, "\n");
    cleaned = cleaned.replace(/\s*\n/g, "\n");
    cleaned = cleaned.replace(/\n\s*/g, "\n ");
    return cleaned.trim();
}

// 
vm.replacer = require('./replacer');
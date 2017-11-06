/**
 * ===========================
 * token syntax
 * ===========================
 *         _ row 1
 *        /  _ row 2
 *       /  /  _ column
 *      /  /  /
 *    T[0,2][0]
 *          .is_digit
 *            \_ function
 *
 * ===========================
 * sample tagged sentence
 * ===========================
 * this     A
 * is       B
 * a        C
 * sample   D
 * sentence E
 */

'use strict';
const _ = require('lodash');
const titleCase = require('title-case');
const dict = require('@vntk/dictionary');

class WordFeatures {

    get functions() {
        return {
            "lower": this.text_lower,
            "istitle": this.text_isTitle,
            "isallcap": this.text_isUpperCase,
            "isdigit": this.text_isDigit,
            "is_in_dict": this.text_isInDict
        }
    }

    text_lower(word) {
        return word.toLowerCase();
    }

    text_isDigit(word) {
        return /^\d+$/.test(word);
    }

    text_isUpperCase(word) {
        return word === word.toUpperCase();
    }

    text_isTitle(word) {
        return word === titleCase(word);
    }

    text_isInDict(word) {
        return dict.has(word);
    }

    apply_template(name, word) {
        // console.log('apply_template', name, word)
        return this.functions[name](word);
    }

    toFeatures(sent, i, token_syntax, debug) {
        if (typeof debug === 'undefined') {
            debug = true;
        }
        
        let columns = [];
        for (let j = 0; j < sent[0].length; j++) {
            columns[j] = []; // values
            for (let colval of sent) {
                columns[j].push(colval[j])
            }
        }

        // console.log(columns)
        let prefix, result, word;
        let match = /T\[(\-?\d+),?(\-?\d+)?\](\[(.*)\])?(\.(.*))?/.exec(token_syntax);

        let index1 = match[1];
        let index2 = match[2];
        let column = match[4] || 0;
        let func = match[6];

        prefix = debug ? `${token_syntax}=` : '';
        index1 = index1 && parseInt(index1)
        index2 = index2 && parseInt(index2)

        if (i + index1 < 0) return `${prefix}BOS`;
        if (i + index1 >= sent.length) return `${prefix}EOS`;

        if (typeof index2 !== 'undefined') {
            if (i + index2 >= sent.length) return `${prefix}EOS`;
            word = columns[column].slice(i + index1, i + index2 + 1).join(' ');
        } else {
            word = sent[i + index1][column];
        }

        // apply template
        if (!func) {
            result = word;
        } else {
            result = this.apply_template(func, word);
            if (typeof result === 'boolean') {
                result = result ? 'True' : 'False'
            }
        }

        return `${prefix}${result}`;

    }

    word2features(sent, i, template) {
        let features = [];
        
        template.forEach((token_syntax) => {
            features.push(this.toFeatures(sent, i, token_syntax))
        });

        return features;
    }

}

module.exports = new WordFeatures();
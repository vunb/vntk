'use strict';
const _ = require('lodash');
const path = require('path');
const crfsuite = require('crfsuite');
const tokenizer = require('../tokenizer');
const chunking = require('../chunking');
const fe = require('../features');

const logger = require('../logger')('NER');

class NER {

  constructor(fn) {
    this.tagger = new crfsuite.Tagger();
    this.logger = logger;

    this.model_filename = fn || path.resolve(__dirname, './model.bin');
    if (this.tagger.open(this.model_filename)) {
      logger.info(`open ${this.model_filename} success!`);
    }

  }

  /**
   * Create new tagger from file model
   * @param {String} fn filename
   */
  newModel(fn) {
    return new NER(fn);
  }

  get template() {
    return [
      'T[-2].lower', 'T[-1].lower', 'T[0].lower', 'T[1].lower', 'T[2].lower',
      'T[0].istitle', 'T[-1].istitle', 'T[1].istitle', 'T[-2].istitle', 'T[2].istitle',
      //# word unigram and bigram
      'T[-2]', 'T[-1]', 'T[0]', 'T[1]', 'T[2]',
      'T[-2,-1]', 'T[-1,0]', 'T[0,1]', 'T[1,2]',
      //# pos unigram and bigram
      'T[-2][1]', 'T[-1][1]', 'T[0][1]', 'T[1][1]', 'T[2][1]',
      'T[-2,-1][1]', 'T[-1,0][1]', 'T[0,1][1]', 'T[1,2][1]',
      //# ner
      'T[-3][3]', 'T[-2][3]', 'T[-1][3]',
    ];
  }

  format(tokens) {
    var prev_prefix_label = ''
    var result = _.reduce(tokens, (out, tok) => {
      if (tok[3] === 'O') {
        if (prev_prefix_label !== '') {
          prev_prefix_label = '';
          return out + '] ' + tok[0] + ' ';
        } else {
          prev_prefix_label = '';
          return out + ' ' + tok[0] + ' ';
        }
      } else {
        var tmp = tok[3].split('-');
        if (tmp[0] === 'B') {
          // kiểm tra thẻ đằng trước là B thì cần đóng thẻ trước
          // và để mở thẻ hiện tại
          if (prev_prefix_label !== '') {
            prev_prefix_label = tmp[0];
            return out + `] [${tmp[1]} ${tok[0]}`;
          } else {
            prev_prefix_label = tmp[0];
            return out + `[${tmp[1]} ${tok[0]}`;
          }
        } else {
          prev_prefix_label = tmp[0];
          return out + ` ${tok[0]}`;
        }
      }
    }, ' ')
    if (prev_prefix_label !== '') result += ']';
    return result;
  }

  tag(text, isFormat) {
    let chunk_tags = chunking.tag(text);
    let tokens = chunk_tags.map((tags) => {
      return [tags[0], tags[1], tags[2], 'X']
    });

    let x = this.transform(tokens);
    let tags = this.tagger.tag(x);
    let result = chunk_tags.map((chunk_tags, index) => [chunk_tags[0], chunk_tags[1], chunk_tags[2], tags[index]]);

    return !isFormat ? result : this.format(result).trim();

  }

  transform(tokens) {
    let template = this.template;
    return tokens.map((token, i) => fe.word2features(tokens, i, template));
  }
}

module.exports = new NER();

'use strict';
const _ = require('lodash');
const path = require('path');
const crfsuite = require('crfsuite');
const tokenizer = require('../word_tokenizer');
const features = require('../features');

const logger = require('../logger')('POSTag');

class POSTag {

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
    return new POSTag(fn);
  }

  get template() {
    return [
      'T[-2].lower', 'T[-1].lower', 'T[0].lower', 'T[1].lower', 'T[2].lower',
      'T[0].istitle', 'T[-1].istitle', 'T[1].istitle',
      //# word unigram and bigram
      'T[-2]', 'T[-1]', 'T[0]', 'T[1]', 'T[2]',
      'T[-2,-1]', 'T[-1,0]', 'T[0,1]', 'T[1,2]',
      //# pos unigram and bigram
      'T[-3][1]', 'T[-2][1]', 'T[-1][1]',
      'T[-3,-2][1]', 'T[-2,-1][1]',
    ];
  }

  format(tokens) {
    return _.reduce(tokens, (out, tok) => out + `[${tok[1]} ${tok[0]}] `, '')
  }

  tag(text, isFormat) {
    let words = tokenizer.tag(text);
    let tokens = words.map((token) => {
      return [token, 'X']
    });

    let x = this.transform(tokens);
    let tags = this.tagger.tag(x);
    let result = words.map((word, index) => [word, tags[index]]);
    return !isFormat ? result : this.format(result).trimRight();
  }

  transform(tokens) {
    let template = this.template;
    return tokens.map((token, i) => features.word2features(tokens, i, template));
  }
}

module.exports = new POSTag();

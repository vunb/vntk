'use strict';
const path = require('path');
const crfsuite = require('crfsuite');
const tokenizer = require('../tokenizer');
const fe = require('../features');

const logger = require('../logger')('WordTokenizer');

class WordTokenizer {

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
    return new WordTokenizer(fn);
  }

  get template() {
    return [
      'T[-2].lower', 'T[-1].lower', 'T[0].lower', 'T[1].lower', 'T[2].lower',
      'T[-1].isdigit', 'T[0].isdigit', 'T[1].isdigit',
      'T[-1].istitle', 'T[0].istitle', 'T[1].istitle', 'T[0,1].istitle', 'T[0,2].istitle',
      'T[-2].is_in_dict', 'T[-1].is_in_dict', 'T[0].is_in_dict', 'T[1].is_in_dict', 'T[2].is_in_dict',
      'T[-2,-1].is_in_dict', 'T[-1,0].is_in_dict', 'T[0,1].is_in_dict', 'T[1,2].is_in_dict',
      'T[-2,0].is_in_dict', 'T[-1,1].is_in_dict', 'T[0,2].is_in_dict',

      //# word unigram and bigram and trigram
      'T[-2]', 'T[-1]', 'T[0]', 'T[1]', 'T[2]',
      'T[-2,-1]', 'T[-1,0]', 'T[0,1]', 'T[1,2]',
      'T[-2,0]', 'T[-1,1]', 'T[0,2]',
      //# BI tag
      'T[-2][1]', 'T[-1][1]'
    ];
  }

  tag(text, format) {
    let input = tokenizer.tokenize(text);
    let tokens = input.map((token) => {
      return [token, 'X']
    });

    let x = this.transform(tokens)
    let tags = this.tagger.tag(x)
    let words = tags.reduce((output, tag, index) => {
      let token = input[index];
      if (tag === 'IW') {
        output[output.length - 1] = output[output.length - 1] + ' ' + token;
      } else {
        output.push(token);
      }
      return output;
    }, []);
    return !format ? words : words.map(w => w.replace(' ', '_')).join(' ');
  }

  transform(tokens) {
    let template = this.template;
    return tokens.map((token, i) => {
      let features = fe.word2features(tokens, i, template)
      // convert to object
      features = features.reduce((obj, item) => {
        let k = item.split('=');
        obj[k[0]] = k[1];
        return obj;
      }, {});
      // remove some features
      for (let i = -2; i < 3; i++) {
        let t1 = `T[${i}].is_in_dict`;
        let t2 = `T[${i}]`;
        let t3 = `T[${i}].lower`;
        if (features[t1] == 'True') {
          features[t2] = '-';
          features[t3] = '-';
        }
      }

      for (let i = -2; i < 2; i++) {
        let t1 = `T[${i},${i + 1}].is_in_dict`;
        let t2 = `T[${i},${i + 1}]`;
        if (features[t1] == 'True') {
          features[t2] = '-';
        }
      }

      // convert features to array
      return Object.keys(features).map((key) => `${key}=${features[key]}`);
    })
  }
}

module.exports = new WordTokenizer();

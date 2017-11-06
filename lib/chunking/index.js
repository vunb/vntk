'use strict';
const path = require('path');
const crfsuite = require('crfsuite');
const tokenizer = require('../tokenizer');
const pos_tag = require('../pos_tag');
const fe = require('../features');

const logger = require('../logger')('Chucking');

class Chucking {

    constructor() {
        this.tagger = crfsuite.Tagger();
        this.logger = logger;

        this.model_filename = path.resolve(__dirname, './model.bin');
        if (this.tagger.open(this.model_filename)) {
            logger.info(`open ${this.model_filename} success!`);
        }

    }

    get template() {
        return [
            "T[-2].lower", "T[-1].lower", "T[0].lower", "T[1].lower", "T[2].lower",
            "T[0].istitle", "T[-1].istitle", "T[1].istitle",
            //# word unigram and bigram
            "T[-2]", "T[-1]", "T[0]", "T[1]", "T[2]",
            "T[-2,-1]", "T[-1,0]", "T[0,1]", "T[1,2]",
            //# pos unigram and bigram
            "T[-2][1]", "T[-1][1]", "T[0][1]", "T[1][1]", "T[2][1]",
            "T[-2,-1][1]", "T[-1,0][1]", "T[0,1][1]", "T[1,2][1]",
            //# chunk
            "T[-3][2]", "T[-2][2]", "T[-1][2]",
        ];
    }

    tag(text) {
        let pos_tags = pos_tag.tag(text);
        let tokens = pos_tags.map((tags) => {
            return [tags[0], tags[1], 'X']
        });

        let x = this.transform(tokens);
        let tags = this.tagger.tag(x);
        return pos_tags.map((pos_tags, index) => [pos_tags[0], pos_tags[1], tags[index]]);
    }

    transform(tokens) {
        let template = this.template;
        return tokens.map((token, i) => fe.word2features(tokens, i, template));
    }
}

module.exports = new Chucking();
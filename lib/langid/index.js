'use strict';
const path = require('path');
const FastTextClassifier = require('../classifiers/fasttext');
const logger = require('../logger')('Langid');

class Langid {

    constructor() {

        this.model_filename = path.resolve(__dirname, './lid.176.ftz');
        this.classifier = new FastTextClassifier(this.model_filename);
        logger.info(`load model ${this.model_filename} success!`);
    }

    get langids() {
        let _langids = 'af als am an ar arz as ast av az azb ba bar bcl be bg bh bn bo bpy br bs bxr ca cbk ce ceb ckb co cs cv cy da de diq dsb dty dv el eml en eo es et eu fa fi fr frr fy ga gd gl gn gom gu gv he hi hif hr hsb ht hu hy ia id ie ilo io is it ja jbo jv ka kk km kn ko krc ku kv kw ky la lb lez li lmo lo lrc lt lv mai mg mhr min mk ml mn mr mrj ms mt mwl my myv mzn nah nap nds ne new nl nn no oc or os pa pam pfl pl pms pnb ps pt qu rm ro ru rue sa sah sc scn sco sd sh si sk sl so sq sr su sv sw ta te tg th tk tl tr tt tyv ug uk ur uz vec vep vi vls vo wa war wuu xal xmf yi yo yue zh';
        return _langids.split(' ');
    }

    detect(input) {
        return this.getLanguages(input, 1).then((res) => {
            if (res && res.length > 0) {
                return res[0].label;
            } else {
                return null;
            }
        })
    }

    getLanguages(input, num, callback) {
        return new Promise((resolve, reject) => {
            num = num || 1;
            callback = callback || (() => 1);
            this.classifier.predict(input, num, (err, res) => {
                let lids = res.map((lid) => {
                    lid.label = lid.label.replace(/^__label__/, '');
                    lid.confidence = lid.value;
                    return lid;
                });

                callback(err, lids);
                if (!err) resolve(lids)
                else reject(err)
            });
        })
    }

}

module.exports = new Langid();
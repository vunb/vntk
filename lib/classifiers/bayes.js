'use strict';
const Classifier = require('./classifier');

class BayesClassifier extends Classifier {
    constructor(smoothing) {
        super();

        this.classFeatures = this.empty;
        this.classTotals = this.empty;
        this.totalExamples = 1;
        this.smoothing = smoothing || 1.0;

    }

    get empty() {
        return Object.create(null);
    }

    addExample(observation, label) {
        if (!this.classFeatures[label]) {
            this.classFeatures[label] = this.empty;
            this.classTotals[label] = 1;
        }

        if (observation instanceof Array) {
            this.totalExamples++;
            this.classTotals[label]++;

            observation.forEach((o, i) => {
                if (o) {
                    if (this.classFeatures[label][i]) {
                        this.classFeatures[label][i]++;
                    } else {
                        // give an extra for smoothing
                        this.classFeatures[label][i] = 1 + this.smoothing;
                    }
                }
            })
        } else {
            // sparse observation
            for (let value of observation) {
                if (this.classFeatures[label][value]) {
                    this.classFeatures[label][value]++;
                } else {
                    // give an extra for smoothing
                    this.classFeatures[label][value] = 1 + this.smoothing;
                }
            }
        }
    }

    probabilityOfClass(observation, label) {
        var prob = 0;

        if (observation instanceof Array) {
            var i = observation.length;

            while (i--) {
                if (observation[i]) {
                    var count = this.classFeatures[label][i] || this.smoothing;
                    // numbers are tiny, add logs rather than take product
                    prob += Math.log(count / this.classTotals[label]);
                }
            }
        } else {
            // sparse observation
            for (var key in observation) {
                var count = this.classFeatures[label][observation[key]] || this.smoothing;
                // numbers are tiny, add logs rather than take product
                prob += Math.log(count / this.classTotals[label]);
            }
        }

        // p(C) * unlogging the above calculation P(X|C)
        prob = (this.classTotals[label] / this.totalExamples) * Math.exp(prob);

        return prob;
    }

    doTrain() {
        // do nothing.
    }

    getClassifications(observation) {
        var labels = [];

        for (var className in this.classFeatures) {
            labels.push({
                label: className,
                value: this.probabilityOfClass(observation, className)
            });
        }

        return labels.sort(function (x, y) {
            return y.value - x.value;
        });
    }

}

module.exports = BayesClassifier;
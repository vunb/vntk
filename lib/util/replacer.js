/**
 * Generate a replacing function given a table of patterns. Inspired by:
 * http://code.google.com/p/jslibs/wiki/JavascriptTips#String_converter
 * The order of elements is significant. Longer elements should be listed first.
 * @see Speed test http://jsperf.com/build-a-regexp-table
 *
 * @param {Object.<string, string>} translationTable The translation table of key value.
 * @return {function(string): string} A translating function.
 */
var replacer = function (translationTable) {
    // An array of translationTable keys.
    var pattern = [];

    for (var key in translationTable) {
        // Escaping regexp special chars.
        // @see Speed test for type casting to string http://jsperf.com/string-type-casting/2
        // @see http://closure-library.googlecode.com/svn/docs/closure_goog_string_string.js.source.html#line956
        key = ('' + key).replace(/([-()\[\]{}+?*.$\^|,:#<!\\\/])/g, '\\$1').
        replace(/\x08/g, '\\x08');

        pattern.push(key);
    }


    /**
     * @param {string} str Input string.
     * @return {string} The string replaced.
     */
    return function (str) {
        // The regular expression doing the replacement job.
        var regExp = new RegExp(pattern.join('|'), 'g');
        return str.replace(regExp, function (str) {
            return translationTable[str];
        });
    };
}

module.exports = replacer;
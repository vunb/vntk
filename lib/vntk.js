/**
 * Sets individual option.
 *
 * @param       {Object} option Option name
 * @param       {Object} value  Option value
 * @returns     {Boolean} true on success, false on failure
 */
exports.setOption = function (option, value) {
    console.log("Option: ", option, value);
}

/**
 * Word Segmentation
 * 
 * @ex: ws.segment("Chào mừng bạn đến với đất nước Việt Nam!!")
 * @out: Chào mừng bạn đến với đất_nước Việt_Nam
 */
exports.ws = function () {
    return require("./ws");
}

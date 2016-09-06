#!/usr/bin/env node

/**
 * Module dependencies
 */

var _ = require("lodash")
    , program = require("commander")
    , package = require("../package.json")
    ;

var NOOP = function () { };
var help = function () {
    // Allow us to display help(), but omit the wildcard (*) command.
    program.commands = _.reject(program.commands, {
        _name: '*'
    });
    program.help();
}

/**
 * Normalize version argument, i.e.
 * 
 * $ vntk -v
 * $ vntk -V
 * $ vntk --version
 * $ vntk version
 */
program.version(package.version, "-v, --version");

// make '-v' option case-insensitive
process.argv = _.map(process.argv, function (arg) {
    return (arg === '-V') ? '-v' : arg;
});

// $ vntk version (--version synonym)
program
    .command("version")
    .description("")
    .action(function () {
        program.emit("version");
    });

program
    .command("segment [text...]")
    .alias("ws")
    .description("word segmentation")
    .option("-f, --file", "input is files")
    .action(function (text, options) {
        console.log('text %s', text);
        console.log('options %s', options.file);
        console.log("typeof text: ", typeof text);
        var input = text + "";
        if (!input) {
            console.log("input is required");
            this.emit("--help");
            return;
        }

    }).on("--help", function () {
        console.log('  Examples:');
        console.log();
        console.log('    $ vntk segment "Chào mừng bạn đến với Việt Nam"');
        console.log('    $ vntk segment -f test.txt another.txt');
        console.log();
    });

program
    .command("*")
    .action(help);

/**
 * $ vntk
 */
program.parse(process.argv);
var NO_COMMAND_SPECIFIED = program.args.length === 0;
if (NO_COMMAND_SPECIFIED) {
    help();
}
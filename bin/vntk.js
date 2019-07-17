#!/usr/bin/env node

/**
 * Module dependencies
 */

var _ = require("lodash")
    , async = require("async")
    , program = require("commander")
    , vntk = require("../lib/vntk")
    , package = require("../package.json")
    ;

/**
 * Warning text
 */
console.log(`
   ╭────────────────────────────────────────────────────────────────╮
   │                                                                │
   │       Vntk has a new separator repository and package.         │
   │   Repository: https://github.com/vntk/vntk-cli:                │
   │        Please run: npm install -g @vntk/cli to update!         │
   │                                                                │
   ╰────────────────────────────────────────────────────────────────╯
`)

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
        console.log('input: %s', text);
        console.log('isFile: %s', !!options.file);
        // console.log("typeof text: ", typeof text);

        // check input
        var input = text + "";
        if (!input) {
            console.log("input is required");
            this.emit("--help");
            return;
        }
        
        var ws = vntk.word_sent;

        if (!options.file) {
            text.forEach(function (e) {
                console.log(e);
                var seg = ws.tag(e, 'text');
                console.log("Output:", seg);
            }, this);
        } else {
            text.forEach(function (e) {
                var seg = ws.tag(e);
                console.log(seg);
            }, this);
        }

    }).on("--help", function () {
        console.log('  Examples:');
        console.log();
        console.log('    $ vntk segment "Chào mừng bạn đến với Việt Nam"');
        console.log('    $ vntk segment test.txt another.txt -f');
        console.log();
    });

program
    .command("clean [text...]")
    .alias("cl")
    .description("clean text from html content")
    .option("-f, --file", "input is files")
    .action(function (text, options) {
        console.log('input: %s', text);
        console.log('isFile: %s', !!options.file);
        // console.log("typeof text: ", typeof text);

        // check input
        var input = text + "";
        if (!input) {
            console.log("input is required");
            this.emit("--help");
            return;
        }

        if (!options.file) {
            text.forEach(function (e) {
                console.log(e);
                var cleaned = vntk.util.clean_html(e);
                console.log("Output:", cleaned);
            }, this);
        } else {
            var fs = require("fs");
            async.eachSeries(text, function process(fileName, callback) {
                fs.readFile(fileName, function read(err, data) {
                    var outputFileName = fileName + ".cleaned";
                    var cleaned = vntk.util.clean_html(data.toString());
                    fs.writeFile(outputFileName, cleaned, function (err) {
                        if (!err) {
                            console.log("Done: ", outputFileName);
                            callback(null);
                        } else {
                            console.error("Clean file error: " + fileName, err);
                            callback(err);
                        }
                    });
                });
            }, function done(err) {
                if (!err) {
                    console.log("Clean text is done without error!");
                } else {
                    console.error("Clean text is error", err);
                }
            });
        }

    }).on("--help", function () {
        console.log('  Examples:');
        console.log();
        console.log('    $ vntk clean "<span style="color: #4b67a1;">This is a demo</span>"');
        console.log('    $ vntk clean test.txt another.txt -f');
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
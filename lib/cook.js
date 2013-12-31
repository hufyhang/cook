#!/usr/local/bin/node

var CONFIG = {
    name: "Cook",
    author: "Feifei Hang",
    version: "0.0.1",
    description: "A Node.JS executable application assists creating Web development project.",
    package_file: "http://feifeihang.info/cook/template/package.php?name=",
    gruntfile_file: "http://feifeihang.info/cook/template/Gruntfile.js",
    currentFetched: 0,
    doneFetched: 0
};

var HTML = {
    html_file: "http://feifeihang.info/cook/template/html5/index.html",
    error_file: "http://feifeihang.info/cook/template/html5/404.html",
    humans_file: "http://feifeihang.info/cook/template/html5/humans.txt",
    robots_file: "http://feifeihang.info/cook/template/html5/robots.txt",
    main_css: "http://feifeihang.info/cook/template/html5/css/main.css",
    normalize_css: "http://feifeihang.info/cook/template/html5/css/normalize.css",
    plugins_js: "http://feifeihang.info/cook/template/html5/js/plugins.js",
    main_min_js: "http://feifeihang.info/cook/template/html5/js/main.min.js",
    main_js: "http://feifeihang.info/cook/template/html5/js/dev/main.js",
    jquery_js: "http://feifeihang.info/cook/template/html5/js/vendor/jquery.min.js",
    modernizr_js: "http://feifeihang.info/cook/template/html5/js/vendor/modernizr.min.js"
};

var QUNIT = {
    html: "http://feifeihang.info/cook/template/html5/_qunit.html",
    css: "http://feifeihang.info/cook/template/html5/css/qunit.css",
    js: "http://feifeihang.info/cook/template/html5/js/qunit/qunit.js",
    test: "http://feifeihang.info/cook/template/html5/js/qunit/test.js"
};

var settings = {};

var colors = require('colors'),
    mkdirp = require('mkdirp'),
    request = require('request')
    fs = require('fs'),
    npm = require('npm'),
    prompt = require('prompt');

prompt.message = prompt.delimiter = '';


var createDirectory = function(path) {
    mkdirp(path, function (err) {
        if(err) {
            console.error(err);
        }
        else {
            console.log("Directory " + path.underline.green + " is created.");
        }
    });
};

var fetchFiles = function(_args) {
    request(_args.url, function(err, response, body) {
            if(!err && response.statusCode === 200) {
                fs.writeFile(_args.filename, body, function(e) {
                    if(e) {
                        console.error(e);
                    }
                    else {
                        console.log("Fetched %s from %s", _args.filename.green, _args.url.underline.cyan);
                        ++CONFIG.currentFetched;
                        if(_args.callback && CONFIG.currentFetched === (CONFIG.doneFetched + 2)) {
                            _args.callback(_args.project);
                        }
                    }
                })
            }
            else {
                console.error(err);
            }
    });
};

var showSettingsDialog = function(project) {
    var key;
    for(key in HTML) {
        ++CONFIG.doneFetched;
    }

    prompt.get({
       properties : {
           qunit: {
               description: "Do you want to grab QUnit for Javascript Unit test? [Y/n]",
               pattern: /^[YyNn]$/,
                message: "Input must be either Y/y or N/n."
           }
       } 
    }, function(err, results) {
        if(err) {
            console.error(err);
        }
        else {
            settings.qunit = results.qunit;
            if(settings.qunit === 'Y' || settings.qunit === 'y') {
                var key;
                for(key in QUNIT) {
                    ++CONFIG.doneFetched;
                }
            }
            fetchProjectStructure(project);
        }
    });
};


var gruntInstall = function(project) {
    prompt.get({
       properties : {
           answer: {
               description: "Do you want to grab Grunt dependencies now? [Y/n]",
               pattern: /^[YyNn]$/,
                message: "Input must be either Y/y or N/n."
           }
       } 
    }, function(err, results) {
        if(err) {
            console.error(err);
        }
        else {
            if(results.answer === 'Y' || results.answer === 'y') {
                // switch to project folder
                process.chdir(project);

                // install npm dependencies for Grunt
                npm.load(npm.config, function(err) {
                    npm.commands.install([], function(er, data) {
                        if(er) {
                            console.error(er);
                        }
                    });
                    npm.on('log', function(message) {
                        console.log(message);
                    });
                });
            }
        }
    });
};


var fetchProjectStructure = function(project) {
    createDirectory(project);
    createDirectory(project + '/js');
    createDirectory(project + '/js/dev');
    createDirectory(project + '/js/vendor');
    createDirectory(project + '/css');
    createDirectory(project + '/img');
    fetchFiles({project: project, url: HTML.html_file, filename: project + '/index.html', callback: gruntInstall});
    fetchFiles({project: project, url: HTML.error_file, filename: project + '/404.html', callback: gruntInstall});
    fetchFiles({project: project, url: HTML.humans_file, filename: project + '/humans.txt', callback: gruntInstall});
    fetchFiles({project: project, url: HTML.robots_file, filename: project + '/robots.txt', callback: gruntInstall});
    fetchFiles({project: project, url: HTML.main_css, filename: project + '/css/main.css', callback: gruntInstall});
    fetchFiles({project: project, url: HTML.normalize_css, filename: project + '/css/normalize.css', callback: gruntInstall});
    fetchFiles({project: project, url: HTML.plugins_js, filename: project + '/js/plugins.js', callback: gruntInstall});
    fetchFiles({project: project, url: HTML.main_min_js, filename: project + '/js/main.min.js', callback: gruntInstall});
    fetchFiles({project: project, url: HTML.main_js, filename: project + '/js/dev/main.js', callback: gruntInstall});
    fetchFiles({project: project, url: HTML.jquery_js, filename: project + '/js/vendor/jquery.js', callback: gruntInstall});
    fetchFiles({project: project, url: HTML.modernizr_js, filename: project + '/js/vendor/modernizr.js', callback: gruntInstall});

    fetchFiles({project: project, url: CONFIG.package_file + project, filename: project + '/package.json', callback: gruntInstall});
    fetchFiles({project: project, url: CONFIG.gruntfile_file, filename: project + '/Gruntfile.js', callback: gruntInstall});

    // QUnit
    console.log("Now start to grab & deploy QUnit...".green);
    if(settings.qunit === 'Y' || settings.qunit === 'y') {
        createDirectory(project + '/js/qunit');
        fetchFiles({project: project, url: QUNIT.html, filename: project + '/_qunit.html', callback: gruntInstall});
        fetchFiles({project: project, url: QUNIT.css, filename: project + '/css/qunit.css', callback: gruntInstall});
        fetchFiles({project: project, url: QUNIT.js, filename: project + '/js/qunit/qunit.js', callback: gruntInstall});
        fetchFiles({project: project, url: QUNIT.test, filename: project + '/js/qunit/test.js', callback: gruntInstall});
    }
};

exports.app = function(args) {
    // Show Cook information
    if(args.v || args.ver || args.version) {
        console.log("%s -- %s\nAuthor: %s\n%s", CONFIG.name, 
                CONFIG.version.underline.green, CONFIG.author.cyan,
                CONFIG.description);
        return;
    }

    // Create a new project
    if(args.c || args.create) {
        var project = args.c || args.create;
        showSettingsDialog(project);
        return;
    }
}


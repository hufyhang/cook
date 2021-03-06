#!/usr/local/bin/node

var CONFIG = {
    name: "Cook",
    author: "Feifei Hang",
    version: "0.1.2",
    description: "A Node.JS executable application assists creating Web development project.",
    currentFetched: 0,
    doneFetched: 0
};

var GRUNT = {
    package_file: "http://feifeihang.info/cook/template/package.php?name=",
    gruntfile_file: "http://feifeihang.info/cook/template/Gruntfile.js"
};

var GRUNT_REQUIREJS = {
    package_file: "http://feifeihang.info/cook/template/package_requirejs.php?name=",
    gruntfile_file: "http://feifeihang.info/cook/template/Gruntfile_requirejs.js"
};

var REQUIREJS = {
    style: "http://feifeihang.info/cook/template/html5/dist/css/style.min.css",
    js: "http://feifeihang.info/cook/template/html5/js/vendor/require.min.js",
    config: "http://feifeihang.info/cook/template/config.js",
    build: "http://feifeihang.info/cook/template/build.js",
    built_main: "http://feifeihang.info/cook/template/html5/js/dev/main.js"
};

var RIBS = {
    js: "http://feifeihang.info/ribs/ribs.min.js",
    routie: "http://feifeihang.info/ribs/routie.min.js"
};

var HTML = {
    html_file: "http://feifeihang.info/cook/template/html5/index.php?",
    htaccess: "http://feifeihang.info/cook/template/html5/_htaccess",
    error_file: "http://feifeihang.info/cook/template/html5/404.html",
    humans_file: "http://feifeihang.info/cook/template/html5/humans.txt",
    robots_file: "http://feifeihang.info/cook/template/html5/robots.txt",
    main_css: "http://feifeihang.info/cook/template/html5/css/main.css",
    normalize_css: "http://feifeihang.info/cook/template/html5/css/normalize.css",
    plugins_js: "http://feifeihang.info/cook/template/html5/js/plugins.js",
    main_min_js: "http://feifeihang.info/cook/template/html5/js/main.min.js",
    main_js: "http://feifeihang.info/cook/template/html5/js/dev/main.js",
    jquery_js: "http://feifeihang.info/cook/template/html5/js/vendor/jquery.min.js",
    modernizr_js: "http://feifeihang.info/cook/template/html5/js/vendor/modernizr.min.js",
    sass_scss: "http://feifeihang.info/cook/template/html5/js/dev/main.js"
};

var BOOTSTRAP = {
    css: "http://feifeihang.info/cook/template/html5/css/bootstrap.min.css",
    theme_css: "http://feifeihang.info/cook/template/html5/css/bootstrap-theme.min.css",
    js: "http://feifeihang.info/cook/template/html5/js/vendor/bootstrap.min.js"
};

var QUNIT = {
    html: "http://feifeihang.info/cook/template/html5/_qunit.html",
    css: "http://feifeihang.info/cook/template/html5/css/qunit.css",
    js: "http://feifeihang.info/cook/template/html5/js/qunit/qunit.js",
    test: "http://feifeihang.info/cook/template/html5/js/qunit/test.js"
};

var settings = {};
var grunt_tar = GRUNT;

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

var fetchFile = function(_args) {
    request(_args.url, function(err, response, body) {
            if(!err && response.statusCode === 200) {
                fs.writeFile(_args.filename, body, function(e) {
                    if(e) {
                        console.error(e);
                    }
                    else {
                        console.log("Fetched %s from %s", _args.filename.green, _args.url.underline.cyan);
                        ++CONFIG.currentFetched;
                        if(_args.callback && CONFIG.currentFetched === CONFIG.doneFetched) {
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
           requirejs: {
               description: "".black + "Do you want to include " + "RequireJS".green + " for AMD module loading? [Y/n]",
               pattern: /^[YyNn]$/,
                message: "".black + "Input must be either Y/y or N/n."
           },
           bootstrap: {
               description: "".black + "Do you want to include " + "Twitter Bootstrap".green + " style? [Y/n]",
               pattern: /^[YyNn]$/,
                message: "".black + "Input must be either Y/y or N/n."
           },
           ribs: {
               description: "".black + "Do you want to include " + "Ribs.js".green + " as the MVC framework? [Y/n]",
               pattern: /^[YyNn]$/,
                message: "".black + "Input must be either Y/y or N/n."
           },
           qunit: {
               description: "".black + "Do you want to include " + "QUnit".green + " for Javascript Unit test? [Y/n]",
               pattern: /^[YyNn]$/,
                message: "".black + "Input must be either Y/y or N/n."
           },
           grunt: {
               description: "".black + "Do you want to include " + "Grunt".green + " with default watch settings? [Y/n]",
               pattern: /^[YyNn]$/,
                message: "".black + "Input must be either Y/y or N/n."
           }
       }
    }, function(err, results) {
        if(err) {
            console.error(err);
        }
        else {
            settings.requirejs = results.requirejs;
            if(settings.requirejs === 'Y' || settings.requirejs === 'y') {
                var key;
                for(key in REQUIREJS) {
                    ++CONFIG.doneFetched;
                }
            }

            settings.bootstrap = results.bootstrap;
            if(settings.bootstrap === 'Y' || settings.bootstrap === 'y') {
                var key;
                for(key in BOOTSTRAP) {
                    ++CONFIG.doneFetched;
                }
            }

            settings.ribs = results.ribs;
            if(settings.ribs === 'Y' || settings.ribs === 'y') {
                var key;
                for(key in RIBS) {
                    ++CONFIG.doneFetched;
                }
            }

            settings.qunit = results.qunit;
            if(settings.qunit === 'Y' || settings.qunit === 'y') {
                var key;
                for(key in QUNIT) {
                    ++CONFIG.doneFetched;
                }
            }

            settings.grunt = results.grunt;
            if(settings.grunt === 'Y' || settings.grunt === 'y') {
                var key;
                if (settings.requirejs === 'Y' || settings.requirejs === 'y') {
                    grunt_tar = GRUNT_REQUIREJS;
                }
                for(key in grunt_tar) {
                    ++CONFIG.doneFetched;
                }
            }
            fetchProjectStructure(project);
        }
    });
};


var gruntInstall = function(project) {
    if(settings.grunt === 'N' || settings.grunt === 'n') {
        return;
    }

    prompt.get({
       properties : {
           answer: {
               description: "".black + "Do you want to grab Grunt dependencies now? [Y/n]",
               pattern: /^[YyNn]$/,
                message: "".black + "Input must be either Y/y or N/n."
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
    createDirectory(project + '/css');
    createDirectory(project + '/sass');
    createDirectory(project + '/img');
    createDirectory(project + '/vendor');
    createDirectory(project + '/vendor/js');
    createDirectory(project + '/vendor/css');

    fetchFile({project: project,
            url: HTML.html_file + 'bootstrap=' + settings.bootstrap + '&ribs=' + settings.ribs + '&requirejs=' + settings.requirejs,
            filename: project + '/index.html', callback: gruntInstall});

    fetchFile({project: project, url: HTML.error_file, filename: project + '/404.html', callback: gruntInstall});
    fetchFile({project: project, url: HTML.htaccess, filename: project + '/.htaccess', callback: gruntInstall});
    fetchFile({project: project, url: HTML.humans_file, filename: project + '/humans.txt', callback: gruntInstall});
    fetchFile({project: project, url: HTML.robots_file, filename: project + '/robots.txt', callback: gruntInstall});
    fetchFile({project: project, url: HTML.main_css, filename: project + '/css/main.css', callback: gruntInstall});
    fetchFile({project: project, url: HTML.sass_scss, filename: project + '/sass/master.scss', callback: gruntInstall});
    fetchFile({project: project, url: HTML.normalize_css, filename: project + '/vendor/css/normalize.css', callback: gruntInstall});
    fetchFile({project: project, url: HTML.main_min_js, filename: project + '/js/main.min.js', callback: gruntInstall});
    fetchFile({project: project, url: HTML.main_js, filename: project + '/js/dev/main.js', callback: gruntInstall});
    fetchFile({project: project, url: HTML.jquery_js, filename: project + '/vendor/js/jquery.js', callback: gruntInstall});
    fetchFile({project: project, url: HTML.modernizr_js, filename: project + '/vendor/js/modernizr.js', callback: gruntInstall});
    fetchFile({project: project, url: HTML.plugins_js, filename: project + '/vendor/js/plugins.js', callback: gruntInstall});


    // Bootstrap
    if(settings.bootstrap === 'Y' || settings.bootstrap === 'y') {
        fetchFile({project: project, url: BOOTSTRAP.css, filename: project + '/vendor/css/bootstrap.min.css', callback: gruntInstall});
        fetchFile({project: project, url: BOOTSTRAP.theme_css, filename: project + '/vendor/css/bootstrap-theme.min.css', callback: gruntInstall});
        fetchFile({project: project, url: BOOTSTRAP.js, filename: project + '/vendor/js/bootstrap.min.js', callback: gruntInstall});
    }

    // RequireJS
    if(settings.requirejs === 'Y' || settings.requirejs === 'y') {
        createDirectory(project + '/js/built');
        createDirectory(project + '/dist');
        createDirectory(project + '/dist/css');
        createDirectory(project + '/dist/js');

        fetchFile({project: project, url: REQUIREJS.js, filename: project + '/vendor/js/require.min.js', callback: gruntInstall});
        fetchFile({project: project, url: REQUIREJS.style, filename: project + '/dist/css/style.min.css', callback: gruntInstall});
        fetchFile({project: project, url: REQUIREJS.config, filename: project + '/config.js', callback: gruntInstall});
        fetchFile({project: project, url: REQUIREJS.build, filename: project + '/build.js', callback: gruntInstall});
        fetchFile({project: project, url: REQUIREJS.built_main, filename: project + '/js/built/main.js', callback: gruntInstall});
    }

    // Ribs
    if(settings.ribs === 'Y' || settings.ribs === 'y') {
        fetchFile({project: project, url: RIBS.js, filename: project + '/vendor/js/ribs.min.js', callback: gruntInstall});
        fetchFile({project: project, url: RIBS.routie, filename: project + '/vendor/js/routie.min.js', callback: gruntInstall});
    }

    // QUnit
    if(settings.qunit === 'Y' || settings.qunit === 'y') {
        createDirectory(project + '/js/qunit');
        createDirectory(project + '/vendor/js/qunit');
        fetchFile({project: project, url: QUNIT.html, filename: project + '/_qunit.html', callback: gruntInstall});
        fetchFile({project: project, url: QUNIT.css, filename: project + '/vendor/css/qunit.css', callback: gruntInstall});
        fetchFile({project: project, url: QUNIT.js, filename: project + '/vendor/js/qunit/qunit.js', callback: gruntInstall});
        fetchFile({project: project, url: QUNIT.test, filename: project + '/js/qunit/test.js', callback: gruntInstall});
    }

    // Grunt
    if(settings.grunt === 'Y' || settings.grunt === 'y') {
        fetchFile({project: project, url: grunt_tar.package_file + project, filename: project + '/package.json', callback: gruntInstall});
        fetchFile({project: project, url: grunt_tar.gruntfile_file, filename: project + '/Gruntfile.js', callback: gruntInstall});
    }
};

exports.app = function(args) {
    // Show Cook information
    if(args.v || args.ver || args.version) {

        console.log("._.  __      __       .__                                ._. ".blue);
        console.log("| | /  \\    /  \\ ____ |  |   ____  ____   _____   ____   | | ".blue);
        console.log("|_| \\   \\/\\/   // __ \\|  | _/ ___\\/  _ \\ /     \\_/ __ \\  |_| ".blue);
        console.log("|-|  \\        /\\  ___/|  |_\\  \\__(  <_> )  Y Y  \\  ___/  |-| ".blue);
        console.log("| |   \\__/\\  /  \\___  >____/\\___  >____/|__|_|  /\\___  > | | ".blue);
        console.log("|_|        \\/       \\/          \\/            \\/     \\/  |_| ".blue);
        console.log("._.                      __                              ._. ".blue);
        console.log("| |                    _/  |_  ____                      | | ".blue);
        console.log("|_|                    \\   __\\/  _ \\                     |_| ".blue);
        console.log("|-|                     |  | (  <_> )                    |-| ".blue);
        console.log("| |                     |__|  \\____/                     | | ".blue);
        console.log("|_|                                                      |_| ".blue);
        console.log("._.           _________                __                ._. ".blue);
        console.log("| |           \\_   ___ \\  ____   ____ |  | __            | | ".blue);
        console.log("|_|           /    \\  \\/ /  _ \\ /  _ \\|  |/ /            |_| ".blue);
        console.log("|-|           \\     \\___(  <_> |  <_> )    <             |-| ".blue);
        console.log("| |  ______    \\______  /\\____/ \\____/|__|_ \\     ______ | | ".blue);
        console.log("|_| /_____/           \\/                   \\/    /_____/ |_| ".blue);

        console.log("");

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


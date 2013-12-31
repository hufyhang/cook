#!/usr/local/bin/node

var CONFIG = {
    name: "Cook",
    author: "Feifei Hang",
    version: "0.0.1",
    description: "A Node.JS executable application assists creating Web development project.",
    package_file: "http://feifeihang.info/cook/template/package.php?name=",
    gruntfile_file: "http://feifeihang.info/cook/template/Gruntfile.js",
    currentFetched: 0,
    doneFetched: 2
};

var colors = require('colors'),
    mkdirp = require('mkdirp'),
    request = require('request')
    fs = require('fs'),
    npm = require('npm'),
    prompt = require('prompt');


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
                        console.log("%s fetched from %s", _args.filename.green, _args.url.underline.cyan);
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

var gruntInstall = function(project) {
    prompt.message = prompt.delimiter = '';
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
        createDirectory(project);
        createDirectory(project + '/js');
        createDirectory(project + '/js/dev');
        createDirectory(project + '/css');
        createDirectory(project + '/img');
        fetchFiles({project: project, url: CONFIG.package_file + project, filename: project + '/package.json', callback: gruntInstall});
        fetchFiles({project: project, url: CONFIG.gruntfile_file, filename: project + '/Gruntfile.js', callback: gruntInstall});
        return;
    }
}


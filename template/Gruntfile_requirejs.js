module.exports = function(grunt) {
    grunt.registerTask('watch', ['watch']);
    grunt.initConfig({
        requirejs: {
            compile: {
                options: {
                    baseUrl: '.',
                    appDir: 'js/dev/',
                    dir: 'js/built/',
                    paths: {
                        // jquery: 'jquery.min' //Use this to minifiy jquery into your main
                        //jquery: 'empty:' //Use this to continue using CDN loading
                    },
                    mainConfigFile: 'config.js',
                    removeCombined: false
                }
            }
        },
        watch: {
            js: {
                files: ['js/dev/*.js'],
                tasks: ['requirejs'],
                options: {
                    livereload: true
                }
            },
            others: {
                files: ['*.html', 'css/*.css'],
                options: {
                    livereload: true
                }
            }

        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-watch');
};


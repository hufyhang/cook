module.exports = function(grunt) {
    grunt.registerTask('watch', ['watch']);
    grunt.initConfig({
        sass:  {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.',
                    src: ['sass/*.scss'],
                    dest: 'css/',
                    ext: '.css'
                }]
            }
        },
        concat: {
            css: {
                src: ['css/*.css', 'css/sass/*.css'],
                dest: 'dist/css/combined.css'
            }
        },
        cssmin: {
            css: {
                src: 'dist/css/combined.css',
                dest: 'dist/css/style.min.css'
            }
        },
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
            css: {
                files: ['css/*.css', 'css/sass/*.css'],
                tasks: ['concat:css', 'cssmin'],
                options: {
                    livereload: true
                }
            },
            sass: {
                files: ['sass/*.scss'],
                tasks: ['sass'],
                options: {
                    livereload: true
                }
            },
            others: {
                files: ['*.html', 'vendor/js/*.js', 'vendor/css/*.css'],
                options: {
                    livereload: true
                }
            }

        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-watch');
};


module.exports = function(grunt) {
    grunt.registerTask('watch', ['watch']);
    grunt.initConfig({
        concat: {
                js: {
                    options: {
                        separator: ';'
                    },
                    src: [
                        'js/dev/*.js'
                    ],
                    dest: 'js/main.min.js'
                 }
        },
        uglify: {
            options: {
                mangle: false
            },
            js: {
                files: {
                    'js/*.js': ['js/*.js']
                }
            }
        },
        watch: {
            js: {
                files: ['js/dev/*.js'],
                tasks: ['concat:js', 'uglify:js'],
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

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
};


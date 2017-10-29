module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: 9000
                },
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'screen.css': 'screen.scss',
                    'mobile.css': 'mobile.scss',
                    'tablet.css': 'tablet.scss'
                }
            }
        },

        watch: {
            options: {
                livereload: true
            },
            html: {
                files: ['index.html'],
            },
            sass: {
                options: {
                    livereload: false
                },
                files: ['*.scss', 'scss/reset.scss', 'scss/*/*.scss'],
                tasks: ['sass'],
            },
            css: {
                files: ['*.css'],
                tasks: [],
            },
        }
    });

    // Actually running things.
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    //grunt.loadNpmTasks('grunt-contrib-jshint');

    // Default task(s).
    grunt.registerTask('default', ['connect', 'watch']);

};
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
                    'css/desktop.css': '**/scss/**/desktop.scss',
                    'css/mobile.css': '**/scss/**/mobile.scss',
                    'css/tablet.css': '**/scss/**/tablet.scss'
                }
            }
        },
        watch: {
             /*options: {                
                livereload: true
            }, */           
            html: {
                options: {                    
                    livereload: true,
                },
                files: ['index.html'],
            },            
            sass: {
               /* options: {                    
                    livereload: false,

            },*/                            
                //files: ['scss/*.scss', 'scss/*/*.scss'],
                files: ['**/scss/**/*.scss'],
                tasks: ['sass'],
            },
           css: {
                options: {                    
                    livereload: true,
               }, 
               /*all files (and css.map), so as not to save the file twice to work */             
               files: ['**/css/**/*.{css,css.map}']
        }                       
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
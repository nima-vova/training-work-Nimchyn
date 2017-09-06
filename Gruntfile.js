module.exports = function(grunt) {
 
grunt.initConfig({
imagemin:{
  dynamic:{
  files: [{
  expand:true,
  cwd: 'img/',   // This had to be img/
  src: ['**/*.{png,jpg}'],
  dest: 'img/'
  }]
}
},

sass: {
  dev: {
    options: {
      style: 'expanded',
      compass: true
    },
    files: {
      'screen.css': 'screen.scss'
    }
  },
  prod: {
    options: {
      style: 'compressed',
      compass: true
    },
    files: {
     'screen.css': 'screen.scss'
    }
  }
},

/**
 * Watch
 */

watch: {
    options: {
        livereload: true,
    },
    sass: {
        files: ['*.{scss,sass}'],
        tasks: ['sass']
   
    },

    imagemin: {
        files: ['img/*.{png,jpg}'],
        tasks: ['imagemin']   
   },
 
//css: {
//      files: ['*.css'],
//    },
   js: {
        files: ['js/**/*.js'],
   },
   html: {
        files: ['*.html'],
   }  
},

 connect: {
    server: {
      options: {
        port: 9000,
        base: '.',
        hostname: '0.0.0.0',
        protocol: 'http',
        livereload: true,
        open: true,
      }
    }
  },


 });

//
 grunt.loadNpmTasks('grunt-contrib-imagemin');
 grunt.loadNpmTasks('grunt-contrib-sass');
 grunt.loadNpmTasks('grunt-contrib-watch');
 grunt.loadNpmTasks('grunt-contrib-connect');
 //grunt.loadNpmTasks('grunt-livereload'); 
// grunt.registerTask('default', ['imagemin'], ['watch']);
grunt.registerTask('server', ['connect','watch']);
};


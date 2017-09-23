module.exports = function(grunt) {
 
grunt.initConfig({
imagemin:{
  dynamic:{
  files: [{
  expand:true,
  cwd: 'img/',   // This had to be img/
  src: ['**/*.{png,jpg}'],
  /*dest: 'img/'*/
  dest: 'img-min/'
  }]
}
},
sass_import: {
    options: {},
    dist: {
      files: {
        'mobile.scss': ['scss/reset.scss', 'scss/mobile/main-seting.scss',
        'scss/mobile/header.scss', 'scss/mobile/slider.scss',
        'scss/mobile/main-content.scss', 'scss/mobile/talk-to-us.scss',
        'scss/mobile/contact-us.scss', 'scss/mobile/contact-details.scss',
        'scss/mobile/copyright.scss']
      }
    }
  },
sass: {
  dev: {
    options: {
      style: 'expanded',
      compass: true
    },
    files: {
      'screen.css': 'screen.scss',
      'mobile.css': 'mobile.scss'
    }
  },
  prod: {
    options: {
      style: 'compressed',
      compass: true
    },
    files: {
     'screen.css': 'screen.scss',     
      'mobile.css': 'mobile.scss'
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

   // sass: {
     //   files: ['*.{scss,sass}'],
     //   tasks: ['sass']
   
  //  },
    stylesheets: {
      files: ['scss/**/*.scss'],
      tasks: ['sass_import', 'sass']
    },

    imagemin: {
        files: ['img/*.{png,jpg}'],
        tasks: ['imagemin']   
   },
 
//scss: {
//     files: ['css/**/*.scss'],
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
 grunt.loadNpmTasks('grunt-sass-import');
 //grunt.loadNpmTasks('grunt-livereload'); 
// grunt.registerTask('default', ['imagemin'], ['watch']);
grunt.registerTask('server', ['connect','watch']);
};


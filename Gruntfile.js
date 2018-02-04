module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
  	sass: {
  		options: {
  			sourceMap: true
  		},
  		dist: {
  			files: {
  				'public/css/style.css': 'public/sass/style.sass'
  			}
  		}
  	},

  	imagemin: {
  		dynamic: {
  			files: [{
  				expand: true,
  				cwd: 'public/images/',
  				src: ['**/*.{png,jpg,gif}'],
  				dest: 'public/images/build/'
  			}]
  		}
  	},

    watch: {
        scripts: {
            files: ['public/sass/*.sass'],
            tasks: ['sass'],
            options: {
                spawn: false,
            },
        }
    }


  });
  // Load the plugins tasks
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch')

  // Default task(s).

  grunt.registerTask('default', ['sass', 'imagemin', 'watch']);
};
module.exports = function(grunt) {
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    // configurable paths
    var projectConfig = {
        src: 'public',
        build: 'public-built'
    };


	var banner = [
		'/*! <%= pkg.name %> - v<%= pkg.version %> - \n',
		'<%= grunt.template.today("yyyy-mm-dd") %> - <%= pkg.homepage %> */\n\n'
		].join('');
 

	grunt.initConfig({
		
		conf: projectConfig,
		
		pkg: grunt.file.readJSON('package.json'),
		
		compass: {
			dist: {
				options: {
					sassDir: '<%= conf.src %>/assets/styles/sass',
					cssDir: '<%= conf.src %>/assets/styles'
				}
			}
		},

		copy: {
			build: {
				cwd: '<%= conf.src %>',
				src: [ '**', '!**/*.scss' ],
				dest: '<%= conf.build %>',
				expand: true
			},
		},

		requirejs: {
		  compile: {
		    options: {
		      baseUrl: "<%= conf.src %>/assets/scripts",
		      mainConfigFile: "<%= conf.src %>/assets/scripts/main.js",
		      out: "<%= conf.build %>/assets/scripts/main-min.js",
		      name: "../../bower_components/almond/almond",
					include: 'main',
			  	optimize: "uglify2"
		    }
		  }
		},
		

		clean: {
			build: {
				src: [ '<%= conf.build %>' ]
			},
			cleanUp: {
				src: [ 
				'<%= conf.build %>/assets/styles/*', '!<%= conf.build %>/assets/styles/main.css',
				'<%= conf.build %>/assets/scripts/*', '!<%= conf.build %>/assets/scripts/main-min.js'
				]
			}
		},
		
		watch: {
			css: {
				files: '<%= conf.src %>/assets/styles/sass/**/*.scss',
				tasks: ['compass']
			}
		},

	  processhtml: {
	    options: {
	    	process: true,
	      data: {
	        message: 'Hello world!'
	      }
	    },
	    dist: {
	     	files: {
	      '<%= conf.build %>/index.html': ['<%= conf.build %>/index.html']
	      }
	    }
	  }


	});


	grunt.registerTask(
	  'default', 
	  'By default',
	  [ 'watch' ]
	);
	
	grunt.registerTask(
	  'build', 
	  'Compiles all of the assets and copies the files to the build directory.', 
	  // [ 'clean:build', 'copy', 'concat', 'uglify', 'clean:cleanUp' ]
	  [ 'clean', 'copy', 'processhtml:dist', 'requirejs', 'clean:cleanUp' ]

	);
};
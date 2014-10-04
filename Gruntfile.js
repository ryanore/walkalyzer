module.exports = function(grunt) {
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    // configurable paths
    var projectConfig = {
        src: 'public',
        build: 'public-built'
    };


	var banner = [
		'/*! <%= pkg.name %> - v<%= pkg.version %> - ',
		'<%= grunt.template.today("yyyy-mm-dd") %> - <%= pkg.homepage %> */\n'
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

		// concatenate js files.  A separate file for minified polyfills
		concat:{
			options:{
				separator: ';'
		    },
			standard:{
				src:[
					'<%= conf.src %>/assets/scripts/ore.utils.js',
					'<%= conf.src %>/assets/scripts/ore.accelo.js',
					'<%= conf.src %>/assets/scripts/ore.walkalizer.js',
		        ],
		        dest: '<%= conf.build %>/assets/scripts/main-built.js'
		    },
		    polyfill:{
				src:['<%= conf.src %>/assets/scripts/polyfills/*'],
				dest:'<%= conf.build %>/assets/scripts/polyfills-built.js'
			}
		},
		
		// minify and uglify the 2 built js files.
		uglify:{
			standard:{
				files:{
					'<%= conf.build %>/assets/scripts/main.js': ['<%= conf.build %>/assets/scripts/main-built.js']
				}
			},
			options:{
				banner: banner
			}
		},
		
		requirejs: {
		  compile: {
		    options: {
		      baseUrl: "<%= conf.src %>/assets/scripts",
		      mainConfigFile: "<%= conf.src %>/assets/scripts/main.js",
		      out: "<%= conf.build %>/scripts/main-min.js",
		      name: "main",
			  include: ['app'],
			  optimize: "uglify2",
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
				'<%= conf.build %>/assets/scripts/*', '!<%= conf.build %>/assets/scripts/main.js'
				]
			}
		},
		
		watch: {
			css: {
				files: '<%= conf.src %>/styles/sass/**/*.scss',
				tasks: ['compass']
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
	  [ 'clean', 'copy', 'requirejs', 'clean:cleanUp' ]

	);
};
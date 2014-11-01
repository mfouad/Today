/* global require */
/* global module */

module.exports = function(grunt) {
	'use strict';

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	// Define the configuration for all the tasks
	grunt.initConfig({

		path: {
			app: 'app',
			dist: 'dist'
		},
		
	

		// Watches files for changes and runs tasks based on the changed files
		watch: {
			bower: {
				files: ['bower.json'],
				tasks: ['wiredep']
			},
			js: {
				files: ['<%= path.app %>/js/{,*/}*.js'],
				tasks: ['newer:jshint:all'],
				options: {
					livereload: '<%= connect.options.livereload %>'
				}
			},
			styles: {
				files: ['<%= path.app %>/css/{,*/}*.css'],
				tasks: ['newer:copy:styles', 'autoprefixer']
			},
			gruntfile: {
				files: ['Gruntfile.js']
			},
			livereload: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: ['<%= yeoman.app %>/{,*/}*.*']
			}
		},
		// Empties folders to start fresh
		clean: {
			dist: {
				files: [{
					dot: true,
					src: ['.tmp', 'dist']
        }]
			}
		},

		// Automatically inject Bower components into the app
		wiredep: {
			app: {
				src: ['<%= path.app %>/*.html'],

			}
		},

		// Reads HTML for usemin blocks to enable smart builds that automatically
		// concat, minify and revision files. Creates configurations in memory so
		// additional tasks can operate on them
		useminPrepare: {
			html: '<%= path.app %>/*.html',
			options: {
				dest: '<%= path.dist %>',
				flow: {
					html: {
						steps: {
							js: ['concat', 'uglifyjs'],
							css: ['cssmin']
						},
						post: {}
					}
				}
			}
		},

		// Performs rewrites based on useminPrepare configuration
		usemin: {
			html: ['<%= path.dist %>/{,*/}*.html'],
			css: ['<%= path.dist %>/styles/{,*/}*.css'],
			options: {
				assetsDirs: ['<%= path.dist %>', '<%= path.dist %>/images']
			}
		},

		// The following *-min tasks will produce minified files in the dist folder
		// By default, your `index.html`'s <!-- Usemin block --> will take care of
		// minification. These next options are pre-configured if you do not wish
		// to use the Usemin blocks.
		// cssmin: {
		//   dist: {
		//     files: {
		//       '<%= path.dist %>/styles/main.css': [
		//         '.tmp/styles/{,*/}*.css'
		//       ]
		//     }
		//   }
		// },
		// uglify: {
		//   dist: {
		//     files: {
		//       '<%= path.dist %>/scripts/scripts.js': [
		//         '<%= path.dist %>/scripts/scripts.js'
		//       ]
		//     }
		//   }
		// },
		// concat: {
		//   dist: {}
		// },

		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= path.app %>/images',
					src: '{,*/}*.{png,jpg,jpeg,gif}',
					dest: '<%= path.dist %>/images'
        }]
			}
		},

		svgmin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= path.app %>/images',
					src: '{,*/}*.svg',
					dest: '<%= path.dist %>/images'
        }]
			}
		},

		htmlmin: {
			dist: {
				options: {
					collapseWhitespace: true,
					conservativeCollapse: true,
					collapseBooleanAttributes: true,
					removeCommentsFromCDATA: true,
					removeOptionalTags: true
				},
				files: [{
					expand: true,
					cwd: '<%= path.dist %>',
					src: ['*.html', 'views/{,*/}*.html'],
					dest: '<%= path.dist %>'
        }]
			}
		},

		// ngmin tries to make the code safe for minification automatically by
		// using the Angular long form for dependency injection. It doesn't work on
		// things like resolve or inject so those have to be done manually.
		ngmin: {
			dist: {
				files: [{
					expand: true,
					cwd: '.tmp/concat/scripts',
					src: '*.js',
					dest: '.tmp/concat/scripts'
        }]
			}
		},

		// Replace Google CDN references
		cdnify: {
			dist: {
				html: ['<%= path.dist %>/*.html']
			}
		},

		// Copies remaining files to places other tasks can use
		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= path.app %>',
					dest: '<%= path.dist %>',
					src: [
						'*.{ico,png,txt}',
						'.htaccess',
						'*.html',
						'views/{,*/}*.html',
						'images/{,*/}*.{webp}',
						'fonts/*'
          			]
        }, {
					expand: true,
					cwd: '.tmp/images',
					dest: '<%= path.dist %>/images',
					src: ['generated/*']
        }, {
					expand: true,
					cwd: 'bower_components/bootstrap/dist',
					src: 'fonts/*',
					dest: '<%= path.dist %>'
        }]
			},
			styles: {
				expand: true,
				cwd: '<%= path.app %>/styles',
				dest: '.tmp/styles/',
				src: '{,*/}*.css'
			}
		},

		connect: {
			options: {
				port: 9000,
				// Change this to '0.0.0.0' to access the server from outside.
				hostname: 'localhost',
				livereload: 35729,
				open: false
			},
			livereload: {
				options: {
					open: true,
					middleware: function (connect) {
						return [
						  connect.static('.tmp'),
						  connect().use('/bower_components', connect.static('./bower_components')),
						  connect.static(appConfig.app)
						];
					}
				}
			},
			dist: {
				options: {
					open: true,
					base: '<%= yeoman.dist %>'
				}
			}
		},

	});


	grunt.registerTask('build', [
    'clean:dist',
    'wiredep',
    'useminPrepare',
	'copy:styles',
	'imagemin',
	'svgmin',
    'concat',
    'ngmin',
    'copy:dist',
    'cdnify',
    'cssmin',
    'uglify',
    'usemin',
    'htmlmin',
	'connect:livereload',
	'watch'

  ]);

	grunt.registerTask('default', [
    'build'
  ]);
};
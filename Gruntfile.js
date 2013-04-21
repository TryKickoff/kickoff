module.exports = function (grunt) {

	'use strict';

	// ====================
	// == Edit this section
	var jsFileList = ['js/helpers.js', 'js/plugins.js', 'js/script.js'];
	var distDir = 'js/dist/';
	var jsFile = 'app.min.js';
	// ====================
	// ====================

	// Project configuration.
	grunt.initConfig({
		pkg: require('./package'),
		meta: {
			banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %> */'
		},

		jshint: {
			all: [
				'Gruntfile.js',
				'js/*.js'
			],
			options: {
				jshintrc: '.jshintrc'
			}
		},

		// Build modernizr
		// TODO: still needs a bit of work
		modernizr: {
			devFile: 'js/libs/modernizr-dev.js',
			outputFile : distDir + 'vendor/modernizr-for-<%= pkg.version %>.min.js',

			extra: {
				shiv: true,
				mq: true
			},

			// Minify
			uglify: true,

			// Files
			files: ['js/**/*.js', 'scss/**/*.scss']
		},

		// Choose Sass files below
		sass: {
			dev: {
				options: {
					unixNewlines: true,
					style: 'expanded',
					lineNumbers: true
				},
				files: {
					'css/kickoff.css': 'scss/kickoff.scss',
					'css/kickoff-old-ie.css': 'scss/kickoff-old-ie.scss'
				}
			},
			deploy: {
				options: {
					style: 'compressed'
				},
				files: {
					'css/kickoff.min.css': 'scss/kickoff.scss',
					'css/kickoff-old-ie.min.css': 'scss/kickoff-old-ie.scss'
				}

			}
		},

		// Not needed at the moment
		csscss: {
			dist: {
				src: ['css/kickoff.css']
			}
		},

		// We're not using this at the moment, but it is left here for reference
		concat: {
			js: {
				// src: 'js/*.js',
				// Choose files to concatinate
				src: ['js/helpers.js', 'js/plugins.js', 'js/script.js'],
				dest: distDir + 'concat.js'
			}
		},

		uglify: {
			options: {
				message: 'We are now ugly',

				// mangle: Turn on or off mangling
				mangle: true,

				// beautify: beautify your code for debugging/troubleshooting purposes
				beautify: false,

				// report: Show file size report
				report: 'gzip',

				// sourceMap: @string. The location of the source map, relative to the project
				sourceMap: jsFile + '.map',

				// sourceMappingURL: @string. The string that is printed to the final file
				sourceMappingURL: '../../'+ jsFile +'.map'

				// sourceMapRoot: @string. The location where your source files can be found. This sets the sourceRoot field in the source map.
				// sourceMapRoot: 'js',

				// sourceMapPrefix: @integer. The number of directories to drop from the path prefix when declaring files in the source map.
				// sourceMapPrefix: 1,

				// banner: Disabled until sourcemaps are fixed
				//banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version + '\\n' %>' +
						// '* <%= grunt.template.today('yyyy-mm-dd') + '\\n' %>' +
						// '* <%= pkg.homepage + '\\n' %>' +
						// '* Copyright (c) <%= grunt.template.today('yyyy') %> - <%= pkg.title %> */ <%= '\\n' %>'
			},
			// files: { 'js/dist/app.min.js' : jsFileList },
			js: {
				src: jsFileList,
				dest: distDir + jsFile
			}
		},

		clean: {
			deploy: ['dist']
		},

		copy: {
			deploy: {
				files: [{
					src: ['js/**'],
					dest: 'dist/'
				}]
			}
		},

		watch: {
			options: {
				message: 'SASS and Uglify finished running'
			},
			scss: {
				files: ['scss/**/*.scss'],
				tasks: 'sass:dev'
			},

			js: {
				files: [
					'Gruntfile.js',
					'js/*.js'
				],
				tasks: ['uglify']
			}
		},

		// Server config
		connect: {
			server: {
				options: {
					port: 9001,
					keepalive: true,
					message: 'Server is ready!'
				}
			}
		},

		concurrent: {
			target: {
				tasks: ['connect', 'watch'],
				logConcurrentOutput: true,
				message: 'Concurrent change!'
			}
		}
	});

	// Load some stuff
	grunt.loadNpmTasks('grunt-modernizr');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-devtools');
	grunt.loadNpmTasks('grunt-concurrent');

	// Installed but unused
	// grunt.loadNpmTasks('grunt-contrib-livereload');
	// grunt.loadNpmTasks('grunt-contrib-concat');
	// grunt.loadNpmTasks('grunt-csscss');
	// grunt.loadNpmTasks('grunt-notify'); // Automatic notifications when tasks fail.


	// =============
	// === Tasks ===
	// =============
	// A task for development
	grunt.registerTask('dev', ['jshint', 'uglify', 'sass:dev']);

	// A task for deployment
	grunt.registerTask('deploy', ['jshint', 'clean', 'modernizr', 'uglify', 'sass:deploy']);

	// Default task
	// grunt.registerTask('default', ['jshint', 'uglify', 'sass:dev']);

	// Default task 2: Same as above but this creates a server and watches the project for changes
	grunt.registerTask('default', ['jshint', 'uglify', 'concurrent:target']);

};

module.exports = function (grunt) {

	'use strict';

	// ====================
	// == Edit this section
	var jsFileList = [
		'js/helpers.js',
		'js/plugins.js',
		'js/script.js'
	];
	var distDir = 'js/dist/';
	var jsFile = 'app.min.js';
	// ====================
	// ====================

	// Project configuration.
	grunt.initConfig({
		pkg: require('./package'),

		jshint: {
			all: [
				'Gruntfile.js',
				'js/**/*.js'
			],
			options: {
				jshintrc: '.jshintrc'
			}
		},

		// Choose Sass files below
		sass: {
			dev: {
				options: {
					unixNewlines: true,
					style: 'expanded',
					lineNumbers: true,
					debugInfo : false,
					precision : 8
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

		uglify: {
			options: {
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

			},
			js: {
				src: jsFileList,
				dest: distDir + jsFile
			}
		},

		watch: {
			scss: {
				files: ['scss/**/*.scss'],
				tasks: 'sass:dev'
			},

			js: {
				files: [
					'Gruntfile.js',
					'js/*.js',
					'js/libs/**/*.js'
				],
				tasks: ['uglify']
			},
			livereload: {
				options: { livereload: true },
				files: [
					'css/*.css'
				]
			}
		}
	});

	// Load some stuff
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-devtools');

	// =============
	// === Tasks ===
	// =============
	// A task for development
	grunt.registerTask('dev', ['jshint', 'uglify', 'sass:dev']);

	// A task for deployment
	grunt.registerTask('deploy', ['jshint', 'clean', 'modernizr', 'uglify', 'sass:deploy']);

	// Default task
	grunt.registerTask('default', ['jshint', 'uglify', 'sass:dev']);

};

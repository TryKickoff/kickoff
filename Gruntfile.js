module.exports = function (grunt) {

	'use strict';

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
			outputFile : 'js/dist/vendor/modernizr-for-<%= pkg.version %>.min.js',

			extra: {
				shiv: true,
				mq: true
			},

			// Minify
			uglify: true,

			// Files
			files: ['js/**/*.js', 'scss/**/*.scss']
		},

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
					'css/kickoff-<%= pkg.version %>.min.css': 'scss/kickoff.scss'
				}

			}
		},

		// We're not using this at the moment, but it is left here for reference
		concat: {
			js: {
				// src: 'js/*.js',
				// Choose files to concatinate
				src: ['js/helpers.js', 'js/plugins.js', 'js/script.js'],
				dest: 'js/dist/concat.js'
			}
		},

		uglify: {
			options: {
				// mangle: Turn on or off mangling
				mangle: true,

				// report: Show file size report
				// report: 'gzip',

				// sourceMap: The location of the source map, relative to the project
				sourceMap: 'app.min.js.map',

				// sourceMappingURL: The string that is printed to the final file
				sourceMappingURL: '../../app.min.js.map',

				// sourceMapRoot: The location where your source files can be found. This sets the sourceRoot field in the source map.
				// sourceMapRoot: 'js',

				// sourceMapPrefix: The number of directories to drop from the path prefix when declaring files in the source map.
				// sourceMapPrefix: 1,

				banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version + "\\n" %>' +
						'* <%= grunt.template.today("yyyy-mm-dd") + "\\n" %>' +
						'* <%= pkg.homepage + "\\n" %>' +
						'* Copyright (c) <%= grunt.template.today("yyyy") %> - <%= pkg.title %> */ <%= "\\n" %>'
			},
			files: {
				'js/dist/app.min.js': ['js/helpers.js', 'js/plugins.js', 'js/script.js']
			}
			,
			js: {
				src: ['js/helpers.js', 'js/plugins.js', 'js/script.js'],
				dest:'js/dist/app.min.js'
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
					keepalive: true
				}
			}
		}
	});

	// Load some stuff
	grunt.loadNpmTasks('grunt-modernizr');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-copy');
	// grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-devtools');

	// A task for development
	grunt.registerTask('dev', ['jshint', 'uglify', 'sass:dev']);

	// A task for deployment
	grunt.registerTask('deploy', ['jshint', 'clean', 'modernizr', 'uglify', 'sass:deploy']);

	// Default task
	grunt.registerTask('default', ['jshint', 'uglify', 'sass:dev']);

};

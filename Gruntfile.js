module.exports = function (grunt) {

	'use strict';

	var options = {
		pkg: require('./package'), // <%=pkg.name%>

		/**
		 * Grunt global vars
		 * Many of the Grunt tasks use these vars
		 */
		config : {
			src: "_grunt-configs/*.js",

			css : {
				distDir : 'css',     // <%=config.css.distDir%>
				srcFile : 'kickoff', // <%=config.css.srcFile%>
				scssDir : 'scss'     // <%=config.css.scssDir%>
			},

			js : {
				distDir  : 'js/dist/',   // <%=config.js.distDir%>
				distFile : 'app.min.js', // <%=config.js.distFile%>

				// <%=config.js.fileList%>
				fileList : [
					// if you would like to remove jQuery from your concatenated JS, comment out the line below
					'js/libs/jquery/jquery-1.10.2.js',

					// if you would like some basic JS shims (when not using jQuery),
					// uncomment the line below to compile Shimly output
					//'js/helpers/shims.js',

					'js/helpers/console.js',
					'js/bower/trak/dist/trak.js',
					'js/bower/swiftclick/js/libs/swiftclick.js',
					'js/bower/cookies-js/src/cookies.js',

					'js/script.js'
				]
			},

			localserver: 'kickoff.dev', // <%=config.localserver%>

			testing: {
				visual : {
					sizes: [ '600', '1000', '1200' ], // <%=config.testing.visual.sizes%>

					// <%=config.testing.visual.urls%>
					urls : [
						'http://localhost:3000',
						'http://localhost:3000/_docs/',
						'http://localhost:3000/_docs/styleguide.html'
					]
				}
			}
		}
	};

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Load grunt configurations automatically
	var configs = require('load-grunt-configs')(grunt, options);

	// Define the configuration for all the tasks
	grunt.initConfig(configs);


	/**
	 * Available tasks:
	 * grunt            : run jshint, uglify and sass:kickoff
	 * grunt start      : run this before starting development
	 * grunt watch      : run sass:kickoff, uglify and livereload
	 * grunt dev        : run uglify, sass:kickoff & autoprefixer:kickoff
	 * grunt deploy     : run jshint, uglify, sass:kickoff and csso
	 * grunt jquery     : build custom version of jquery
	 * grunt styleguide : watch js & scss, run a local server for editing the styleguide
	 * grunt serve      : watch js & scss and run a local server
	 * grunt icons      : generate the icons. uses svgmin and grunticon
	 * grunt check      : run jshint
	 * grunt travis     : used by travis ci only
	 */


	/**
	 * GRUNT * Default task
	 * run uglify, sass:kickoff and autoprefixer
	 */
	grunt.registerTask('default', [
		'shimly',
		'uglify',
		'sass:kickoff',
		'autoprefixer:kickoff',
		'browserSync:serve',
		'watch'
	]);


	/**
	 * GRUNT START * Run this to
	 * run jquery builder, uglify, sass and autoprefixer
	 */
	grunt.registerTask('start', [
		'jquery',
		'shell:bowerinstall',
		'shimly',
		'uglify',
		'sass:kickoff',
		'sass:styleguide',
		'autoprefixer:kickoff',
		'autoprefixer:styleguide',
		'connect:start',
		'watch'
	]);


	/**
	 * GRUNT DEV * A task for development
	 * run uglify, sass:kickoff & autoprefixer:kickoff
	 */
	grunt.registerTask('dev', [
		'shimly',
		'uglify',
		'sass:kickoff',
		'autoprefixer:kickoff'
	]);


	/**
	 * GRUNT DEPLOY * A task for your production environment
	 * run uglify, sass:kickoff, autoprefixer:kickoff and csso
	 */
	grunt.registerTask('deploy', [
		'shimly',
		'newer:uglify',
		'newer:sass:kickoff',
		'newer:autoprefixer:kickoff',
		'newer:csso'
	]);


	/**
	 * GRUNT STYLEGUIDE * A task for the styleguide
	 * run uglify, sass:kickoff, sass:styleguide, autoprefixer:kickoff, autoprefixer:styleguide, connect:styleguide & watch
	 */
	grunt.registerTask('styleguide', [
		'shimly',
		'uglify',
		'sass:kickoff',
		'sass:styleguide',
		'autoprefixer:kickoff',
		'autoprefixer:styleguide',
		'connect:styleguide',
		'watch'
	]);


	/**
	 * GRUNT SERVE * A task for a static server with a watch
	 * run connect and watch
	 */
	grunt.registerTask('serve', [
		'shimly',
		'dofilesexist:js',
		'uglify',
		'sass:kickoff',
		'autoprefixer:kickoff',
		'browserSync:serve',
		'watch'
	]);


	/**
	 * GRUNT WATCHER * A task for a static server with a watch
	 * run connect and watch
	 * TODO: needs documentation
	 */
	grunt.registerTask('watcher', [
		'shimly',
		'uglify',
		'sass:kickoff',
		'autoprefixer:kickoff',
		'browserSync:watch',
		'watch'
	]);


	/**
	 * GRUNT ICONS * A task to create all icons using grunticon
	 * run clean, svgmin and grunticon
	 */
	grunt.registerTask('icons', [
		'clean:icons',
		'svgmin',
		'grunticon'
	]);


	/**
	 * GRUNT CHECKS * Check code for errors
	 * run jshint
	 */
	grunt.registerTask('checks', [
		'jshint:project'
	]);


	/**
	 * Travis CI to test build
	 */
	grunt.registerTask('travis', [
		'jshint:all',
		'uglify',
		'sass:kickoff'
	]);


	/**
	 * GRUNT JSFILESEXIST to check existence of js files before uglify
	 */
	grunt.registerMultiTask('dofilesexist', function () {

		var filePaths = this.data;
		var numFailedFiles = 0;

		if (Array.isArray(filePaths)) {

			filePaths.forEach(function(path) {

				if (!grunt.file.exists(path))
				{
					grunt.log.warn("Source file: '" + path + "' not found.");
					numFailedFiles++;
				}
			});

			if (numFailedFiles > 0) grunt.fail.warn("Please add the missing files.");
		}
	});

	
};

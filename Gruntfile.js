module.exports = function (grunt) {

	'use strict';

	var options = {
		pkg: require('./package'), // <%=pkg.name%>

		/**
		 * Grunt global vars
		 */
		config : require('./_grunt-configs/config.js')
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
	 * grunt styleguide : watch js & scss, run a local server for editing the styleguide
	 * grunt serve      : watch js & scss and run a local server
	 * grunt icons      : generate the icons. uses svgmin and grunticon
	 * grunt checks     : run jshint & scsslint
	 * grunt travis     : used by travis ci only
	 */


	/**
	 * GRUNT * Default task
	 * run uglify, sass:kickoff and autoprefixer
	 */
	grunt.registerTask('default', [
		'shimly',
		'dofilesexist:js',
		'uglify',
		'sass',
		'autoprefixer',
		'clean:tempCSS',
		'browserSync:serve',
		'watch'
	]);


	/**
	 * GRUNT START * Run this to
	 * run bower install, uglify, sass, autoprefixer & then start a server/watch
	 */
	grunt.registerTask('start', [
		'shell:bowerinstall',
		'shimly',
		'dofilesexist:js',
		'uglify',
		'sass',
		'autoprefixer',
		'clean:tempCSS',
		'browserSync:start',
		'watch'
	]);


	/**
	 * GRUNT DEV * A task for development
	 * run uglify, sass:kickoff & autoprefixer:kickoff
	 */
	grunt.registerTask('dev', [
		'shimly',
		'dofilesexist:js',
		'uglify',
		'sass',
		'autoprefixer',
		'clean:tempCSS'
	]);


	/**
	 * GRUNT DEPLOY * A task for your production environment
	 * run uglify, sass, autoprefixer and csso
	 */
	grunt.registerTask('deploy', [
		'shimly',
		'dofilesexist:js',
		'uglify',
		'sass',
		'autoprefixer',
		'csso',
		'clean:tempCSS'
	]);


	/**
	 * GRUNT STYLEGUIDE * A task for the styleguide
	 * run uglify, sass, autoprefixer, browserSync:styleguide & watch
	 */
	grunt.registerTask('styleguide', [
		'shimly',
		'dofilesexist:js',
		'uglify',
		'sass',
		'autoprefixer',
		'clean:tempCSS',
		'browserSync:styleguide',
		'watch'
	]);


	/**
	 * GRUNT SERVE * A task for a static server with a watch
	 * run browserSync and watch
	 */
	grunt.registerTask('serve', [
		'shimly',
		'dofilesexist:js',
		'uglify',
		'sass',
		'autoprefixer',
		'clean:tempCSS',
		'browserSync:serve',
		'watch'
	]);


	/**
	 * GRUNT ICONS * A task to create all icons using grunticon
	 * run clean, svgmin and grunticon
	 */
	grunt.registerTask('icons', [
		'clean:icons',
		'imagemin:grunticon',
		'grunticon'
	]);


	/**
	 * GRUNT CHECKS * Check code for errors
	 * run jshint
	 */
	grunt.registerTask('checks', [
		'jshint:project',
		'scsslint'
	]);


	/**
	 * Travis CI to test build
	 */
	grunt.registerTask('travis', [
		'jshint:project',
		'uglify',
		'sass:kickoff'
	]);


	/**
	 * GRUNT DOFILESEXIST * Check for the existence of specific files and fail if not found
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

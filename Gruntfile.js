/**
 * Grunt tasks:
 * - grunt                   : The default task. Alias for `grunt serve` task below
 * - grunt serve             : watch files and run a static server
 * - grunt watcher           : watch files without static server
 * - grunt compile           : compile scss, js & compress images
 * - grunt compile --release : same as above, but compress CSS as well
 * - grunt styleguide        :
 * - grunt images            : compress all images
 * - grunt checks            : run jshint and scsslint
 */

module.exports = function (grunt) {
	'use strict';

	var options = {
		pkg: require('./package'), // <%=pkg.name%>

		// Global Grunt vars. Edit this file to change vars
		config : require('./_grunt-configs/config.js')
	};

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt, {pattern: ["grunt-*"]});

	// Load grunt configurations automatically
	var configs = require('load-grunt-configs')(grunt, options);

	// Define the configuration for all the tasks
	grunt.initConfig(configs);


	/**
	 * The tasks
	 */

	// grunt
	grunt.registerTask('default', ['serve']);


	// grunt serve
	grunt.registerTask('serve', [
		'compile',
		'browserSync:serve',
		'watch',
	]);


	// grunt watcher
	grunt.registerTask('watcher', [
		'compile',
		'watch',
	]);


	// grunt compile
	grunt.registerTask('compile', [
		'browserify',
		'postscss',
		'images',
		'shimly',
		'copy:jsStandalone',
	]);


	// grunt start
	grunt.registerTask('start', function() {
		var opn = require('opn');
		opn('http://trykickoff.com/learn/checklist.html');
	});


	// grunt styleguide
	grunt.registerTask('styleguide', [
		'compile',
		'browserSync:styleguide',
		'watch',
	]);


	// grunt images
	grunt.registerTask('images', [
		'newer:imagemin:images'
	]);



	/**
	 * grunt checks
	 */
	grunt.registerTask('checks', [
		'eslint',
		'scsslint',
	]);


	// grunt travis
	grunt.registerTask('travis', [
		'postscss',
		'eslint',
	]);
};

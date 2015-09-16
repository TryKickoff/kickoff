module.exports = function (grunt) {
	'use strict';

	var opn = require('opn');

	var options = {
		pkg: require('./package'), // <%=pkg.name%>

		// Global Grunt vars. Edit this file to change vars
		config : require('./_grunt-configs/config.js')
	};

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt, {pattern: ["grunt-*", "chotto"]});

	// Load grunt configurations automatically
	var configs = require('load-grunt-configs')(grunt, options);

	// Define the configuration for all the tasks
	grunt.initConfig(configs);


	/**
	 * Available tasks:
	 * grunt            : Alias for 'serve' task, below (the default task)
	 * grunt serve      : watch js, images & scss and run a local server
	 * grunt watcher    : run compile JS/CSS then watch
	 * grunt start      : Opens the post-install setup checklist on the Kickoff site
	 * grunt watch      : run sass:kickoff, uglify and livereload
	 * grunt dev        : run browserify, sass:kickoff & autoprefixer:kickoff
	 * grunt deploy     : run browserify, sass:kickoff and csso
	 * grunt styleguide : watch js & scss, run a local server for editing the styleguide
	 * grunt images     : compress all non-grunticon images & then run `grunt icons`
	 * grunt icons      : generate the icons. uses svgmin and grunticon
	 * grunt checks     : run html validator
	 * grunt travis     : used by travis ci only
	 */


	/**
	 * GRUNT * Alias for 'serve' task, below
	 */
	grunt.registerTask('default', ['serve']);


	/**
	 * GRUNT SERVE * A task for a static server with a watch
	 * run browserSync and watch
	 */
	grunt.registerTask('serve', [
		'shimly',
		'compileJS',
		'compileCSS',
		'copy:modernizr',
		'images',
		'browserSync:serve',
		'watch'
	]);


	/**
	 * GRUNT WATCHER * A task for compiling & watching.
	 * Useful for development when not using the browserSync server
	 * run compile JS/CSS then watch
	 */
	grunt.registerTask('watcher', [
		'shimly',
		'compileJS',
		'compileCSS',
		'copy:modernizr',
		'images',
		'watch'
	]);


	/**
	 * GRUNT START
	 * Opens the post-install setup checklist on the Kickoff site
	 */
	grunt.registerTask('start', function() {
		opn('http://trykickoff.github.io/learn/checklist.html');
	});


	/**
	 * GRUNT DEV * A task for development
	 * run uglify, sass:kickoff & autoprefixer:kickoff
	 */
	grunt.registerTask('dev', [
		'shimly',
		'compileJS',
		'compileCSS',
		'copy:modernizr',
		'images'
	]);


	/**
	 * GRUNT DEPLOY * A task for your production environment
	 * run uglify, sass, autoprefixer and csso
	 */
	grunt.registerTask('deploy', [
		'shimly',
		'compileJS',
		'compileCSS',
		'csso',
		'copy:modernizr',
		'images'
	]);


	/**
	 * GRUNT STYLEGUIDE * A task to view the styleguide
	 */
	grunt.registerTask('styleguide', [
		'shimly',
		'compileJS',
		'compileCSS',
		'images',
		'browserSync:styleguide',
		'watch'
	]);


	/**
	 * GRUNT IMAGES * A task to compress all non-grunticon images
	 */
	grunt.registerTask('images', [
		'newer:imagemin:images',
		'icons'
	]);


	/**
	 * GRUNT ICONS * A task to create all icons using grunticon
	 */
	grunt.registerTask('icons', [
		'clean:icons',
		'newer:imagemin:grunticon',
		'grunticon'
	]);


	/**
	 * GRUNT CHECKS * Check code for errors
	 * run jshint
	 */
	grunt.registerTask('checks', [
		'validation'
	]);


	/**
	 * Travis CI to test build
	 */
	grunt.registerTask('travis', [
		'sass:kickoff'
	]);


	/**
	 * Utility classes
	 */
	// Compile JS
	grunt.registerTask('compileJS', [
		'browserify'
	]);

	// Compile CSS
	grunt.registerTask('compileCSS', [
		'sass',
		'autoprefixer',
		'clean:tempCSS'
	]);
};

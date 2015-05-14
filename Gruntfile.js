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
	 * grunt            : Alias for 'serve' task, below
	 * grunt serve      : watch js, images & scss and run a local server
	 * grunt start      : Opens the post-install setup checklist on the Kickoff site
	 * grunt watch      : run sass:kickoff, uglify and livereload
	 * grunt dev        : run uglify, sass:kickoff & autoprefixer:kickoff
	 * grunt deploy     : run jshint, uglify, sass:kickoff and csso
	 * grunt styleguide : watch js & scss, run a local server for editing the styleguide
	 * grunt icons      : generate the icons. uses svgmin and grunticon
	 * grunt checks     : run jshint & scsslint
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
		'chotto:js',
		'uglify',
		'sass',
		'autoprefixer',
		'clean:tempCSS',
		'copy:modernizr',
		'icons',
		'imagemin:images',
		'browserSync:serve',
		'watch'
	]);


	/**
	 * GRUNT START
	 * Opens the post-install setup checklist on the Kickoff site
	 */
	grunt.registerTask('start', function(){
		opn('http://trykickoff.github.io/learn/checklist.html');
	});


	/**
	 * GRUNT DEV * A task for development
	 * run uglify, sass:kickoff & autoprefixer:kickoff
	 */
	grunt.registerTask('dev', [
		'shimly',
		'chotto:js',
		'uglify',
		'sass',
		'autoprefixer',
		'clean:tempCSS',
		'copy:modernizr',
		'icons',
		'imagemin:images',
	]);


	/**
	 * GRUNT DEPLOY * A task for your production environment
	 * run uglify, sass, autoprefixer and csso
	 */
	grunt.registerTask('deploy', [
		'shimly',
		'chotto:js',
		'uglify',
		'sass',
		'autoprefixer',
		'csso',
		'clean:tempCSS',
		'copy:modernizr',
		'icons',
		'imagemin:images'
	]);


	/**
	 * GRUNT STYLEGUIDE * A task to view the styleguide
	 */
	grunt.registerTask('styleguide', [
		'shimly',
		'chotto:js',
		'uglify',
		'sass',
		'autoprefixer',
		'clean:tempCSS',
		'icons',
		'imagemin:images',
		'browserSync:styleguide',
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
		'scsslint',
		'validation'
	]);


	/**
	 * Travis CI to test build
	 */
	grunt.registerTask('travis', [
		'jshint:project',
		'uglify',
		'sass:kickoff'
	]);

};

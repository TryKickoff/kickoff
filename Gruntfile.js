module.exports = function (grunt) {

	'use strict';

	var options = {
		pkg: require('./package'), // <%=pkg.name%>

		/**
		 * Config - Edit this section
		 * ==========================
		 * Choose sass & js vars
		 */
		config : {
			scss : {
				cssFile : 'kickoff' // <%=config.scss.cssFile%>
			},

			js : {
				// <%=config.js.distDir%>
				distDir  : 'js/dist/',

				// <%=config.js.distFile%>
				distFile : 'app.min.js',

				// <%=config.js.fileList%>
				fileList : [
					// if you would like to remove jQuery from your concatenated JS, comment out the line below
					'js/libs/jquery/jquery-1.10.2.js',

					// if you would like some basic JS shims (when not using jQuery), uncomment the line below to compile Shimly output
					//'js/helpers/shims.js',

					'js/helpers/console.js',
					'js/vendor/trak/dist/trak.js',
					'js/vendor/swiftclick/js/libs/swiftclick.js',
					'js/vendor/cookies-js/src/cookies.js',

					'js/script.js'
				]
			},

			localserver: 'kickoff.dev' // <%=config.localserver%>
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
		'newer:uglify',
		'newer:sass:kickoff',
		'autoprefixer:kickoff'
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
		'uglify',
		'sass:kickoff',
		'autoprefixer:kickoff',
		'browserSync:serve',
		'watch'
	]);


	/**
	 * GRUNT WATCHER * A task for a static server with a watch
	 * run connect and watch
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
		'jshint'
	]);


	/**
	 * Travis CI to test build
	 */
	grunt.registerTask('travis', [
		'jshint',
		'uglify',
		'sass:kickoff',
		'autoprefixer:kickoff'
	]);
};

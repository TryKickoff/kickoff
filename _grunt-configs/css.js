var postscss = require('postscss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
// Add your own postcss plugins here

module.exports = function (grunt, options) {

	/**
	 * PostScss
	 * https://github.com/nicbell/postscss
	 */
	return grunt.registerTask('postscss', 'Compiles SASS and runs postcss.', function () {
		var done = this.async();

		var scssDir = grunt.config.process(options.config.css.scssDir);
		var cssDir = grunt.config.process(options.config.css.distDir);
		var cssDistFile = grunt.config.process(options.config.css.distFile);

		var plugins = [
			autoprefixer({ browsers: options.config.css.autoprefixer }),
			// Add your own postcss plugins here
		];

		// Release flag, use cssnano
		// e.g. `grunt compile --release`
		if (grunt.option('release')) {
			plugins.push(cssnano({discardComments: {removeAll: true}}));
		}

		postscss(plugins).processMany([
			{
				from: scssDir + '/kickoff.scss',
				to: cssDir + '/' + cssDistFile + '.css',
			},
			{
				from: scssDir + '/styleguide.scss',
				to: cssDir + '/styleguide.css',
			},
		])
		.then(done)
		.catch(function(error) {
			console.error('\n' + error.formatted + '\n');
		});
	});
};

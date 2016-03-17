var postscss = require('postscss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');

module.exports = function (grunt, options) {

	/**
	 * PostScss
	 * https://github.com/nicbell/postscss
	 */
	return grunt.registerTask('postscss', 'Compiles SASS and runs postcss.', function () {
		var done = this.async();

		var scssDir = grunt.config.process(options.config.css.scssDir);
		var cssDir = grunt.config.process(options.config.css.distDir);

		var plugins = [
			autoprefixer({ browsers: options.config.css.autoprefixer })
		];

		// Release flag, use cssnano
		if (grunt.option('release')) {
			plugins.push(cssnano());
		}

		postscss(plugins).processMany([
			{
				from: scssDir + '/kickoff.scss',
				to: cssDir + '/kickoff.css'
			},
			{
				from: scssDir + '/styleguide.scss',
				to: cssDir + '/styleguide.css'
			}
		])
		.then(done)
		.catch(function(error) {
			console.error('\n' + error.formatted + '\n');
		});
	});
};

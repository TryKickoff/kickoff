/**
 * Global Gulp vars
 * Many of the Gulp tasks use these vars. Change as much as you like :)
 */

const ConfigOptions = function() {
	const config = this;


	config.srcDir = 'assets/src';
	config.distDir = 'assets/dist';


	// CSS-related Gulp vars
	config.css = {
		scssDir: config.srcDir + '/scss',
		distDir: config.distDir + '/css',

		distFile: 'kickoff',
		// Renaming this changes the name of the generated CSS file
		// Make sure you update your template file

		autoprefixer: ['> 5%', 'last 2 versions', 'ie > 8'],
		// We are supporting the last 2 browsers, any browsers with >5% market share,
		// and ensuring we support IE8+ with prefixes
	};


	// Javascript-related Gulp vars
	config.js = {
		srcFile: config.srcDir + '/js/script.js',
		distDir: config.distDir + '/js/',

		distFile: 'bundle.js',
		// Renaming this changes the name of the generated JS file
		// Make sure you update your template file
	};


	// Image-related Gulp vars
	config.img = {
		srcDir: config.srcDir + '/img',
		distDir: config.distDir + '/img',
	};
};

module.exports = new ConfigOptions();

/**
 * Global Gulp vars
 * Many of the Gulp tasks use these vars. Change as much as you like :)
 */
var pkg = require('../../package.json');


const ConfigOptions = function() {
	const config = this;


	config.srcDir = './assets/src'; // config.srcDir
	config.distDir = './assets/dist'; // config.distDir


	// CSS-related vars
	config.css = {
		scssDir: `${config.srcDir}/scss`, // config.css.scssDir
		distDir: `${config.distDir}/css`, // config.css.distDir

		distFile: 'kickoff', // config.css.distFile
		// Renaming this changes the name of the generated CSS file
		// Make sure you update your template file

		browsers: ['> 5%', 'last 2 versions', 'ie > 8'], // config.css.browsers
		// We are supporting the last 2 browsers, any browsers with >5% market share,
		// and ensuring we support IE9+ with prefixes
	};


	// Javascript-related vars
	config.js = {
		srcDir: `${config.srcDir}/js`, // config.js.srcDir
		srcFile: 'script.js', // config.js.srcFile

		entryPoints: {
			kickoff: `${this.srcDir}/js/script.js`,

			// Create more entry-points by adding to this array, e.g.
			// foo: `${this.srcDir}/js/bar.js`,
		},

		distDir: `${config.distDir}/js`, // config.js.distDir
		distFile: 'kickoff.js', // config.js.distFile
		// Renaming this changes the name of the generated JS file
		// Make sure you update your template file
	};


	// Image-related vars
	config.img = {
		srcDir: `${config.srcDir}/img`, // config.img.srcDir
		distDir: `${config.distDir}/img`, // config.img.distDir
	};


	// Icon-related vars
	config.icons = {
		srcDir: `${config.srcDir}/icons`, // config.icons.srcDir
		distDir: `${config.distDir}/img`, // config.icons.distDir
	};


	// Banners and info
	config.misc = {
		banner: `/**
   ██╗  ██╗██╗ ██████╗██╗  ██╗ ██████╗ ███████╗███████╗
   ██║ ██╔╝██║██╔════╝██║ ██╔╝██╔═══██╗██╔════╝██╔════╝
   █████╔╝ ██║██║     █████╔╝ ██║   ██║█████╗  █████╗
   ██╔═██╗ ██║██║     ██╔═██╗ ██║   ██║██╔══╝  ██╔══╝
   ██║  ██╗██║╚██████╗██║  ██╗╚██████╔╝██║     ██║
   ╚═╝  ╚═╝╚═╝ ╚═════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝
 * <%= pkg.title %> v<%= pkg.version %>
 * <%= pkg.homepage %>
 * <%= pkg.repo %>
 */
`,
	};
};

module.exports = new ConfigOptions();

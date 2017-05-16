/**
 * Global build task vars
 * Both Webpack and Gulp use these vars. Change as much as you like :)
 */
const gutil = require('gulp-util');
const pkg = require('../package');

const ConfigOptions = function () {
	const config = this;

	config.isRelease = (gutil.env.release ? true : false);

	config.srcDir = './assets/src'; // config.srcDir
	config.distDir = './assets/dist'; // config.distDir

	// CSS-related vars
	config.css = {
		scssDir: `${config.srcDir}/scss`, // config.css.scssDir
		distDir: `${config.distDir}/css`, // config.css.distDir

		// Renaming this changes the name of the generated CSS file
		// Make sure you update your template file
		distFile: 'kickoff', // config.css.distFile

		// We are supporting the last 2 browsers, any browsers with >5% market share,
		// and ensuring we support IE9+ with prefixes
		browsers: ['> 1%', 'last 1 versions', 'ie > 9', 'not ie <= 8', 'edge >= 12'], // config.css.browsers
	};

	// Javascript-related vars
	config.js = {
		srcDir: `${config.srcDir}/js`, // config.js.srcDir

		entryPoints: {
			kickoff: [`${this.srcDir}/js/script.js`],
			styleguide: [`${this.srcDir}/js/styleguide.js`],

			// Create more entry-points by adding to this array, e.g.
			// foo: [`${this.srcDir}/js/bar.js`],
		},

		distDir: `${config.distDir}/js`, // config.js.distDir
	};

	// Image-related vars
	config.img = {
		srcDir: `${config.srcDir}/img`, // config.img.srcDir
		distDir: `${config.distDir}/img`, // config.img.distDir
	};

	// SVG-related vars
	config.svg = {
		srcDir: `${config.srcDir}/svg`, // config.svg.srcDir
		distDir: `${config.distDir}/svg`, // config.svg.distDir
	};

	// Webfont-related vars - unused by default
	config.fonts = {
		srcDir: `${config.srcDir}/fonts`, // config.fonts.srcDir
		distDir: `${config.distDir}/fonts`, // config.fonts.distDir
	};

	config.gulp = {
		// Reports which file was changed
		onChange : function(evt) {
			gutil.log( gutil.colors.cyan.bold('❯❯ File: ' + evt.path.replace(new RegExp('/.*(?=/' + config.srcDir.substr(2) + ')/'), '')), 'was', gutil.colors.magenta(evt.type) );
		}
	};

	// Banners and info
	config.misc = {
		banner: `/**
 * ██╗  ██╗██╗ ██████╗██╗  ██╗ ██████╗ ███████╗███████╗
 * ██║ ██╔╝██║██╔════╝██║ ██╔╝██╔═══██╗██╔════╝██╔════╝
 * █████╔╝ ██║██║     █████╔╝ ██║   ██║█████╗  █████╗
 * ██╔═██╗ ██║██║     ██╔═██╗ ██║   ██║██╔══╝  ██╔══╝
 * ██║  ██╗██║╚██████╗██║  ██╗╚██████╔╝██║     ██║
 * ╚═╝  ╚═╝╚═╝ ╚═════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝
 * ${pkg.title} v${pkg.version}
 * ${pkg.homepage}
 * ${pkg.repository.page}
 */
`,

		// Output file-size and gzip file-size. May slow-down build.
		showFileSize: true,
	};
};

module.exports = new ConfigOptions();

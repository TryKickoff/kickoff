/**
 * Global build task vars
 * Both Webpack and Gulp use these vars. Change as much as you like :)
 */
const pkg = require('../package.json');

const srcDir = './src'; // config.srcDir
const distDir = './public/assets/'; // config.distDir

// CSS-related vars
const css = {
	scssDir: `${srcDir}/scss`, // config.css.scssDir
	distDir: `${distDir}/css`, // config.css.distDir

	// Renaming this changes the name of the generated CSS file
	// Make sure you update your template file
	distFile: 'kickoff', // config.css.distFile

	// We are supporting the last 2 browsers, any browsers with >5% market share,
	// and ensuring we support IE9+ with prefixes
	browsers: ['> 1%', 'last 1 versions', 'ie > 9', 'not ie <= 8', 'edge >= 12'], // config.css.browsers

	rootFontSize: 20,
};

// Javascript-related vars
const js = {
	srcDir: `${srcDir}/js`, // config.js.srcDir

	entryPoints: {
		kickoff: [`${srcDir}/js/script.js`],
		styleguide: [`${srcDir}/js/styleguide.js`],

		// Create more entry-points by adding to this array, e.g.
		//foo: [`${srcDir}/js/bar.js`],
	},

	distDir: `${distDir}/js`, // config.js.distDir
};

// Image-related vars
const img = {
	srcDir: `${srcDir}/img`, // config.img.srcDir
	distDir: `${distDir}/img`, // config.img.distDir
};

// SVG-related vars
const svg = {
	srcDir: `${srcDir}/svg`, // config.svg.srcDir
	distDir: `${distDir}/svg`, // config.svg.distDir
};

// Webfont-related vars - unused by default
const fonts = {
	srcDir: `${srcDir}/fonts`, // config.fonts.srcDir
	distDir: `${distDir}/fonts`, // config.fonts.distDir
};

// Banners and info
const misc = {
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

const config = {
	srcDir,
	distDir,
	css,
	js,
	img,
	fonts,
	svg,
	misc,
};

module.exports = config;

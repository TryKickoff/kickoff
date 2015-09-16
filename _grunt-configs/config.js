/**
 * Global Grunt vars
 * Many of the Grunt tasks use these vars. Change as much as you like :)
 */

module.exports = {
	src : "./_grunt-configs/*.js", // This directory. Has all the Grunt tasks grouped into specific js files

	srcDir  : './assets/src',  // <%=config.srcDir%>
	distDir : './assets/dist', // <%=config.distDir%>
	tempDir : './assets/temp', // <%=config.tempDir%>


	// CSS-related Grunt vars
	css : {
		scssDir  : '<%=config.srcDir%>/scss', // <%=config.css.scssDir%>
		distDir  : '<%=config.distDir%>/css', // <%=config.css.distDir%>

		// Renaming this changes the name of the generated CSS file
		// Make sure you update your template file
		distFile : 'kickoff', // <%=config.css.distFile%>

		// We are supporting the last 2 browsers, any browsers with >5% market share,
		// and ensuring we support IE8+ with prefixes
		autoprefixer : ['> 5%', 'last 2 versions', 'firefox > 3.6', 'ie > 7'] // <%=config.css.autoprefixer%>
	},


	// Javascript-related Grunt vars
	js: {
		srcFile: '<%=config.srcDir%>/js/script.js',// <%=config.js.srcFile%>

		distDir: '<%=config.distDir%>/js/', // <%=config.js.distDir%>

		// Renaming this changes the name of the generated JS file
		// Make sure you update your template file
		distFile: 'script.js' // <%=config.js.distFile%>
	},


	// Image-related Grunt vars
	img : {
		srcDir       : '<%=config.srcDir%>/img',      // <%=config.img.srcDir%>
		distDir      : '<%=config.distDir%>/img',     // <%=config.img.distDir%>
		grunticonDir : '<%=config.srcDir%>/grunticon' // <%=config.img.grunticonDir%>
	},


	// Testing-related Grunt vars
	// Add any other test vars in here
	testing: {

		// Used by Photobox at the moment
		// http://trykickoff.github.io/learn/grunt.html#task-photobox
		visual : {
			sizes: [ '600', '1000', '1200' ], // <%=config.testing.visual.sizes%>

			// Change these urls to test your app
			// <%=config.testing.visual.urls%>
			urls : [
				'http://localhost:3000'
			]
		},

		validationDir  : './testing',  // <%=config.tests.validationDir%>
	}
};

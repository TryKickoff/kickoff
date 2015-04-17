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
		distFile : 'kickoff', // <%=config.css.srcFile%>

		// We are supporting the last 2 browsers, any browsers with >5% market share,
		// and ensuring we support IE8+ with prefixes
		autoprefixer : ['> 5%', 'last 2 versions', 'firefox > 3.6', 'ie > 7'] // <%=config.css.autoprefixer%>
	},


	// Javascript-related Grunt vars
	js : {
		distDir  : '<%=config.distDir%>/js/', // <%=config.js.distDir%>

		// Renaming this changes the name of the generated JS file
		// Make sure you update your template file
		distFile : 'script.js', // <%=config.js.distFile%>

		// The files in this array will be concatinated and minified by our build
		// Remove any files that you don't want, & add any that you need

		// <%=config.js.fileList%>
		fileList : [
			// if you would like to remove jQuery from your concatenated JS, comment out the line below
			'./node_modules/jquery/dist/jquery.js',

			// if you would like some basic JS shims (when not using jQuery),
			// uncomment the line below to compile Shimly output
			//'<%=config.srcDir%>/js/helpers/shims.js',

			'<%=config.srcDir%>/js/helpers/console.js',
			'./node_modules/trak.js/dist/trak.js',
			'./node_modules/swiftclick/js/libs/swiftclick.js',
			'./node_modules/cookies-js/dist/cookies.js',

			'<%=config.srcDir%>/js/script.js'
		]
	},


	// Image-related Grunt vars
	img : {
		dir          : '<%=config.srcDir%>/img',      // <%=config.img.dir%>
		grunticonDir : '<%=config.srcDir%>/grunticon' // <%=config.img.grunticonDir%>
	},


	// Testing-related Grunt vars
	// Add any other test vars in here
	testing: {

		// Used by Photobox at the moment
		// http://tmwagency.github.io/kickoff/learn/grunt.html#task-photobox
		visual : {
			sizes: [ '600', '1000', '1200' ], // <%=config.testing.visual.sizes%>

			// <%=config.testing.visual.urls%>
			urls : [
				'http://localhost:3000',
				'http://localhost:3000/_docs/',
				'http://localhost:3000/_docs/styleguide.html'
			]
		}
	}
};

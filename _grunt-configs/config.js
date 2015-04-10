/**
 * Grunt global vars
 * Many of the Grunt tasks use these vars
 */

module.exports = {
	src : "./_grunt-configs/*.js",

	assetsDir : './assets',                   // <%=config.assetsDir%>
	distDir   : '<%=config.assetsDir%>/dist', // <%=config.distDir%>

	css : {
		srcFile : 'kickoff',                    // <%=config.css.srcFile%>
		scssDir : '<%=config.assetsDir%>/scss', // <%=config.css.scssDir%>
		distDir : '<%=config.distDir%>/css'     // <%=config.css.distDir%>
	},

	js : {
		distDir  : '<%=config.distDir%>/js/',   // <%=config.js.distDir%>
		distFile : 'app.min.js',                // <%=config.js.distFile%>

		// <%=config.js.fileList%>
		fileList : [
			// if you would like to remove jQuery from your concatenated JS, comment out the line below
			'bower_modules/jquery/dist/jquery.js',

			// if you would like some basic JS shims (when not using jQuery),
			// uncomment the line below to compile Shimly output
			//'js/helpers/shims.js',

			'<%=config.assetsDir%>/js/helpers/console.js',
			'bower_modules/trak/dist/trak.js',
			'bower_modules/swiftclick/js/libs/swiftclick.js',
			'bower_modules/cookies-js/dist/cookies.js',

			'<%=config.assetsDir%>/js/script.js'
		]
	},

	img : {
		dir : '<%=config.assetsDir%>/img' // <%=config.img.dir%>
	},

	testing: {
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

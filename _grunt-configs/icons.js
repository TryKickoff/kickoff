module.exports.tasks = {
	/**
	 * Grunticon
	 * https://github.com/filamentgroup/grunticon
	 */
	grunticon: {
		myIcons: {
			files: [{
				expand: true,
				cwd   : '<%=config.img.dir%>/src-min',
				src   : ['*.svg', '*.png'],
				dest  : '<%=config.img.dir%>/icons'
			}],
			options: {
				// customselectors: {
				// 	"arrow": [".icon-arrow:before"]
				// }
			}
		}
	},


	/**
	 * SVGmin
	 * https://github.com/sindresorhus/grunt-svgmin
	 */
	svgmin: {
		options: {
			plugins: [
				{ removeViewBox: false },
				{ removeUselessStrokeAndFill: false }
			]
		},
		dist: {
			files: [{
				expand : true,
				cwd    : '<%=config.img.dir%>/src',
				src    : ['**/*.svg'],
				dest   : '<%=config.img.dir%>/src-min',
				ext    : '.svg'
			}]
		}
	}
};

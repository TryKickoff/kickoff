module.exports.tasks = {
	/**
	 * Grunticon
	 * https://github.com/filamentgroup/grunticon
	 */
	grunticon: {
		myIcons: {
			files: [{
				expand: true,
				cwd   : 'img/src-min',
				src   : ['*.svg', '*.png'],
				dest  : 'img/icons'
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
				cwd    : 'img/src',
				src    : ['**/*.svg'],
				dest   : 'img/src-min',
				ext    : '.svg'
			}]
		}
	}
};

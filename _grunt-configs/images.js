var mozjpeg = require('imagemin-mozjpeg');
var pngquant = require('imagemin-pngquant');
var gifsicle = require('imagemin-gifsicle');

module.exports.tasks = {

	/**
	 * grunt-contrib-imagemin
	 * https://github.com/gruntjs/grunt-contrib-imagemin
	 * Minify PNG, SVG, gif & JPEG images
	 */
	imagemin: {
		grunticon: {
			options: {
				optimizationLevel: 3,
				progressive : true,
				svgoPlugins: [
					{ removeViewBox: false },
					{ removeUselessStrokeAndFill: false }
				],
				use: [
					mozjpeg(),
					pngquant(),
					gifsicle()
				]
			},
			files: [{
				expand: true,
				cwd: '<%=config.img.dir%>/grunticon/source',
				src: ['**/*.{svg,png,jpg,gif}'],
				dest: '<%=config.img.dir%>/grunticon/compressed'
			}]
		},

		others: {
			files: [{
				expand: true,
				cwd: '<%=config.img.dir%>/',
				src: ['**/*.{svg,png,jpg,gif}', '!<%=config.img.dir%>/grunticon/**/*.{svg,png,jpg,gif}'],
				dest: '<%=config.assetsDir%>/dist/img'
			}]
		}
	},


	/**
	 * Grunticon
	 * https://github.com/filamentgroup/grunticon
	 */
	grunticon: {
		myIcons: {
			files: [{
				expand: true,
				cwd   : '<%=config.img.dir%>/grunticon/compressed',
				src   : ['*.{svg,png,jpg,gif}'],
				dest  : '<%=config.distDir%>/img/icons'
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
				cwd    : '<%=config.img.dir%>/grunticon/source',
				src    : ['**/*.svg'],
				dest   : '<%=config.img.dir%>/grunticon/compressed',
				ext    : '.svg'
			}]
		}
	}
};

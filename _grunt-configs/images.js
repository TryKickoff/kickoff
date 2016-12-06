var pngquant = require('imagemin-pngquant');
var svgo = require('imagemin-svgo');

module.exports.tasks = {

	/**
	 * grunt-contrib-imagemin
	 * https://github.com/gruntjs/grunt-contrib-imagemin
	 * Minify PNG, SVG, gif & JPEG images
	 */
	imagemin: {
		images: {
			options: {
				optimizationLevel: 3,
				progressive: true,
				svgoPlugins: [
					{ cleanupAttrs: true },
					{ removeComments: true },
					{ removeDoctype: true },
					{ removeMetadata: true },
					{ removeXMLProcInst: true },
					{ removeEditorsNSData: true },
					{ cleanupNumericValues: true },
					{ collapseGroups: true },
					{ sortAttrs: true },
					{ removeViewBox: false },
					{ removeUselessStrokeAndFill: false },
					{ removeEmptyAttrs: false },
				],
				use: [
					pngquant({ quality: '40-50', speed: 4 }),
					svgo(),
				],
			},

			files: [{
				expand: true,
				cwd: '<%=config.img.srcDir%>/',
				src: ['**/*.*'],
				dest: '<%=config.img.distDir%>',
			}],
		},
	},


	/**
     * grunt-svgstore
     * https://github.com/FWeinb/grunt-svgstore
     * Merge SVGs from a folder.
     */
	svgstore: {
	    options: {
	        prefix: 'icon-',
	        svg: { // will add and overide the the default xmlns="http://www.w3.org/2000/svg" attribute to the resulting SVG
	            viewBox: '0 0 100 100',
	            xmlns: 'http://www.w3.org/2000/svg'
	        }
	    },
	    default: {
	        files: {
	            '<%=config.img.distDir%>/icons.svg': ['<%=config.img.distDir%>/icons/*.svg'],
	        },
	    }
	}
};

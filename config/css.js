module.exports.tasks = {

	/**
	 * Sass compilation using grunt-sass
	 * https://github.com/gruntjs/grunt-contrib-sass
	 * Includes kickoff.scss and kickoff-old-ie.scss by default
	 * Also creates source maps
	 */
	sass: {
		kickoff: {
			options: {
				unixNewlines: true,
				style: 'expanded',
				lineNumbers: false,
				debugInfo : false,
				precision : 8,
				sourcemap: true
			},
			files: {
				'css/temp/<%=config.scss.cssFile%>.css'       : 'scss/<%=config.scss.cssFile%>.scss',
				'css/temp/<%=config.scss.cssFile%>-old-ie.css': 'scss/<%=config.scss.cssFile%>-old-ie.scss'
			}
		},
		styleguide: {
			options: {
				unixNewlines: true,
				style: 'compact',
				precision : 8,
				sourcemap: true
			},
			files: {
				'css/styleguide.css': 'scss/styleguide.scss'
			}
		}
	},


	/**
	 * Autoprefixer
	 * https://github.com/nDmitry/grunt-autoprefixer
	 * https://github.com/ai/autoprefixer
	 * Auto prefixes your CSS using caniuse data
	 */
	autoprefixer: {
		options: {
			// We are supporting the last 2 browsers, any browsers with >1% market share,
			// and ensuring we support IE8+ with prefixes
			browsers: ['> 5%', 'last 4 versions', 'firefox > 3.6', 'ie > 7'],
			map: true
		},

		kickoff: {
			expand: true,
			flatten: true,
			src: 'css/temp/*.css',
			dest: 'css/'
		},

		styleguide : {
			src: 'css/styleguide.css',
			dest: 'css/styleguide.css'
		}
	},


	/**
	 * CSSO
	 * https://github.com/t32k/grunt-csso
	 * Minify CSS files with CSSO
	 */
	csso: {
		dist: {
			options: {
				restructure: false //turns structural optimisations off as can mess up fallbacks http://bem.info/tools/optimizers/csso/description/
			},
			files: {
				'css/<%=config.scss.cssFile%>.css'       : 'css/<%=config.scss.cssFile%>.css',
				'css/<%=config.scss.cssFile%>-old-ie.css': 'css/<%=config.scss.cssFile%>-old-ie.css'
			},

		}
	}

};

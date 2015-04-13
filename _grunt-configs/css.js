module.exports.tasks = {

	/**
	 * Sass compilation using grunt-sass
	 * https://github.com/sindresorhus/grunt-sass
	 * Includes kickoff.scss and kickoff-old-ie.scss by default
	 */
	sass: {
		kickoff: {
			options: {
				outputStyle: 'nested',
				precision : 10,
				sourceMap : true
			},
			files: {
				'<%=config.tempDir%>/css/<%=config.css.distFile%>.css'       : '<%=config.css.scssDir%>/kickoff.scss',
				// Remove the line below if you are supporting <IE9
				'<%=config.tempDir%>/css/<%=config.css.distFile%>-old-ie.css': '<%=config.css.scssDir%>/kickoff-old-ie.scss'
			}
		},

		styleguide: {
			options: {
				outputStyle: 'compressed',
				precision : 10,
			},
			files: {
				'<%=config.tempDir%>/css/styleguide.css' : '<%=config.css.scssDir%>/styleguide.scss'
			}
		}
	},


	/**
	 * Autoprefixer
	 * https://github.com/nDmitry/grunt-autoprefixer
	 * https://github.com/postcss/autoprefixer
	 * Auto prefixes your CSS using caniuse data
	 */
	autoprefixer: {
		options: {
			browsers: '<%=config.css.autoprefixer%>',
			map: true
		},

		kickoff: {
			expand: true,
			flatten: true,
			src: '<%=config.tempDir%>/css/*.css',
			dest: '<%=config.css.distDir%>/'
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
				'<%=config.css.distDir%>/<%=config.css.distFile%>.css'       : '<%=config.css.distDir%>/<%=config.css.distFile%>.css',
				// Remove the line below if you are supporting <IE9
				'<%=config.css.distDir%>/<%=config.css.distFile%>-old-ie.css': '<%=config.css.distDir%>/<%=config.css.distFile%>-old-ie.css'
			},
		}
	}
};

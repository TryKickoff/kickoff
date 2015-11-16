module.exports.tasks = {

	/**
	 * Clean
	 * https://github.com/gruntjs/grunt-contrib-clean
	 * Clean some files
	 */
	clean: {
		icons   : ['<%=config.distDir%>/img/icons', '<%=config.tempDir%>/icons'],
		tempCSS : ['<%=config.tempDir%>/css']
	},


	/**
	 * Copy files
	 * https://github.com/gruntjs/grunt-contrib-copy
	 */
	copy: {
		jsStandalone: {
			files: [{
				expand: true,
				cwd: '<%=config.srcDir%>/js/standalone',
				src: ['./**/*.*'],
				dest: '<%=config.js.distDir%>/standalone'
			}]
		}
	},

	filesizegzip: {
		js: {
			src: '<%=config.js.distDir%><%=config.js.distFile%>'
		},

		css: {
			src: '<%=config.css.distDir%>/<%=config.css.distFile%>.css'
		}
	},
};

module.exports.tasks = {

	/**
	 * Clean
	 * https://github.com/gruntjs/grunt-contrib-clean
	 * Clean some files
	 */
	clean: {
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


	/**
	 * grunt-filesizegzip
	 * https://github.com/mrmartineau/grunt-filesizegzip
	 * Output the normal & gzipped file size of a given file
	 */
	filesizegzip: {
		js: {
			src: '<%=config.js.distDir%><%=config.js.distFile%>'
		},

		css: {
			src: '<%=config.css.distDir%>/<%=config.css.distFile%>.css'
		}
	},
};

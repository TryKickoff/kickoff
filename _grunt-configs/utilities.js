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
		modernizr: {
			src: '<%=config.srcDir%>/js/libs/modernizr.min.js',
			dest: '<%=config.distDir%>/js/libs/modernizr.min.js'
		},
	},


	/**
	 * Chotto
	 * Checks for the existence of files and halts the Grunt build if they don't exist
	 * https://www.npmjs.com/package/chotto
	 */
	chotto : {
		js : {
			filePaths: '<%=config.js.fileList%>'
		}
	}
};

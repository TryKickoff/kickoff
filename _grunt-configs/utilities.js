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
	 * Shell
	 * https://github.com/sindresorhus/grunt-shell
	 * Run shell commands
	 */
	shell: {
		bowerinstall: {
			command: 'bower install'
		}
	},


	dofilesexist : {
		js : "<%=config.js.fileList%>"
	}
};

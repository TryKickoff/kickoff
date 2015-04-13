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

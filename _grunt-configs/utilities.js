module.exports.tasks = {

	/**
	 * Clean
	 * https://github.com/gruntjs/grunt-contrib-clean
	 * Clean some files
	 */
	clean: {
		icons: ['img/icons']
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


	/**
	 * Grunt Photobox
	 * https://github.com/stefanjudis/grunt-photoBox
	 * Visual regression testing tool
	 */
	photobox: {
		task: {
			options: {
			screenSizes : '<%=config.testing.visual.sizes%>',
			urls        : '<%=config.testing.visual.urls%>'
			}
		}
	},

	dofilesexist : {
		js : "<%=config.js.fileList%>"
	}
};

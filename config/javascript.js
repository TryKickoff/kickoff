module.exports.tasks = {

	/**
	 * Uglify
	 * https://github.com/gruntjs/grunt-contrib-uglify
	 * Minifies and concatinates your JS
	 * Also creates source maps
	 */
	uglify: {
		options: {
			mangle: true, // mangle: Turn on or off mangling
			beautify: false, // beautify: beautify your code for debugging/troubleshooting purposes
			compress: false,
			// report: 'gzip', // report: Show file size report
			sourceMap: '<%=config.js.distDir%><%=config.js.distFile%>.map',
			sourceMappingURL: '/<%=config.js.distFile%>.map',
		},
		js: {
			src: '<%=config.js.fileList%>',
			dest: '<%=config.js.distDir%><%=config.js.distFile%>'
		}
	},


	/**
	 * JSHint
	 * https://github.com/gruntjs/grunt-contrib-jshint
	 * Manage the options inside .jshintrc file
	 */
	jshint: {
		all: '<%=config.js.fileList%>',
		options: {
			jshintrc: '.jshintrc'
		}
	},


	/**
	 * JSCS
	 * https://github.com/dsheiko/grunt-jscs
	 * Manage the options inside .jscs.json file
	 */
	jscs: {
		src: '<%=config.js.fileList%>',
		options: {
			config: ".jscs.json"
		}
	}

};

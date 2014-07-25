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
			jshintrc: 'config/.jshintrc'
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
			config: "config/.jscs.json"
		}
	},

	/**
	 * Custom jQuery builder
	 * Check build numbers at jquery.com
	 */
	jquery: {
		build: {
			options: {
				prefix: "jquery-",
				minify: true
			},
			output: "js/libs/jquery",
			versions: {
				// Add items to the below arrays to remove them from the build
				// Remove everything we don't need from 2.x versions
				//"2.0.3": [ "deprecated", "dimensions", "offset", "wrap"],

				// We can't remove sizzle from 1.x versions, so let's not specify it
				"1.10.2": [ "deprecated"]
			}
		}
	}

};

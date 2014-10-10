module.exports.tasks = {

	/**
	 * Uglify
	 * https://github.com/gruntjs/grunt-contrib-uglify
	 * Minifies and concatinates your JS
	 * Also creates source maps
	 */
	uglify: {
		options: {
			mangle: { // set to false (replace this object) to turn off mangling
				except: ['jQuery'] // https://github.com/gruntjs/grunt-contrib-uglify#reserved-identifiers
			},
			compress: { // set to false (replace this object) to turn off compression
				drop_console: false
			},

			beautify: false, // beautify: beautify your code for debugging/troubleshooting purposes
			// report: 'gzip', // report: Show file size report
			sourceMap: '<%=config.js.distDir%><%=config.js.distFile%>.map',
			sourceMappingURL: '/<%=config.js.distFile%>.map',
		},
		js: {
			nonull: true,
			src: '<%=config.js.fileList%>',
			dest: '<%=config.js.distDir%><%=config.js.distFile%>'
		}
	},


	/**
	 * Shimly
	 * https://github.com/nicbell/shimly
	 * Load in a base set of JS shims for use in a project
	 */
	shimly: {
		// things you would like to shim (an array of items from the list above)
		shim: ['Array.forEach', 'Array.filter', 'Array.map', 'Function.bind', 'EventListener'],

		// output location (relative to your grunt.js file location)
		dest: 'js/helpers/shims.js',

		// minify the output (true or false)
		minify: false
	},


	/**
	 * JSHint
	 * https://github.com/gruntjs/grunt-contrib-jshint
	 * Manage the options inside .jshintrc file
	 */
	jshint: {
		options: {
			jshintrc: '.jshintrc'
		},
		project: '<%=config.js.fileList%>',
		all: ['js/**/*.js', '!js/dist/*.js', '!js/**/*.min.js']
	},


	/**
	 * Custom jQuery builder
	 * Check build numbers at jquery.com
	 */
	jquery: {
		build: {
			options: {
				prefix: "jquery-",
				minify: false
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

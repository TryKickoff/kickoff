module.exports.tasks={
    javascript : {
      // <%=javascript.distDir%>
      distDir  : 'js/dist/',

      // <%=javascript.distFile%>
      distFile : 'app.min.js',

      // <%=javascript.fileList%>
      fileList : [
        'js/helpers/console.js',
        'js/script.js'
      ]
    },

    watch:{
      js: {
        files: ['<%=javascript.fileList%>', 'Gruntfile.js'],
        tasks: ['uglify']
      }
    },

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
        sourceMap: '<%=javascript.distDir%><%=javascript.distFile%>.map',
        sourceMappingURL: '/<%=javascript.distFile%>.map',
      },
      js: {
        src: '<%=javascript.fileList%>',
        dest: '<%=javascript.distDir%><%=javascript.distFile%>'
      }
    }
};

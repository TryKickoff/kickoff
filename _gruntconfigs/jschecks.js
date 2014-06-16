module.exports.tasks = {
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
}

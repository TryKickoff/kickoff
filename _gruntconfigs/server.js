module.exports.tasks = {
  /**
   * Connect
   * https://github.com/gruntjs/grunt-contrib-connect
   * Start a static web server
   */
  connect: {
    server: {
      site: {
        options: {
          open: true,
          livereload: true
        }
      },
      styleguide: {
        options: {
          base: '_docs/styleguide.html'
          open: true,
          livereload: true
        }
      }
    }
  }
}

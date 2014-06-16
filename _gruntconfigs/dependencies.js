module.exports.tasks = {
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
}

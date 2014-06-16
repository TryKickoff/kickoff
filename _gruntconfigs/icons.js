module.exports.tasks = {
  watch:{
    grunticon : {
      files: ['img/src/*.svg', 'img/src/*.png'],
      tasks: ['svgmin', 'grunticon']
    }
  },


  /**
   * Grunticon
   * https://github.com/filamentgroup/grunticon
   */
  grunticon: {
    myIcons: {
      files: [{
        expand: true,
        cwd   : 'img/src-min',
        src   : ['*.svg', '*.png'],
        dest  : 'img/icons'
      }],
      options: {
        // customselectors: {
        // 	"*": [".icon-$1:before"]
        // }
      }
    }
  },


  /**
   * SVGmin
   * https://github.com/sindresorhus/grunt-svgmin
   */
  svgmin: {
    options: {
      plugins: [
        { removeViewBox: false },
        { removeUselessStrokeAndFill: false }
      ]
    },
    dist: {                     // Target
      files: [{               // Dictionary of files
        expand: true,       // Enable dynamic expansion.
        cwd: 'img/src',     // Src matches are relative to this path.
        src: ['**/*.svg'],  // Actual pattern(s) to match.
        dest: 'img/src-min',       // Destination path prefix.
        ext: '.svg'     // Dest filepaths will have this extension.
        // ie: optimise img/src/branding/logo.svg and store it in img/branding/logo.min.svg
      }]
    }
  }
}

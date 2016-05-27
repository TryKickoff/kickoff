/**
 * Gulp tasks:
 * - gulp                    : The default task. Alias for `webpack-dev-server`
                               and 'open-browser' tasks below
 * - gulp compile            : compile scss, js, images
 * - gulp compile-release    : compile scss, js, images and minify
 * - gulp cleanup            : cleans up some erroneous js files generated on build
                             : for /standalone and the styleguide
 * - gulp serve              : run webpack dev server (with hot module reloading)
 * - gulp open-browser       : opens a browser to trykickoff.com
 */

const gulpTaskDir = './_gulp-tasks';
const fs = require('fs');
const tasks = fs.readdirSync(gulpTaskDir);

// loop through _gulp-tasks and require each
// any tasks you add will be included automatically
tasks.forEach((task) => {
  // only add .js files
  if (task.match(/\.js$/)) {
    require(gulpTaskDir + '/' + task);
  }
});

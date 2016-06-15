/**
 * Gulp tasks:
 * - gulp                    : The default task. Alias for `webpack-dev-server`
                               and 'open-browser' tasks below
 * - gulp compile            : chain which compiles js, processes scss, minifies images
 * - gulp compile-release    : chain which compiles js, processes scss, minifies images
                             : with some extra js options
 * - gulp clean              : deletes the assets/dist folder
 * - gulp copy               : moves standalone files to dist folder
 * - gulp css                : processes scss both for kickoff and styleguide
 * - gulp image              : minifies images
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

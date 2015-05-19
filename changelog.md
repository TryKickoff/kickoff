# Kickoff changelog
All latest changes are documented on our site at http://trykickoff.github.io/

## Version 5.0.0
Date 19/05/2015

This release focuses on improving the UX of the framework. Files are now in more intuitive places and grunt configs are clearer as well.

* Completely restructured the static files directories.
	- Moved all CSS, images & js into the `./assets` directory 
		+ The `./assets/src` directory for source files (SCSS, javascript, images & grunticon)
		+ The `./assets/dist` directory for all compiled files (CSS, images & JS) is at `./assets/dist`
		+ Grunticon's folders are now in more intuitive places. Uncompressed SVGs, jpgs & PNGs should be saved to `./assets/src/grunticon/source`. They will then be compressed to `./assets/temp/icons` before Grunticon does it's thing and compiles them to `./assets/dist/img/icons`.
* Grunt & build tasks - Much has been streamlined.
	- Connect has been removed & BrowserSync is now the only way to serve a static site & reload changes. Run `grunt serve` to test this.
	- Our config variables are now in their own file at `./_grunt-configs/config.js` & have been made more intuitive
	- Images now are automatically compressed by [grunt-contrib-imagemin](https://github.com/gruntjs/grunt-contrib-imagemin) & are delivered to `./assets/dist/img`
* Sass updates
	- Many style rules have been removed with a primary focus on making the framework leaner & more useful. 
* The styleguide has had a massive improvement & the start page has been removed. The styleguide has been moved to `.styleguide/index.html`
* Running `npm run kickoff` now installs all package dependencies, including Grunt if you don't have it, and is a great way to start a Kickoff project
* Removed 404
* Removed `./js/helpers.js` as redundant. Have provided [some info](https://github.com/trykickoff/kickoff/tree/master/assets/js/helpers) if you need those files again.
* Added HTML Validation check to the checks performed when running `grunt checks` task.
	- This outputs the results of the check to your terminal as well as to a JSON file located at `./testing/validation/validation-results.json`

## Version 4.1.0 - Libsass
18/05/2015

As [node-sass](https://github.com/sass/node-sass) has been updated to v2, we can now use [grunt-sass](https://github.com/sindresorhus/grunt-sass) with Kickoff. It is faster and removes the dependency on Ruby from Kickoff.

## Version 4.0.4 - Media query bugfix
18/02/2015

Fixes a strange bug with our [media-query mixins](https://github.com/trykickoff/kickoff/blob/master/scss/mixins/_responsive.scss). Apparently `em`-based media-queries do not calculate correctly if the font-size differs from the user's default — usually 16px. At this point, we have hard-coded 16 into our media-query mixins until we can find a better solution.

## Version 4.0.3 - scss linting
13/11/2014

scss linting has been added which meant refactoring many of Kickoff's `*.scss` files. Some minor changes to `_tables.scss` were also needed.

To try the linter, you can use the Sublime Text plugin or through grunt using `grunt scsslint`. **We did our best to remove all warning and errors, that will need to be done in future releases**

## Version 4.0.2
11/11/2014

Added a new Grunt variable for the images directory. Usage: `<%=config.img.dir%>`

## Version 4.0.1
26/10/2014

Darn! missed something in the 4.0.0 release.

Removed `.btn--link` and changed `.btn-close` to `.btnClose`

## Version 4.0.0
26/10/2014

### Typography
 * Font sizes use a modular scale throughout (but can easily be overridden)
 * Sass vars fonts etc are shorter and more intuitive to use - hopefully they'll be easier to remember when developing.
 * Added simple responsive type to reduce the font size on smaller viewports. Modify `$font-size-base-narrow` in `scss/_variables.css` to change this.

### Sass
* All of the CSS3 mixins have been removed because we use [Autoprefixer](https://github.com/nDmitry/grunt-autoprefixer)
* **Global Sass vars** (`_variables.css`)
 * Breakpoint vars have been shortened from `$breakpoint-*` to `$bp-*`
 * Some of the grid vars have been moved to the more generic, `$layout-*` because they are not explicitly to do with the grid.
 * Other minor tweaks have also been made, so please read through this file to understand them.

### Javascript
* We have removed many of the old 'helper' files and plugins, instead opting for dependencies found on the [Bower](http://bower.io) registry.
* Bower dependencies are installed to `bower_modules`. To change this, edit the `.bowerrc` file. The default dependencies that we suggest are [Swiftclick](https://github.com/tmwagency/swiftclick), [Trak.js](https://github.com/tmwagency/trak.js), [jQuery](https://github.com/jquery/jquery/) and [Cookies](https://github.com/ScottHamper/Cookies/)
* [Shimly](http://github.com/nicbell/shimly), a grunt plugin by [Nic Bell](http://github.com/nicbell) is being used to generate a file of javascript shims. Have a look at `_grunt-configs/javascript.js` to find the Shimly settings.

### Grunt & tooling
* [Livereload](http://livereload.com/) & [grunt-contrib-connect](https://github.com/grunt-contrib-connect) have been dropped (but still included) in favour of [BrowserSync](http://www.browsersync.io/docs/grunt/) (which handles both without a browser extension) for our live CSS updating and simple server needs. Running `grunt serve` will fire up a simple server and watch for changes, with the added benefits of [BrowserSync's](http://www.browsersync.io/docs/grunt/) many features.
* All grunt tasks have been moved into grouped separate files in the `_grunt-configs` folder. For example, `_grunt-configs/css.js` contains all the grunt tasks relating to CSS: Sass, [Autoprefixer](https://github.com/nDmitry/grunt-autoprefixer) & [CSSO](https://github.com/t32k/grunt-csso) (for minifying CSS. The `_grunt-configs/javascript.js` file contains the uglify (for concatenating and minfying js), shimly (for generating a javascript shims file), jshint and jQuery (for generating a custom jQuery build).
* Extra grunt tasks have been added to help development. For example, running `grunt icons` will rebuild all the icons generated by Grunticon. `grunt start` will bring up a browser window with our 'getting started' guide, it also contains the simple styleguide for your project.
* We have integrated a simple visual regression testing task, [grunt-photobox](https://github.com/stefanjudis/grunt-photoBox), to help prevent deployment of broken code. See [this](http://trykickoff.github.io/learn/grunt.html#task-photobox) for more info

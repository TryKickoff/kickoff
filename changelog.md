# Kickoff changelog
All latest changes are documented on our site at http://trykickoff.com

## [7.0.0] - 21/05/2016

### Javascript
- Updated js to use ES6/ES2015 syntax to be transpiled using Babel (babelify Browserify transform)
- Switched from jshint & jscs to [ESLint](http://eslint.org). ESLint config is custom but heavily based on [Airbnb's ESLint style guides](https://github.com/airbnb/javascript).
- Trak.js and Swiftclick not installed by default anymore
- Included [double-dollar](https://github.com/mrmartineau/double-dollar) to make life a little easier when looping over DOM elements
- Polyfill.io now used instead of shimly for all browser shims [[9eb6a83](https://github.com/TryKickoff/kickoff/commit/9eb6a834f12a2e885e78ae4fa30f6aadb2e8a957)]

### Scss
- Type vars are now in `$type` Sass map and reduced the number of items in the list.
- Replaced the existing grid with a flexbox-based grid with fallbacks for browsers that do not support flexbox. Learn about the grid [here](http://trykickoff.com/learn/grid.html)
- Removed `$bp-single-col` and moved all other breakpoint variables into a Sass map. The `respond-*` mixins were also improved to allow for different types of arguments, e.g. `@include respond-min(mid) {...}` or `@include respond-min(500) {...}` or `@include respond-min(400px) {...}`
- Updated to Nomalize@4.0.0
- Fixed an IE Print bug [[111c0ce](https://github.com/TryKickoff/kickoff/commit/111c0cef5b343218a804474eacff8595d27c8708)]
- Add hypehenate helper class [[c09b3d2](https://github.com/TryKickoff/kickoff/commit/c09b3d2cd0590fca24017c50d726ff5c848cfb9c)]

### Tooling
- Added [Commitizen](https://github.com/commitizen/cz-cli) to help enforce consistent git commits. 
- Run `npm run info` to show information about all our npm run scripts. [[413b191](https://github.com/TryKickoff/kickoff/commit/413b19100318e666192db9ee17583e994abf9045)]
- `grunt checks` task renamed to `grunt test`
- Updated to latest version of all npm dependencies that comply with our browser support requirements
- Updated to grunt@1.0.1
- Removed Grunticon. Currently there is no icon replacement but we will provide instructions on how to add a better system soon
- Update .editorconfig, .gitattributes & .gitignore

### HTML
- Changed `#mainContent` ID to be `#main`
- Styleguide had some minor updates

### Browser Support
- Dropped support for Internet Explorer 8. **Expect Kickoff to drop support for IE 9-11 within 6-12 months.** [[e70ab08](https://github.com/TryKickoff/kickoff/commit/e70ab083fb902897c773b0b85053e19664f454b0)]

### Misc
- Added a code of conduct [[0a276de](https://github.com/TryKickoff/kickoff/commit/0a276debaea760608470283a6036f4fb75c40d54)]


## [6.0.0] - 20/11/2015

### Changed

#### Javascript
- Switched to use Browserify as the way to bundle all our javascript. If you would like to continue using the old style, please use either our [Yeoman generator](http://trykickoff.com/learn/yeoman.html) or the Grunt config from [Kickoff v5.0.0](https://github.com/TryKickoff/kickoff/tree/5.0.0). See the discussion about the change [here](https://github.com/TryKickoff/kickoff/issues/53).

#### CSS/Scss
- Ref #53 - Move all components from `scss/partials/components/*.scss` to `scss/components`
- The [media object](https://github.com/TryKickoff/kickoff/blob/master/assets/src/scss/components/_media-object.scss) has been updated to ensure that it doesn't stack it's columns on skinny viewports by default but by the use of modifier classes. See the code [here](https://github.com/TryKickoff/kickoff/blob/master/assets/src/scss/components/_media-object.scss)
- [Block grids](https://github.com/TryKickoff/kickoff/blob/master/assets/src/scss/components/_block.scss) have had many improvements thanks to @nicbell. There are now different modifier classes for each breakpoint, for example: `<ul class="l-blockGrid l-blockGrid--4up l-blockGrid--2up--narrow l-blockGrid--6up--wide">`
- The custom form elements have been refactored & separated into their own files so that individual items can be imported instead of all of them.
  - the custom select element now allows `:focus` styles
  - custom checkboxes don't depend on SVGs and a tick variant has been added
- Create new `_links.scss` and remove relevant code from `_typography.scss`
- move (un)ordered & definition lists into _lists.scss
- Simplified tables – now has sensible default values rather than classes as they are usually used as content

#### Tooling
- add [grunt-filesizegzip](https://github.com/mrmartineau/grunt-filesizegzip) to show file size and gzipped file size on save
- Removed a few rarely-used grunt plugins
  - Grunt Photobox


## [5.0.0] - Date 19/05/2015

This release focuses on improving the UX of the framework. Files are now in more intuitive places and grunt configs are clearer as well.

- Completely restructured the static files directories.
	- Moved all CSS, images & js into the `./assets` directory 
		+ The `./assets/src` directory for source files (SCSS, javascript, images & grunticon)
		+ The `./assets/dist` directory for all compiled files (CSS, images & JS) is at `./assets/dist`
		+ Grunticon's folders are now in more intuitive places. Uncompressed SVGs, jpgs & PNGs should be saved to `./assets/src/grunticon/source`. They will then be compressed to `./assets/temp/icons` before Grunticon does it's thing and compiles them to `./assets/dist/img/icons`.
- Grunt & build tasks - Much has been streamlined.
	- Connect has been removed & BrowserSync is now the only way to serve a static site & reload changes. Run `grunt serve` to test this.
	- Our config variables are now in their own file at `./_grunt-configs/config.js` & have been made more intuitive
	- Images now are automatically compressed by [grunt-contrib-imagemin](https://github.com/gruntjs/grunt-contrib-imagemin) & are delivered to `./assets/dist/img`
- Sass updates
	- Many style rules have been removed with a primary focus on making the framework leaner & more useful. 
- The styleguide has had a massive improvement & the start page has been removed. The styleguide has been moved to `.styleguide/index.html`
- Running `npm run kickoff` now installs all package dependencies, including Grunt if you don't have it, and is a great way to start a Kickoff project
- Removed 404
- Removed `./js/helpers.js` as redundant. Have provided [some info](https://github.com/trykickoff/kickoff/tree/master/assets/js/helpers) if you need those files again.
- Added HTML Validation check to the checks performed when running `grunt checks` task.
	- This outputs the results of the check to your terminal as well as to a JSON file located at `./testing/validation/validation-results.json`

## [4.1.0] - Libsass - 18/05/2015

As [node-sass](https://github.com/sass/node-sass) has been updated to v2, we can now use [grunt-sass](https://github.com/sindresorhus/grunt-sass) with Kickoff. It is faster and removes the dependency on Ruby from Kickoff.

## [4.0.4] - Media query bugfix - 18/02/2015

Fixes a strange bug with our [media-query mixins](https://github.com/trykickoff/kickoff/blob/master/scss/mixins/_responsive.scss). Apparently `em`-based media-queries do not calculate correctly if the font-size differs from the user's default — usually 16px. At this point, we have hard-coded 16 into our media-query mixins until we can find a better solution.

## [4.0.3] - scss linting - 13/11/2014

scss linting has been added which meant refactoring many of Kickoff's `*.scss` files. Some minor changes to `_tables.scss` were also needed.

To try the linter, you can use the Sublime Text plugin or through grunt using `grunt scsslint`. **We did our best to remove all warning and errors, that will need to be done in future releases**

## [4.0.2] - 11/11/2014

Added a new Grunt variable for the images directory. Usage: `<%=config.img.dir%>`

## [4.0.1] - 26/10/2014

Darn! missed something in the 4.0.0 release.

Removed `.btn--link` and changed `.btn-close` to `.btnClose`

## [4.0.0] - 26/10/2014

### Typography
 - Font sizes use a modular scale throughout (but can easily be overridden)
 - Sass vars fonts etc are shorter and more intuitive to use - hopefully they'll be easier to remember when developing.
 - Added simple responsive type to reduce the font size on smaller viewports. Modify `$font-size-base-narrow` in `scss/_variables.css` to change this.

### Sass
- All of the CSS3 mixins have been removed because we use [Autoprefixer](https://github.com/nDmitry/grunt-autoprefixer)
- **Global Sass vars** (`_variables.css`)
 - Breakpoint vars have been shortened from `$breakpoint-*` to `$bp-*`
 - Some of the grid vars have been moved to the more generic, `$layout-*` because they are not explicitly to do with the grid.
 - Other minor tweaks have also been made, so please read through this file to understand them.

### Javascript
- We have removed many of the old 'helper' files and plugins, instead opting for dependencies found on the [Bower](http://bower.io) registry.
- Bower dependencies are installed to `bower_modules`. To change this, edit the `.bowerrc` file. The default dependencies that we suggest are [Swiftclick](https://github.com/tmwagency/swiftclick), [Trak.js](https://github.com/tmwagency/trak.js), [jQuery](https://github.com/jquery/jquery/) and [Cookies](https://github.com/ScottHamper/Cookies/)
- [Shimly](http://github.com/nicbell/shimly), a grunt plugin by [Nic Bell](http://github.com/nicbell) is being used to generate a file of javascript shims. Have a look at `_grunt-configs/javascript.js` to find the Shimly settings.

### Grunt & tooling
- [Livereload](http://livereload.com/) & [grunt-contrib-connect](https://github.com/grunt-contrib-connect) have been dropped (but still included) in favour of [BrowserSync](http://www.browsersync.io/docs/grunt/) (which handles both without a browser extension) for our live CSS updating and simple server needs. Running `grunt serve` will fire up a simple server and watch for changes, with the added benefits of [BrowserSync's](http://www.browsersync.io/docs/grunt/) many features.
- All grunt tasks have been moved into grouped separate files in the `_grunt-configs` folder. For example, `_grunt-configs/css.js` contains all the grunt tasks relating to CSS: Sass, [Autoprefixer](https://github.com/nDmitry/grunt-autoprefixer) & [CSSO](https://github.com/t32k/grunt-csso) (for minifying CSS. The `_grunt-configs/javascript.js` file contains the uglify (for concatenating and minfying js), shimly (for generating a javascript shims file), jshint and jQuery (for generating a custom jQuery build).
- Extra grunt tasks have been added to help development. For example, running `grunt icons` will rebuild all the icons generated by Grunticon. `grunt start` will bring up a browser window with our 'getting started' guide, it also contains the simple styleguide for your project.
- We have integrated a simple visual regression testing task, [grunt-photobox](https://github.com/stefanjudis/grunt-photoBox), to help prevent deployment of broken code. See [this](http://trykickoff.com/learn/grunt.html#task-photobox) for more info



[6.0.0]: https://github.com/TryKickoff/kickoff/tree/6.0.0
[5.0.0]: https://github.com/TryKickoff/kickoff/tree/5.0.0
[4.1.0]: https://github.com/TryKickoff/kickoff/tree/4.1.0
[4.0.4]: https://github.com/TryKickoff/kickoff/tree/4.0.4
[4.0.3]: https://github.com/TryKickoff/kickoff/tree/4.0.3
[4.0.2]: https://github.com/TryKickoff/kickoff/tree/4.0.2
[4.0.1]: https://github.com/TryKickoff/kickoff/tree/4.0.1
[4.0.0]: https://github.com/TryKickoff/kickoff/tree/4.0.0

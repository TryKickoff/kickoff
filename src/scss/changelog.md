# Kickoff SCSS changelog
For more information please visit our site at [trykickoff.com](http://trykickoff.com)

## Version 8.0.0
Date 01/11/2016

Moved the grid, mixins & functions, fluidVideo into their own npm repos. These along with Normalize.css are now `@imported` from the `node_modules` folder.

### External scss modules
* https://github.com/TryKickoff/kickoff-utils.scss
* https://github.com/TryKickoff/kickoff-fluidVideo.css
* https://github.com/TryKickoff/kickoff-grid.css
* http://include-media.com - media-query mixin lib
* https://github.com/necolas/normalize.css

### Major changes
* There is only 1 Sass entry-point now, `kickoff-old-ie.scss` was removed because IE8 is no longer supported. 
* The `_dependencies.scss` file is not needed anymore because of the above point. All code was moved to `kickoff.scss`

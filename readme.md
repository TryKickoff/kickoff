# TMW's front-end framework

Developed by [Ashley Nolan](https://github.com/dragongraphics) & [Zander Martineau](https://github.com/mrmartineau)

**This is a work in progress set of base templates, and as such will be changed quite regularly.  If using be sure to read the documentation to understand it fully before using**

### Browser support
There are quite a few CSS & Javascript fallbacks/polyfills to cater for older browser's lack of features - we're looking at you IE!

##HTML file(s)

`index.html` The base HTML file structure.  An include of modernizr is included but should be replaced to a minimal version with only required features before release.


##CSS folder

`kickoff.css` This is the compiled CSS from the project's LESS files (in the less folder), it should not be edited directly.

`polyfills/box-sizing.htc` Polyfill for `box-sizing:border-box;` - either use this, or target individual cases using Modernizr.

##img folder

Folder to store all images. Any specific commonalities in the images should be stored in separate folders (such as `img/ui`) but obviously not overused to the point of irrelevance.

##JS folder
`/js/plugins.js` File where all plugins are references.
At the top of the file, and index should be kept of all plugins included, in the order they are displayed in the code.
Out of the box, the file includes Paul Irish's [lightweight console.log wrapper](http://paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/) and the 'make it safe always' console.log script from [HTMl5 Boilerplate](http://html5boilerplate.com/).

`/js/script.js` Where any custom JS should be coded.
This can eventually be split into more specific files and built into one JS file at production.


`/js/mobile-plugins.js` File where some plugins are used. These should go into one `plugins.js` file in production but kept seperately for development

A sample of how your JS should be structured is included.  All operations should be evoked from SiteSetup, so initialisations of objects and functions can be traced easily.

`libs` Includes local versions of jQuery and modernizr - which should be replaced by later versions when released - as well as more commonly used plugins.

Note that these plugins should be added into the `plugins.js` when they are needed - do not add additional script tags into your HTML.

The polyfills directory includes `html5shiv.js` when modernizr is overload for your project and only basic HTML elements are required.

##Examples
Coming soon (when Github pages gets its act together!)
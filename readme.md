# TMW's front-end framework

Developed by [Ashley Nolan](https://github.com/dragongraphics) & [Zander Martineau](https://github.com/mrmartineau)

**This is a work in progress set of base templates, and as such will be changed quite regularly.  If using be sure to read the documentation to understand it fully before using**

##HTML

`index.html`

The base HTML file structure.  An include of modernizr is included but should be replaced to a minimal version with only required features before release.


##CSS

###`kickoff.css`

This is the generated CSS from the project LESS files.  Should not be edited directly.

###`polyfills/box-sizing.htc`

Polyfill for `box-sizing:border-box;` - either use this, or target individual cases using Modernizr.

##img

Folder to store all images.  Any specific commonalities in the images should be stored in separate folders (such as UI) but obviously not overused to the point of irrelevance.

##JS

###`plugins.js`

File where all plugins are references.

At the top of the file, and index should be kept of all plugins included, in the order they are displayed in the code.

Out of the box, the file includes Paul Irish's [lightweight console.log wrapper](http://paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/) and the 'make it safe always' console.log script from [HTMl5 Boilerplate](http://html5boilerplate.com/). 

###`script.js`

Where any custom JS should be coded.

This can eventually be split into more specific files and built into one JS file at production.

A sample of how your JS should be structured is included.  All operations should be evoked from SiteSetup, so initialisations of objects and functions can be traced easily.

###`libs`

Includes local versions of jQuery and modernizr - which should be replaced by later versions when released - as well as more commonly used plugins.

Note that these plugins should be added into the `plugins.js` when they are needed - do not add additional script tags into your HTML.

The polyfills directory includes `html5shiv.js` when modernizr is overload for your project and only basic HTML elements are required.

##LESS

###`kickoff.less`

Where all the projects LESS files are included.  Comment and uncomment inculdes as you need them in your project.

###`app.less`

Custom section specific code is included here.

If a section grows too large, separate it into a new LESS file.

###`normalize.less`

Taken from [normalize.css](http://necolas.github.com/normalize.css/) - includes sensible resets to the CSS.

Update with latest version of the code at the start of a project.

###`variables.less`

Self explanatory - holds all common variables used by other LESS files - colours, fonts, image paths etc.

###`typography.less`

Contains all font styling definitions.

###Components

	button-groups.less
	buttons.less
	carousel.less
	code.less
	forms.less
	tables.less
	well.css
	
LESS files that can be included to give simple base styling to page components.

###Grids
	choreographic-grid.less
	grid-static.less
	
Split into responsive and static grid files.  Pick which one you need for your project and will help you setup your grid.

###`mixins.less`

All mixins should be included in this file.  A number of common mixins are included, such as CSS3 definitions and font-size/line-height.

###`utilities.less`

Contains helper classes for things like clear fixes.  Can be expanded upon in future.


###`print.less`

Simple print styling - does exactly what it says on the tin.


##Examples

Most work in progress section.  Contains examples on how to use different aspects of the framework, such as setting up code for a carousel, form or grid, as well as detailing the icon sprites available.
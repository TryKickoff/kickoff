[Documentation table of contents](readme.md)

# The JavaScript

Information about the default JavaScript included in the project.

## script.js

This file can be used to contain or reference your site/app JavaScript code.
For larger projects, you can make use of a JavaScript module loader, like
[Require.js](http://requirejs.org/), to load any other scripts you need to
run.

By default, there is a `TMW` namespace, this can be changed to anything, perhaps the name of the project. We tend to use the [singleton pattern](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#singletonpatternjavascript).

## plugins.js

This file can be used to contain all your plugins, such as jQuery plugins and
other 3rd party scripts.

One approach is to put jQuery plugins inside of a `(function($){ ...
})(jQuery);` closure to make sure they're in the jQuery namespace safety
blanket. Read more about [jQuery plugin
authoring](http://docs.jquery.com/Plugins/Authoring#Getting_Started)

## libs

This directory can be used to contain all 3rd party library code.

Minified versions of the latest jQuery and Modernizr libraries are included by
default. You may wish to create your own [custom Modernizr
build](http://www.modernizr.com/download/).

## libs/polyfills

This directory can be used to contain all polyfills that you might need. Kickoff comes with:

* `html5shiv` for enabling html5 elements
* `respond.min.js` for adding Media Query support

## libs/plugins

This directory can be used to contain all your javascript plugins. Kickoff comes with:
* [carouFredSel](http://caroufredsel.frebsite.nl/) a full-featured carousel plugin. Examples can be found
* [Fancybox](http://fancyapps.com/fancybox/) a lightbox script
* [jQuery Easie](http://janne.aukia.com/easie/) Easing library for js animations
* [imagesLoaded](https://github.com/desandro/imagesloaded) A useful plugin for making sure images are loaded before another event happens. Very useful for carousels
* [Validation](http://bassistance.de/jquery-plugins/jquery-plugin-validation/) A simple client-side form validation script

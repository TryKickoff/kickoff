/*jslint sloppy: true, white: true, browser: true, devel: true */
/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:false, curly:true, browser:true, indent:4, maxerr:50, sloppy:true, white:false, smarttabs:false */

/*	Author:
		TMW - (Author Name Here)
*/

// ======================================
// === Declare global 'TMW' namespace ===
// ======================================
var TMW = window.TMW || {};

// Create a closure to maintain scope of the '$' and remain compatible with other frameworks
(function($) {

	$(function() {
		// Any globals go here in CAPS (but avoid if possible)

		// follow a singleton pattern
		// (http://addyosmani.com/resources/essentialjsdesignpatterns/book/#singletonpatternjavascript)

		TMW.SiteSetup = {
			variableX : '', // please don't keep me - only for example syntax!

			init : function () {

			}
		};

		TMW.SiteSetup.init();

	});// END DOC READY

	/* optional triggers

	// WINDOW.LOAD
	$(window).load(function() {

	});

	// WINDOW.RESIZE
	$(window).resize(function() {

	});

	*/

})(jQuery);


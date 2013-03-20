/*jslint white: true, browser: true, devel: true, debug: true */
/*jshint browser:true, camelcase: true, curly:true, forin:true, indent:4, latedef: true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:false, maxerr:50, white:false, smarttabs:false, quotmark: single, trailing: true, debug: true, laxcomma: true */

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

TMW.SiteSetup = {
	variableX : '', // please don't keep me - only for example syntax!

	init : function () {

	}
};

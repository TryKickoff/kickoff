/*	Author:
		TMW - (Author Name Here)
*/

// Create a closure to maintain scope of the '$' and TMW
;(function (TMW, $) {

	$(function() {
		// Any globals go here in CAPS (but avoid if possible)

		// follow a singleton pattern
		// (http://addyosmani.com/resources/essentialjsdesignpatterns/book/#singletonpatternjavascript)

		TMW.Config.init();

	});// END DOC READY


	/* Optional triggers

	// WINDOW.LOAD
	$(window).load(function() {

	});

	// WINDOW.RESIZE
	$(window).resize(function() {

	});

	*/



	TMW.Config = {
		variableX : '', // please don't keep me - only for example syntax!

		init : function () {
			console.debug('Kickoff is running');
		}
	};

	// Example module
	/*
	TMW.Ui = {
		init : function() {
			TMW.Ui.modal();
		},

		modal : function() {

		}
	};
	*/

})(window.TMW = window.TMW || {}, jQuery);

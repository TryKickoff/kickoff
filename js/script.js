/*	Author:
		TMW - (Author Name Here)
*/

// Create a closure to maintain scope of the '$' and KO (Kickoff)
;(function(KO, $) {

	$(function() {
		// Any globals go here in CAPS (but avoid if possible)

		// follow a singleton pattern
		// (http://addyosmani.com/resources/essentialjsdesignpatterns/book/#singletonpatternjavascript)

		KO.Config.init();

	});// END DOC READY


	/* Optional triggers

	// WINDOW.LOAD
	$(window).load(function() {

	});

	// WINDOW.RESIZE
	$(window).resize(function() {

	});

	*/



	KO.Config = {
		variableX : '', // please don't keep me - only for example syntax!

		init : function () {
			console.debug('Kickoff is running');
		}
	};

	// Example module
	/*
	KO.Ui = {
		init : function() {
			KO.Ui.modal();
		},

		modal : function() {

		}
	};
	*/

})(window.KO = window.KO || {}, jQuery);

/**
 * Author:
 * TMW - (Author Name Here)
 */

// Create a closure to maintain scope of the '$' and KO (Kickoff)
;(function(KO, $) {

	$(function() {
		// Any globals go here in CAPS (but avoid if possible)

		// follow a singleton pattern
		// (http://addyosmani.com/resources/essentialjsdesignpatterns/book/#singletonpatternjavascript)

		KO.Config.init();

	});// END DOC READY


	KO.Config = {
		variableX : '', // please don't keep me - only for example syntax!

		init : function () {
			console.debug('Kickoff is running');
		}
	};

	// Example module
	/*
	KO.MyExampleModule = {
		init : function () {
			KO.MyExampleModule.setupEvents();
		},

		setupEvents : function () {
			//do some more stuff in here
		}
	};
	*/

})(window.KO = window.KO || {}, jQuery);

/* ==========================================================================
   KO.Trak - Universal event tracking API

   # Default implementation uses is Google Analytics:
   https://developers.google.com/analytics/devguides/collection/analyticsjs/

   ## Page and event tracking
   https://developers.google.com/analytics/devguides/collection/analyticsjs/events

   ### Usage:
   KO.Trak('category', 'action');
   KO.Trak('category', 'action', 'label');
   KO.Trak('category', 'action', 'label', value); // value is a number
   ========================================================================== */
;(function(KO) {
	KO.Trak = {
		clean : function(str) {
			return str.toString().replace(/\s|'|"/g, '-');
		},

		event : function (category, action, label, value) {
			if (typeof(ga) !== 'undefined') { // use _gaq for old style
				ga('send', 'event', this.clean(category), this.clean(action), this.clean(label), value);

				// Old style:
				//_gaq.push(['_trackEvent', this.clean(category), this.clean(action), this.clean(label), value]);
			}
		}
	};
})(window.KO = window.KO || {});

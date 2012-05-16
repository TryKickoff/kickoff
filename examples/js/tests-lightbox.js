(function($) {

	$(function() {
		///
		// Fancybox: fancybox.net
		///

		$("a.lightbox").fancybox({
			//closeBtn : false,
			loop : true,
			//closeClick: true,
			openEffect : 'fade',
			closeEffect : 'fade',
			nextEffect : 'fade',
			prevEffect : 'fade',
			nextSpeed : 'fast',
			prevSpeed : 'fast',
			helpers: {
				overlay: {
					opacity: 0.15,
					css: {
						cursor: 'pointer',
						'background-color': '#000000'
					}
				}
			}
		});


	});//End Doc Ready

})(jQuery);
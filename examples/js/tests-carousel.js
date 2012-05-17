(function($) {

	$(function() {

		$('.carousel').imagesLoaded( function() {
			$('.carousel').carouFredSel({
				align: 'center',
				width: 600,
				height: 300,
				items: {
					visible: 1,
					width: 600,
					height: 300
				},
				//auto: false,
				auto: {
					pauseDuration: 6000,
					duration: 500,
					pauseOnHover: true
				},
				pagination: {
					container: '.carousel-pagination',
					duration: 300
				},
				next: {
					button: ".carousel-next",
					key: "right"
				},
				prev: {
					button: ".carousel-prev",
					key: "left"
				},
				scroll: {
					pauseOnHover: true,
					fx: 'scroll'
				}
			});
		});//ImagesLoaded


	});//End Doc Ready


})(jQuery);
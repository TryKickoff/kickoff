import ready from 'lite-ready';
import $$ from 'double-dollar';
import copy from 'copy-js/src/copy.js';

ready(() => {

	$$('.sg-swatch').forEach(function(item){
		item.addEventListener('click', function(e) {
			var swatchVar = e.currentTarget.querySelector('.sg-swatch-var').innerText;
			const target = e.currentTarget;
			target.classList.add('is-active');

			copy(swatchVar, () => {
				console.log('copied ', swatchVar);

				setTimeout(() => {
					target.classList.remove('is-active');
				}, 500);
			});
		}, false);
	});
});


import ready from 'lite-ready';
import $$ from 'double-dollar';
import copy from 'copy-js/src/copy';
import svg4everybody from 'svg4everybody'; // https://github.com/jonathantneal/svg4everybody

ready(() => {
	copyText();

	svg4everybody({
		polyfill: true, // polyfill <use> elements for External Content
	});
});

/**
 * copyText
 *
 * Usage:
 * add `data-copy="your text"` to any html element on the styleguide
 */
function copyText() {
	$$('[data-copy]').forEach(item => {
		item.addEventListener('click', e => {
			e.preventDefault();
			e.stopPropagation();
			const target = e.currentTarget;
			const copyValue = target.getAttribute('data-copy');
			target.classList.add('is-active');

			copy(copyValue, () => {
				console.log('copied ', copyValue);

				setTimeout(() => {
					target.classList.remove('is-active');
				}, 500);
			});
		}, false);
	});
}

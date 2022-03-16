import carousel from './Components/carousel';

const start = () => {
	document
		.querySelectorAll('.wp-block-xwp-blocks-xwp-carousel')
		.forEach((node) => {
			carousel(node);
		});
};

if ('loading' === document.readyState) {
	document.addEventListener('DOMContentLoaded', start);
} else {
	start();
}

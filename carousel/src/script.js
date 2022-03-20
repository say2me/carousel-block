import carousel from './Components/carousel';

const start = () => {
	document.querySelectorAll('.xwp-carousel').forEach((node) => {
		carousel(node);
	});
};

if ('loading' === document.readyState) {
	document.addEventListener('DOMContentLoaded', start);
} else {
	start();
}

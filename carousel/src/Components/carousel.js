export default (node) => {
	const container = node.querySelector('.xwp-slide-container');
	const slide = container.querySelector('.xwp-slide');
	let slideWidth = slide.offsetWidth;
	const isAutoplay = container.dataset.xwpCarouselAutoplay === 'true';
	let autoplay = false;

	node.querySelector('[data-xwp-control="back"]').addEventListener(
		'click',
		() => navigate('backward')
	);
	node.querySelector('[data-xwp-control="forward"]').addEventListener(
		'click',
		() => navigate('forward')
	);

	node.querySelectorAll('.xwp-slide-indicator').forEach((dot, index) => {
		dot.addEventListener('click', () => navigate(index));
		isAutoplay &&
			dot.addEventListener('mouseenter', () => clearInterval(autoplay));
	});

	window.addEventListener('resize', () => {
		slideWidth = slide.offsetWidth;
	});

	// Autoplay

	if (isAutoplay) {
		const delay = parseInt(container.dataset.xwpCarouselAutoplayDelay) || 3;
		autoplay = setInterval(() => navigate('forward'), delay * 1000);
		container.addEventListener('mouseenter', () => clearInterval(autoplay));
	}

	// Slide transition
	const getNewScrollPosition = (arg) => {
		const gap = 10;
		const maxScrollLeft = container.scrollWidth - slideWidth;
		if (arg === 'forward') {
			const x = container.scrollLeft + slideWidth + gap;
			return x <= maxScrollLeft ? x : 0;
		} else if (arg === 'backward') {
			const x = container.scrollLeft - slideWidth - gap;
			return x >= 0 ? x : maxScrollLeft;
		} else if (typeof arg === 'number') {
			const x = arg * (slideWidth + gap);
			return x;
		}
	};
	const navigate = (arg) => {
		container.scrollLeft = getNewScrollPosition(arg);
	};
	// Slide indicators
	const slideObserver = new IntersectionObserver(
		(entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const slideIndex = entry.target.dataset.slideindex;
					node.querySelector(
						'.xwp-slide-indicator.xwp-active'
					).classList.remove('xwp-active');
					node.querySelectorAll('.xwp-slide-indicator')[
						slideIndex
					].classList.add('xwp-active');
				}
			});
		},
		{ root: container, threshold: 0.1 }
	);
	node.querySelectorAll('.xwp-slide').forEach((slide) => {
		slideObserver.observe(slide);
	});
};

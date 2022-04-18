export const getNewScrollPosition = (arg, container) => {
	const gap = 10;
	const slideWidth = container.querySelector('.xwp-slide').offsetWidth;
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

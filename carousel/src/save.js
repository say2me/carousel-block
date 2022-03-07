import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save({
	attributes: { slides_count, autoplay, autoplay_delay },
}) {
	return (
		<div {...useBlockProps.save()}>
			<div
				className="xwp-slide-container"
				data-xwp-carousel-autoplay={autoplay}
				data-xwp-carousel-autoplay-delay={autoplay_delay}
			>
				<InnerBlocks.Content />
			</div>
			<div className="xwp-arrow xwp-back xwp-back-button">←</div>
			<div class="xwp-arrow xwp-forward xwp-forward-button">→</div>
			<div className="xwp-slide-indicators">
				{[...Array(slides_count)].map((slide) => {
					return <div class="xwp-slide-indicator"></div>;
				})}
			</div>
		</div>
	);
}

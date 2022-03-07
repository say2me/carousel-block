import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import { ToggleControl } from '@wordpress/components';
import {
	useBlockProps,
	InnerBlocks,
	BlockControls,
} from '@wordpress/block-editor';
import { useSelect, useDispatch } from '@wordpress/data';
import { useState } from '@wordpress/element';
// import { useEffect } from '@wordpress/element';

import './editor.scss';

export default function Edit({ clientId, setAttributes, attributes }) {
	// const { insertBlock } = useDispatch('core/block-editor');

	const blockProps = useBlockProps({
		className: 'xwp-carousel',
	});
	const slidesCount = useSelect((select) => {
		return select('core/block-editor').getBlockCount(clientId);
	});
	// const addNewSlide = () => {
	// 	insertBlock(
	// 		createBlock( 'xwp-blocks/slide', { slide_index: slides.length } ),
	// 		slides.length + 1,
	// 		clientId
	// 	);
	// 	setAttributes( { slides_count: slides.length + 1 } )
	// }
	// useEffect((action) => {
	// 	console.log(action);
	// 	console.log('use effect');
	// 	console.log(slidesCount);
	// 	// setAttributes( { slides_count: slidesCount } );
	// });
	console.log('render', attributes);
	attributes.slides_count !== slidesCount
		? setAttributes({ slides_count: slidesCount })
		: null;
	return (
		<div {...useBlockProps()}>
			<BlockControls>
				<ToggleControl
					label="Autoplay"
					checked={attributes.autoplay === 'true'}
					onChange={(state) => {
						setAttributes({ autoplay: state.toString() });
					}}
				/>
			</BlockControls>
			<div className="xwp-slide-container">
				<InnerBlocks
					allowedBlocks={['xwp-blocks/slide']}
					template={[['xwp-blocks/slide', {}]]}
					templateLock={false}
				/>
			</div>
			<div className="xwp-arrow xwp-back xwp-back-button">←</div>
			<div class="xwp-arrow xwp-forward xwp-forward-button">→</div>
			<div className="xwp-slide-indicators">
				{[...Array(attributes.slides_count || 0)].map((slide) => {
					return <div class="xwp-slide-indicator"></div>;
				})}
			</div>
			{/* <button
					type="button"
					onClick={ addNewSlide }
					className="xwp-blocks-carousel-add-new-slide-button"
				>
					{ __( 'Add a new slide', 'xwp-blocks' ) }
			</button> */}
		</div>
	);
}

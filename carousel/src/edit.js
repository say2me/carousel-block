import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';

import './editor.scss';

export default function Edit( { clientId, setAttributes }) {
	const { insertBlock } = useDispatch('core/block-editor');

	const blockProps = useBlockProps( {
		className: 'xwp-carousel',
	} );
	const slidesCount = useSelect( ( select ) => {
		return select( 'core/block-editor' ).getBlockCount( clientId );
	} );
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
	return (
		<div { ...useBlockProps() }>
			<div className="xwp-slide-container">
			<InnerBlocks
					allowedBlocks={ [ 'xwp-blocks/slide' ] }
					template={ [ [ 'xwp-blocks/slide', {} ] ] }
					templateLock={ false }
				/>
			</div>
			<div className="xwp-arrow xwp-back xwp-back-button">←</div>
        	<div class="xwp-arrow xwp-forward xwp-forward-button">→</div>
			<div className="xwp-slide-indicators">
				{ [...Array(slidesCount)].map((slide) => {
					return <div class="xwp-slide-indicator"></div>
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

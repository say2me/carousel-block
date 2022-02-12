import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { useSelect, useDispatch } from '@wordpress/data';

import './editor.scss';

export default function Edit( { clientId }) {
	const { insertBlock } = useDispatch('core/block-editor');

	const blockProps = useBlockProps( {
		className: 'xwp-carousel',
	} );
	console.log(clientId)
	const slides = useSelect( ( select ) => {
		return select( 'core/block-editor' ).getBlocks( clientId );
	} );

	const addNewSlide = () => {
		insertBlock(
			createBlock( 'xwp-blocks/slide', { id: slides.length } ),
			slides.length + 1,
			clientId
		);
	}
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
				{ slides.map((slide) => {
					return <div class="xwp-slide-indicator"></div>
				})}
        	</div>
			<button
					type="button"
					onClick={ addNewSlide }
					className="xwp-blocks-carousel-add-new-slide-button"
				>
					{ __( 'Add a new slide', 'xwp-blocks' ) }
			</button>
		</div>
	);
}

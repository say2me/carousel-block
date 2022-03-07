import { __ } from '@wordpress/i18n';
// import { createBlock } from '@wordpress/blocks';
import {
	ToggleControl,
	__experimentalNumberControl as NumberControl,
	PanelBody,
	PanelRow,
} from '@wordpress/components';

import {
	useBlockProps,
	InnerBlocks,
	BlockControls,
	InspectorControls,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
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
	console.log(attributes);
	attributes.slides_count !== slidesCount
		? setAttributes({ slides_count: slidesCount })
		: null;
	const AutplayToggleControl = () => {
		return (
			<ToggleControl
				label={__('Autoplay', 'xwp-blocks')}
				checked={attributes.autoplay === 'true'}
				className="xwp-carousel-block-control-toogle"
				onChange={(state) => {
					setAttributes({ autoplay: state.toString() });
				}}
			/>
		);
	};
	return (
		<div {...useBlockProps()}>
			<BlockControls>{AutplayToggleControl()}</BlockControls>
			<InspectorControls>
				<PanelBody title={__('Autoplay', 'xwp-blocks')}>
					<PanelRow>{AutplayToggleControl()}</PanelRow>
					{attributes.autoplay === 'true' && (
						<PanelRow>
							<legend className="blocks-base-control__label">
								{__('Autoplay Delay', 'xwp-blocks')}
							</legend>
							<NumberControl
								isShiftStepEnabled={true}
								onChange={(state) => {
									setAttributes({ autoplay_delay: state });
								}}
								shiftStep={1}
								value={attributes.autoplay_delay}
							/>
						</PanelRow>
					)}
				</PanelBody>
			</InspectorControls>
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

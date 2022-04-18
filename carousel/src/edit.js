import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import {
	ToggleControl,
	__experimentalNumberControl as NumberControl,
	PanelBody,
	PanelRow,
	ToolbarGroup,
	ToolbarButton,
} from '@wordpress/components';

import {
	useBlockProps,
	InnerBlocks,
	__experimentalUseInnerBlocksProps as useInnerBlocksProps,
	BlockControls,
	InspectorControls,
} from '@wordpress/block-editor';
import { useSelect, useDispatch } from '@wordpress/data';
import { useRef } from '@wordpress/element';
import { arrowLeft, arrowRight, plus } from '@wordpress/icons';
import { getNewScrollPosition } from './Components/tools';
import './editor.scss';

export default function Edit({ clientId, setAttributes, attributes }) {
	const { insertBlock } = useDispatch('core/block-editor');
	const containerEl = useRef(null);
	const blockProps = useBlockProps({
		className: 'xwp-carousel',
	});
	const slidesCount = useSelect((select) => {
		return select('core/block-editor').getBlockCount(clientId);
	});
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
	const go = (arg) => {
		console.log(arg);
		const container = containerEl.current.querySelector(
			'.block-editor-block-list__layout'
		);
		container.scrollLeft = getNewScrollPosition(arg, container);
	};
	const addNewSlide = () => {
		insertBlock(
			createBlock('xwp-blocks/slide', {}),
			attributes.slides_count + 1,
			clientId
		);
	};
	return (
		<div {...blockProps}>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						icon={arrowLeft}
						label={__('Back', 'xwp-blocks')}
						onClick={() => go('back')}
					/>
					<ToolbarButton
						icon={arrowRight}
						label={__('Forward', 'xwp-blocks')}
						onClick={() => go('forward')}
					/>
				</ToolbarGroup>
				<ToolbarGroup>
					<ToolbarButton
						icon={plus}
						label={__('Add slide', 'xwp-blocks')}
						onClick={addNewSlide}
					/>
				</ToolbarGroup>
			</BlockControls>
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
			<div className="xwp-slide-container" ref={containerEl}>
				<InnerBlocks
					orientation="horizontal"
					allowedBlocks={['xwp-blocks/slide']}
					template={[['xwp-blocks/slide', {}]]}
					renderAppender={false}
				/>
			</div>
			<div
				className="xwp-arrow xwp-back"
				data-xwp-control="back"
				onClick={() => go('back')}
			>
				←
			</div>
			<div
				class="xwp-arrow xwp-forward"
				data-xwp-control="forward"
				onClick={() => go('forward')}
			>
				→
			</div>
			<div className="xwp-slide-indicators">
				{[...Array(attributes.slides_count || 0)].map((slide, i) => {
					return (
						<div
							class="xwp-slide-indicator"
							onClick={(e) => go(i)}
						></div>
					);
				})}
			</div>
		</div>
	);
}

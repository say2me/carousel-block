import {
	ToggleControl,
	__experimentalNumberControl as NumberControl,
	PanelBody,
	PanelRow,
} from '@wordpress/components';

export default function AutoplayPanel(setAttributes, state) {
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
	);
}

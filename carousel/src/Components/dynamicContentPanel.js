import {
	__experimentalNumberControl as NumberControl,
	PanelBody,
	PanelRow,
} from '@wordpress/components';
export default function AutoplayPanel(setAttributes, state) {
	return (
		<PanelBody title={__('Dynamic content', 'xwp-blocks')}>
			<PanelRow>
				<InputControl
					isShiftStepEnabled={true}
					onChange={(state) => {
						setAttributes({ autoplay_delay: state });
					}}
					shiftStep={1}
					value={attributes.autoplay_delay}
				/>
			</PanelRow>
		</PanelBody>
	);
}

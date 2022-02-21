import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save( { attributes: { id } } ) {
	return (
		<div
			{ ...useBlockProps.save() }
			data-slideindex={ id }
		>
			<InnerBlocks.Content />
		</div>
	);
}

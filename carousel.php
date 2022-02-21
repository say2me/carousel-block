<?php
/**
 * Plugin Name:       XWP Carousel
 * Description:       XWP Carousel Gutenberg block
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            XWP Team
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       xwp-blocks
 *
 * @package           xwp-blocks
 */

function carousel_block_create_blocks_init() {
	register_block_type( __DIR__ . '/carousel/build' );
	register_block_type( __DIR__ . '/slide/build' );
}
add_action( 'init', 'carousel_block_create_blocks_init' );

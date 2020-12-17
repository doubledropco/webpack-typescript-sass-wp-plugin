<?php
/**
 * Plugin Name:       My Plugin
 * Description:       WordPress plugin boilerplate
 * Plugin URI:        http://github.com/doubledropco/webpack-typescript-sass-wp-plugin
 * Version:           1.0.0
 * Author:            Doubledrop
 * Author URI:        https://doubledrop.co/
 * Requires at least: 5.0.0
 * Tested up to:      5.4.2
 * Requires PHP:      7.2
 *
 * @package My_Plugin
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

require  __DIR__ . '/vendor/autoload.php';
require  __DIR__ . '/utils/utils.php';
require  __DIR__ . '/class-my-plugin.php';

register_activation_hook( __FILE__, 'my_plugin_activition' );
function my_plugin_activition() {
	error_log( 'My Plugin activated' );
}


register_deactivation_hook( __FILE__, 'my_plugin_deactivation' );
function my_plugin_deactivation() {
	error_log( 'My Plugin deactivated' );
}

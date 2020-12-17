<?php
/**
 * @package My_Plugin
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

final class My_Plugin {
	/**
	 * Set up the plugin
	 */
	public function __construct() {
		/**
		 * Add frontend CSS / JS
		 */
		add_action( 'wp_enqueue_scripts', array( $this, 'my_plugin_css' ), 999 );
		add_action( 'wp_enqueue_scripts', array( $this, 'my_plugin_js' ) );
	}

	/**
	 * Helper for loading scripts
	 */
	public function load_script( $name, $script_path, $script_asset_path ) {
		$script_path       = plugins_url( $script_path, __FILE__ );
		$script_asset_path = plugins_url( $script_asset_path, __FILE__ );

		if ( file_exists( $script_asset_path ) ) {
			$script_asset = require $script_asset_path;
			wp_enqueue_script( $name, $script_path, $script_asset['dependencies'], $script_asset['version'], true );
		} else {
			wp_enqueue_script( $name, $script_path, array(), null, true );
		}
	}

	/**
	 * Enqueue the CSS
	 */
	public function my_plugin_css() {
		wp_enqueue_style( 'main', plugins_url( '/dist/main.css', __FILE__ ), null );
		wp_enqueue_style( 'global', plugins_url( '/dist/global.css', __FILE__ ), null );
	}

	/**
	 * Enqueue the Javascript
	 */
	public function my_plugin_js() {
		$this->load_script( 'main', '/dist/main.js', '/dist/main.asset.php' );
	}
}

function my_plugin_main() {
	global $my_plugin;
	$my_plugin = new My_Plugin();
}

add_action( 'plugins_loaded', 'my_plugin_main' );

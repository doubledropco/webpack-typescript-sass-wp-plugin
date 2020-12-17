<?php

if ( ! function_exists( 'console_log' ) ) {
	function console_log( ...$args ) {
		echo '<script>';
		echo 'console.log(';
		foreach ( $args as $arg ) {
			echo 'JSON.parse("' . addslashes( json_encode( $arg ) ) . '"),';
		}
		echo ');';
		echo '</script>';
	}
}

if ( ! function_exists( 'rlog' ) ) {
	function rlog( ...$args ) {
		foreach ( $args as $str ) {
			error_log( print_r( $str, true ) );
		}
	}
}

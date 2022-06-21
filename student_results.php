<?php
/**
* Plugin Name: Student Result
* Plugin URI: https://www.stdresult.com/
* Description: This is a plugin specially made for showing results with a marksheet, add students using CSV, Full Customizable. You can easily add , update and delete student result and some more stuff.
* Version: 1.0.0
* Author: Loyalcoders 
**/

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * The main plugin class
 */
final class Student_Results {

    /**
     * Plugin version
     *
     * @var string
     */
    const version = '1.0';

    /**
     * Class construcotr
     */
    private function __construct() {
        $this->define_constants();

        register_activation_hook( __FILE__, [ $this, 'activate' ] );

        add_action( 'plugins_loaded', [ $this, 'init_plugin' ] );

        //  Declaring pugin name temporary
        $plugin_name = "std_result";

        // Declaring pugin directory temporary
        $plugin_dir = trailingslashit(plugin_dir_path(__FILE__));

        // Include custom database file for the first time.
        include_once($plugin_dir . 'includes/create_std_db.php');

        // Run when the plugin is activated.
        register_activation_hook( __FILE__, 'std_result_create_db' );

        // Student result Directory
		$this->plugin = plugin_basename( __FILE__ );

        // Admin Menu
		require_once( $plugin_dir . 'admin/admin.php');

        // Result Shortcode {show_student_result}
        require_once($plugin_dir . 'includes/studentResultShortcode.php');

    }


    /**
     * Load Textdomain
     *
     * Load plugin localization files.
     *
     * Fired by `init` action hook.
     *
     * @since 1.0.0
     *
     * @access public
     */
    public function i18n()
    {
        // load_plugin_textdomain('Student-Results');
        load_plugin_textdomain( 'Student-Results', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' ); 

    }

    /**
     * Initializes a singleton instance
     *
     */
    public static function init() {
        static $instance = false;

        if ( ! $instance ) {
            $instance = new self();
        }

        // Start Session
        if (!session_id()) {
            session_start();
        }

        return $instance;
    }

    /**
     * Define the required plugin constants
     *
     * @return void
     */
    public function define_constants() {
        define( 'STD_RESULTS_VERSION', self::version );
        define( 'STD_RESULTS_FILE', __FILE__ );
        define( 'STD_RESULTS_PATH', __DIR__ );
        define( 'STD_RESULTS_URL', plugins_url( '', STD_RESULTS_FILE ) );
        define( 'STD_RESULTS_ASSETS', STD_RESULTS_URL . '/assets' );
    }

    /**
     * Initialize the plugin
     *
     * @return void
     */
    public function init_plugin() {

        $this->i18n();
        return;
    }

    /**
     * Do stuff upon plugin activation
     *
     * @return void
     */
    public function activate() {
        $installed = get_option( 'std_results_installed' );

        if ( ! $installed ) {
            update_option( 'std_results_installed', time() );
        }

        update_option( 'std_results_version', STD_RESULTS_VERSION );
    }
}


/**
 * Initializes the main plugin
 *
 * @return \Student_results
 */
function std_results() {
    return Student_results::init();
}

// kick-off the plugin
if(class_exists('Student_Results')){
    std_results();
}



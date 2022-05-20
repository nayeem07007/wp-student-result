<?php
// Shortcode view results
add_shortcode( "show_student_result", "results_shortcode" );

// Enqueue Bootstrap
add_action( 'wp_enqueue_scripts', 'student_res_btstrp_enqueue_scripts' );

// Enqueue Scripts
add_action('wp_enqueue_scripts', 'std_res_enqueue_show_result_script');

/**
 * 
 * 
 * Add results shortcode.
 *
 * @since 1.0.0
 *
 */
function results_shortcode()
{
    $html = __("<div class='container' style='margin: 5px;'>", 'Student-Result');
    $html .= __("<div class='resultSearch' style='border: 1px solid gray; border-radius: 10px; padding: 15px; text-align: center;'>", 'Student-Result');
    $html .= __("<h4>Student Result</h4>", 'Student-Result');
    $html .= __("<div class='search_form' style=' padding: 5%; '>", 'Student-Result');

    $html .= 
    __("<form id='SearchResForm' >
        <div class='form-group row'>
            <label for='exam' class='col-sm-3 col-form-label text-left'>Examination </label>
            <div class='col-sm-9'>
            <select type='text' name='exam' class='form-control' id='sr_exam' placeholder='examination'>
            <option></option>
            </select>
            </div>
        </div>
        <div class='form-group row'>
            <label for='session' class='col-sm-3 col-form-label text-left'>Session </label>
            <div class='col-sm-9'>
            <select type='text' name='session' class='form-control' id='sr_session' placeholder='session'>
            <option></option>
            </select>
            </div>
        </div>
        <div class='form-group row'>
            <label for='semester' class='col-sm-3 col-form-label text-left'>Semester </label>
            <div class='col-sm-9'>
            <select type='text' class='form-control' name='semester' id='sr_semester' placeholder='semester'>
            <option></option>
            </select>
            </div>
        </div>
        <div class='form-group row'>
            <label for='class' class='col-sm-3 col-form-label text-left'>Class </label>
            <div class='col-sm-9'>
            <select type='text' class='form-control' name='class' id='sr_class' placeholder='class'>
            <option></option>
            </select>
            </div>
        </div>
        <div class='form-group row'>
            <label for='roll' class='col-sm-3 col-form-label text-left'>Roll </label>
            <div class='col-sm-9'>
            <input type='text' class='form-control' name='roll' id='sr_roll' placeholder='roll'>
            </div>
        </div>
        <div class='form-group row'>
            <div class='col-sm-10'>
            <button type='button' class='btn btn-warning' id='resFormReset' >Reset</button>
            <button type='button' class='btn btn-primary' id='searchRes'>Search</button>
            </div>
        </div>
    </form>
    ", 'Student-Result');

   $html .= "</div>";
   $html .= "</div>";
   $html .= __("<div class='resultView' style='margin:5%; padding:10px; border: 2px solid grey; border-radius:15px;' >", 'Student-Result');
   
   $html .= __("<div id='headerTitle'>", 'Student-Result');
   $html .= "</div>";
   $html .= "<div>";
   $html .= __("<table class='table' id='resultTbl'>
                <tbody id='rtBody'>
                    
                </tbody>
            </table>", 'Student-Result');
   $html .= "</div>";

   $html .= "</div>";
   $html .= "</div>";

    return( $html);     
}

/**
 * 
 * 
 * Enqueue styles.
 *
 * @since 1.0.0
 *
 */
function student_res_btstrp_enqueue_scripts()
{
    wp_enqueue_style( 'bootstrap', 'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css' );
}

/**
 * 
 * 
 * Enqueue admin  javascript.
 *
 * @since 1.0.0
 *
 */
function std_res_enqueue_show_result_script()
{
    
    $base_url = get_site_url( __FILE__ );

    wp_enqueue_script( 'std_res_show_result_scripts', plugin_dir_url(dirname(__FILE__)) . '/assets/showResult.js', array( 'jquery' ), "1.0", true );
    wp_localize_script('std_res_show_result_scripts' , 'api_base_url', [ $base_url ] );
}




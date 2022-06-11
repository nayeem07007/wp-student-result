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
    // Check if semester data is available
    global $wpdb;
    $semester_tbl = $wpdb->prefix . 'std_res_beta_semester';
    $semester_field = 'semester_name';

    $semesters = $wpdb->get_results( $wpdb->prepare( "SELECT {$semester_field} FROM {$semester_tbl}" ));

    $semester_data = [];

    foreach($semesters as $semester){
        $semester_data[] = $semester->semester_name;
    }

    // Check if class data is available
    $class_tbl = $wpdb->prefix . 'std_res_beta_class';
    $class_field = 'class_name';

    $classes = $wpdb->get_results( $wpdb->prepare( "SELECT {$class_field} FROM {$class_tbl}" ));

    $class_data = [];

    foreach($classes as $class){
        $class_data[] = $class->class_name;
    }



    $html = __("<div id='view_res_container' class='container' style='margin: 5px;'>", 'Student-Result');
    $html .= __("<div class='resultSearch' style='border: 1px solid gray; border-radius: 10px; padding: 15px; text-align: center;'>", 'Student-Result');
    $html .= __("<h4>Student Result</h4>", 'Student-Result');
    $html .= __("<div class='search_form' style=' padding: 5%; '>", 'Student-Result');

    $html .= 
    __("<form id='SearchResForm' >
        <div class='form-group row' id='exam_field'>
            <label for='exam' class='col-sm-3 col-form-label text-left'>Examination </label>
            <div class='col-sm-9'>
            <select type='text' name='exam' class='form-control' id='sr_exam' placeholder='Examination'>
            <option></option>
            </select>
            </div>
        </div>
        <div class='form-group row' id='session_field'>
            <label for='session' class='col-sm-3 col-form-label text-left'>Session </label>
            <div class='col-sm-9'>
            <select type='text' name='session' class='form-control' id='sr_session' placeholder='Session'>
            <option></option>
            </select>
            </div>
        </div>" , 'Student-Result');
        if(!empty($semester_data)){
        $html .= __("<div class='form-group row' id='semester_field'>
            <label for='semester' class='col-sm-3 col-form-label text-left'>Semester </label>
            <div class='col-sm-9'>
            <select type='text' class='form-control' name='semester' id='sr_semester' placeholder='Semester'>
            <option></option>
            </select>
            </div>
        </div>" , 'Student-Result');
        }
        if(!empty($class_data)){
            $html .= __("<div class='form-group row' id='class_field'>
                <label for='class' class='col-sm-3 col-form-label text-left'>Class </label>
                <div class='col-sm-9'>
                <select type='text' class='form-control' name='class' id='sr_class' placeholder='Class'>
                <option></option>
                </select>
                </div>
            </div>" , 'Student-Result');
        }
         $html .= __("<div class='form-group row' id='roll_field'>
            <label for='roll' class='col-sm-3 col-form-label text-left'>Roll </label>
            <div class='col-sm-9'>
            <input type='text' class='form-control' name='roll' id='sr_roll' placeholder='Roll'>
            </div>
        </div>
        <div class='form-group row' id='validions_field'>
            <label for='validation' id='validation_label' class='col-sm-3 col-form-label text-left'> </label>
            <div class='col-sm-9'>
            <input type='number' class='form-control' name='validation' id='sr_validate' placeholder='Enter sum the numbers.'>
            <p id='fail_msg' class='float-left text-danger'>Inocrrect!!!</p>
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
   $html .= __("<Button id='prin_me_link'class='float-right btn-warning'>print</Button>", 'Student-Result');
   
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




<?php
// Admin Menu
add_action('admin_menu', 'std_res_admin_menu');

// Admin Settings Action Link
add_filter("plugin_action_links_$this->plugin", 'std_res_settings_link');

// Enqueue Admin Scripts
add_action('admin_enqueue_scripts', 'std_res_enqueue_admin_script');

// Custom API for result
add_action( 'rest_api_init',  function(){
    register_rest_route( 'sr/v1', 'results', [
        'methods' => 'GET',
        'callback' => 'sr_show_result'
    ]);

    register_rest_route( 'sr/v1', 'search/results', [
        'methods' => 'POST',
        'callback' => 'sr_show_search_result'
    ]);

    register_rest_route( 'sr/v1', 'publish/results', [
        'methods' => 'POST',
        'callback' => 'sr_publish_result'
    ]);

    register_rest_route( 'sr/v1', 'publishing/results', [
        'methods' => 'GET',
        'callback' => 'sr_get_publishing_result'
    ]);

    register_rest_route( 'sr/v1', 'unpublish/results', [
        'methods' => 'POST',
        'callback' => 'sr_unpublish_result'
    ]);

    register_rest_route( 'sr/v1', 'delete/result', [
        'methods' => 'POST',
        'callback' => 'sr_delete_result'
    ]);

    register_rest_route( 'sr/v1', 'delete/student', [
        'methods' => 'POST',
        'callback' => 'sr_delete_student'
    ]);

    register_rest_route( 'sr/v1', 'results', [
        'methods' => 'POST',
        'callback' => 'sr_save_result'
    ]);
    
    register_rest_route( 'sr/v1', 'students', [
        'methods' => 'POST',
        'callback' => 'sr_save_students'
    ]);

    register_rest_route( 'sr/v1', 'students', [
        'methods' => 'GET',
        'callback' => 'sr_get_students'
    ]);

    register_rest_route( 'sr/v1', 'import/results', [
        'methods' => 'POST',
        'callback' => 'sr_save_imported_result'
    ]);

    register_rest_route( 'sr/v1', 'import/students', [
        'methods' => 'POST',
        'callback' => 'sr_save_imported_students'
    ]);
    
    register_rest_route( 'sr/v1', 'search', [
        'methods' => 'POST',
        'callback' => 'sr_search_students'
    ]);
    
    register_rest_route( 'sr/v1', 'getTheads', [
        'methods' => 'GET',
        'callback' => 'get_theads'
    ]);

    register_rest_route( 'sr/v1', 'dept', [
        'methods' => 'GET',
        'callback' => 'get_dept'
    ]);

    register_rest_route( 'sr/v1', 'dept', [
        'methods' => 'POST',
        'callback' => 'save_dept'
    ]);

    register_rest_route( 'sr/v1', 'session', [
        'methods' => 'GET',
        'callback' => 'get_session'
    ]);

    register_rest_route( 'sr/v1', 'session', [
        'methods' => 'POST',
        'callback' => 'save_session'
    ]);

    register_rest_route( 'sr/v1', 'semester', [
        'methods' => 'POST',
        'callback' => 'save_semseter'
    ]);

    register_rest_route( 'sr/v1', 'semester', [
        'methods' => 'GET',
        'callback' => 'get_semseter'
    ]);

    register_rest_route( 'sr/v1', 'class', [
        'methods' => 'POST',
        'callback' => 'save_classes'
    ]);

    register_rest_route( 'sr/v1', 'class', [
        'methods' => 'GET',
        'callback' => 'get_classes'
    ]);

    register_rest_route( 'sr/v1', 'course', [
        'methods' => 'POST',
        'callback' => 'save_course'
    ]);

    register_rest_route( 'sr/v1', 'course', [
        'methods' => 'GET',
        'callback' => 'get_course'
    ]);

    register_rest_route( 'sr/v1', 'subject', [
        'methods' => 'POST',
        'callback' => 'save_sub'
    ]);

    register_rest_route( 'sr/v1', 'subject', [
        'methods' => 'GET',
        'callback' => 'get_sub'
    ]);

    register_rest_route( 'sr/v1', '4th/subject', [
        'methods' => 'POST',
        'callback' => 'save_4th_sub'
    ]);

    register_rest_route( 'sr/v1', '4th/subject', [
        'methods' => 'GET',
        'callback' => 'get_4th_sub'
    ]);

    register_rest_route( 'sr/v1', 'exam', [
        'methods' => 'POST',
        'callback' => 'save_exam'
    ]);

    register_rest_route( 'sr/v1', 'exam', [
        'methods' => 'GET',
        'callback' => 'get_exam'
    ]);

    register_rest_route( 'sr/v1', 'grade', [
        'methods' => 'POST',
        'callback' => 'save_grade'
    ]);

    register_rest_route( 'sr/v1', 'grade', [
        'methods' => 'GET',
        'callback' => 'get_grade'
    ]);

    register_rest_route( 'sr/v1', 'delete/grade', [
        'methods' => 'POST',
        'callback' => 'delete_grade'
    ]);

    register_rest_route( 'sr/v1', 'credentials', [
        'methods' => 'GET',
        'callback' => 'get_credentials'
    ]);

    register_rest_route( 'sr/v1', 'credentials', [
        'methods' => 'POST',
        'callback' => 'save_credentials'
    ]);

    register_rest_route( 'sr/v1', 'config', [
        'methods' => 'GET',
        'callback' => 'get_config'
    ]);

    register_rest_route( 'sr/v1', 'config', [
        'methods' => 'POST',
        'callback' => 'save_config'
    ]);

    register_rest_route( 'sr/v1', 'config_grade', [
        'methods' => 'GET',
        'callback' => 'get_config_grade'
    ]);

    register_rest_route( 'sr/v1', 'config_grade', [
        'methods' => 'POST',
        'callback' => 'save_config_grade'
    ]);

    register_rest_route( 'sr/v1', '4th_sub_point', [
        'methods' => 'GET',
        'callback' => 'get_4th_sub_point'
    ]);

    register_rest_route( 'sr/v1', '4th_sub_point', [
        'methods' => 'POST',
        'callback' => 'save_4th_sub_point'
    ]);
});

/**
 * 
 * Custom Admin Menu.
 *
 * @since 1.0.0
 *
 */
function std_res_admin_menu()
{

    add_menu_page(__('Plugin Settings', 'Student-Results'), __('Student Result', 'Student-Results'), 'manage_options', 'std_res_settigns', 'std_res_react_admin_page', 'dashicons-admin-settings', 250);

}

/**
 * 
 * Plugin Settings Action Link.
 *
 * @since 1.0.0
 *
 */
function std_res_settings_link($links)
{
    // Add Custom Settings Link
    $settings_link = '<a href="admin.php?page=std_res_settigns">Settings</a>';
    array_push($links, $settings_link);
    return $links;
}

/**
 * 
 * Find CSV File Delimiter.
 *
 * @since 1.0.0
 *
 */
function getFileDelimiter ($file, $checkLines = 2)
{
    $file = new SplFileObject($file);
    $delimiters = array(
        ',',
        '\t',
        ';',
        '|',
        ':'
    );
    $results = array();
    $i = 0;
        while($file->valid() && $i <= $checkLines){
        $line = $file->fgets();
        foreach ($delimiters as $delimiter){
            $regExp = '/['.$delimiter.']/';
            $fields = preg_split($regExp, $line);
            if(count($fields) > 1){
                if(!empty($results[$delimiter])){
                    $results[$delimiter]++;
                } else {
                    $results[$delimiter] = 1;
                }   
            }
        }
        $i++;
    }
    $results = array_keys($results, max($results));
    return $results[0];
};

/**
 * 
 * React Pluging admin page view.
 *
 * @since 1.0.0
 *
 */
function std_res_react_admin_page()
{
    echo '<div class=""><div id="std-res-option-page"></div></div>';
}

/**
 * 
 * React Rest API for Showing Results.
 *
 * @since 1.0.0
 *
 */
function sr_show_result()
{
    global $wpdb;

    $result_tbl = $wpdb->prefix ."std_res_beta_result";
    
    $filtered_result = [];
    $results = $wpdb->get_results ("SELECT res_info FROM $result_tbl");
    
    $result = [];
    foreach ($results as $res){
        $filtered = [];
        $result[] = json_decode($res->res_info, true);
        $filter_res = json_decode($res->res_info, true);

        foreach( $filter_res as $key => $value){
            $myarray = (array)$value;
            $key = key($myarray);

            if( !empty($value[$key]) && $key != 'sl' ){
                $filtered += [ $key => $value[$key]];
            }

        }
        array_push($filtered_result, $filtered);
    }
    
    if( empty($filtered_result) ){
        return $result_tbl;
    }
    return ($filtered_result);
}

/**
 * 
 * React Rest API for Show publishing Results.
 *
 * @since 1.0.0
 *
 */
function sr_get_publishing_result()
{
    global $wpdb;

    $result_tbl = $wpdb->prefix ."std_res_beta_result";
    

    $results = $wpdb->get_results ("SELECT res_info FROM $result_tbl");
    
    $filtered_result = [];
    foreach ($results as $res){
        // Search to see if the result is published or not.
        $result_decoded = json_encode($res->res_info);        
        $resultsStatus = $wpdb->get_row( $wpdb->prepare( "SELECT res_subject FROM $result_tbl WHERE res_info = $result_decoded" ) );
        
        
        $result = json_decode($res->res_info);

        $resData = ['dept'=>'', 'session' => '', 'class' => '', 'semester' => '', 'status' => $resultsStatus->res_subject];
        foreach($result as $res){
            if(key($res) == 'session'){
                    $resData['session'] = $res->session;
            }
            if(key($res) == 'dept'){
                $resData['dept'] = $res->dept;
            }
            if(key($res) == 'class'){
                $resData['class'] = $res->class;
            }

            if(key($res) == 'semester'){
                $resData['semester'] = $res->semester;
            }
        }
        if(!empty($resData)){
            $filtered_result[] = $resData;
        }

    };

    // Removes duplicate objects.
    $filtered_results = array_map('unserialize', array_unique(array_map('serialize', $filtered_result)));
   
    return($filtered_results); 
}

/**
 * 
 * React Rest API for Showing students.
 *
 * @since 1.0.0
 *
 */
function sr_get_students()
{
    global $wpdb;

    $student_tbl = $wpdb->prefix ."std_res_beta_students";
    

    $students = $wpdb->get_results ("SELECT std_info FROM $student_tbl");
    
    $students_data = [];
    foreach ($students as $std){
        $students_data[] = json_decode($std->std_info);
    }

    if( empty($students) ){
        return $student_tbl;
    }
    return($students_data); 
}

/**
 * 
 * Delete Results.
 *
 * @since 1.0.0
 *
 */
function sr_delete_result( $req )
{
    global $wpdb;
    $result_tbl = $wpdb->prefix . 'std_res_beta_result';
    $field = 'res_info';
    $request = $req->get_params();
    $delete = $wpdb->delete( $result_tbl, array( $field => json_encode($request) ) );

    return $delete;
}

/**
 * 
 * Delete Students.
 *
 * @since 1.0.0
 *
 */
function sr_delete_student( $req )
{
    global $wpdb;
    $student_tbl = $wpdb->prefix . 'std_res_beta_students';
    $field = 'std_info';
    $request = $req->get_params();
    $delete = $wpdb->delete( $student_tbl, array( $field => json_encode($request) ) );

    return $delete;
}


/**
 * 
 * Show Search Results.
 *
 * @since 1.0.0
 *
 */
function sr_show_search_result( $req )
{
    global $wpdb;
    $result_tbl = $wpdb->prefix . 'std_res_beta_result';
    $field = 'res_info';
    $request = $req->get_params();
    $res_info = [];

    $results = $wpdb->get_results($wpdb->prepare("SELECT {$field} FROM {$result_tbl} WHERE res_subject = 'published'"), ARRAY_A);

    $filteredData = [];

    foreach($results as $res){
        $res_info[] = json_decode($res['res_info']);
        
        foreach($res_info as $r ){
            $roll = '';
            $session = '';
            $semester = '';
            $class = '';
            $exam = '';
       
            foreach($r as $dt){
                if(!empty($dt->class)){
                    $class = $dt->class;
                };
                if(!empty($dt->roll)){
                    $roll = $dt->roll;
                }elseif
                    (!empty($dt->session)){
                    $session = $dt->session;
                };
                if(!empty($dt->semester)){
                    $semester = $dt->semester;
                };
                if(!empty($dt->Exam)){
                    $exam = strtolower($dt->Exam);
                };
            }

            $option = "";
                $reque = "";
                if(!empty($class)){
                    $option = $class;
                    $reque = 'class';
                }elseif(!empty($semester)){
                    $option = $semester;
                    $reque = 'semester';
                }

            if(  $session == $request['session'] && $option == $request[$reque]){
                
                if( $roll == $request['roll'] && $exam == $request['exam'] ){
                    $filteredData [] = $r;
                }
            }
        }
        
    }

    return $filteredData;
}

/**
 * 
 * unpublish Results.
 *
 * @since 1.0.0
 *
 */
function sr_unpublish_result( $req )
{
    global $wpdb;
    $result_tbl = $wpdb->prefix . 'std_res_beta_result';
    $field = 'res_info';
    $request = $req->get_params();
    $res_info = [];
    $updated_rows = 0;
  
    $results = $wpdb->get_results($wpdb->prepare("SELECT {$field} FROM {$result_tbl}"), ARRAY_A);

  

    foreach($results as $res){
        $res_info [] = json_decode($res['res_info']);
        $classes = [];
        foreach($res_info as $r ){
            $session = '';
            $semester = '';
            $class = '';
            $dept = '';
       
            foreach($r as $dt){
                if(!empty($dt->class)){
                    $class = $dt->class;
                };
                if(!empty($dt->session)){
                    $session = $dt->session;
                };
                if(!empty($dt->semester)){
                    $semester = $dt->semester;
                };
                if(!empty($dt->dept)){
                    $dept = strtolower($dt->dept);
                };
            }

            $classes[] = $class;
            $option = "";
            $reque = "";

            if(!empty($class)){
                $option = $class;
                $reque = 'class';
            }elseif(!empty($semester)){
                $option = $semester;
                $reque = 'semester';
            }

            if(strtolower($dept) == strtolower($request['dept']) && $session == $request['session']){
                
                if( $option === $request[$reque]){

                   $updateStatus = $wpdb->update( $result_tbl, array('res_subject' => "not published"), array('res_info' => json_encode($r)));
                    
                    if($updateStatus){
                        $updated_rows++;
                    }
                }
                
            }
        }
        
    }
    return($updated_rows);
}

/**
 * 
 * Publish Results.
 *
 * @since 1.0.0
 *
 */
function sr_publish_result( $req )
{
    global $wpdb;
    $result_tbl = $wpdb->prefix . 'std_res_beta_result';
    $field = 'res_info';
    $request = $req->get_params();
    $res_info = [];
    $updated_rows = 0;

    $results = $wpdb->get_results($wpdb->prepare("SELECT {$field} FROM {$result_tbl}"), ARRAY_A);

  

    foreach($results as $res){
        $res_info [] = json_decode($res['res_info']);
        $classes = [];
        foreach($res_info as $r ){
            $session = '';
            $semester = '';
            $class = '';
            $dept = '';
       
            foreach($r as $dt){
                if(!empty($dt->class)){
                    $class = $dt->class;
                };
                if(!empty($dt->session)){
                    $session = $dt->session;
                };
                if(!empty($dt->semester)){
                    $semester = $dt->semester;
                };
                if(!empty($dt->dept)){
                    $dept = strtolower($dt->dept);
                };
            }

            $classes[] = $class;
            $option = "";
            $reque = "";

            if(!empty($class)){
                $option = $class;
                $reque = 'class';
            }elseif(!empty($semester)){
                $option = $semester;
                $reque = 'semester';
            }

            if(strtolower($dept) == strtolower($request['dept']) && $session == $request['session']){
                
                if( $option === $request[$reque]){

                   $updateStatus =  $wpdb->update( $result_tbl, array('res_subject' => "published"), array('res_info' => json_encode($r)));
  
                    if($updateStatus){
                        $updated_rows++;
                    }
                }
            }
        }
        
    }
    return($updated_rows);
}

/**
 * 
 * React Rest API for Save Student.
 *
 * @since 1.0.0
 *
 */
function sr_save_students($req)
{
    $std_name = '';
    $request = $req->get_params();

    foreach( $request as $r){

        $name = key($r);

        if($name == 'name'){
            $std_name = $r['name'];
        };
    };
    $credentials = get_option('credentials');
    
    $request[] = [ 'dept' => $credentials['dept'] ];       
    $request[] = [ 'session' => $credentials['session'] ];
    $request[] = [ 'semester' => $credentials['semester'] ];
    $request[] = [ 'class' => $credentials['class'] ];    
        
    global $wpdb;
    $wpdb->insert( $wpdb->prefix . 'std_res_beta_students', array('std_name' => $std_name ,'std_info' => json_encode($request), 'time' => current_time('Y-m-d')));
    
    return json_encode($request);
    

}

/**
 * 
 * React Rest API for Save Student.
 *
 * @since 1.0.0
 *
 */
function sr_save_result($req)
{
    global $wpdb;
    $requests = $req->get_params();
    $sub_tbl = $wpdb->prefix . 'std_res_beta_subject'; 
    $totalInserted = 0;

    $subs = $wpdb->get_results( $wpdb->prepare( "SELECT subject_name FROM {$sub_tbl}" ));

    $sub_data = [];
    foreach($subs as $sub){
        $sub_data[] = $sub->subject_name;
    }   

    $credentials = get_option('credentials');
    $grade_tbl = $wpdb->prefix . 'std_res_beta_grade'; 
    $grades = $wpdb->get_results( $wpdb->prepare( "SELECT * FROM {$grade_tbl}" ));
    
    foreach($requests as $request){
        $sub_marks = [];
        $sub_total = '';
        $sub_grade_point = [];
        $grade_point = [];
        $keys = array_keys($request);

        $result = [];
        $name = "default";


        foreach($keys as $key){
            $result[] = [$key => $request[$key]];
            if(strtolower($key) == 'name'){
                $name = $request[$key];
            }
        }
        foreach($sub_data as $sub){
            foreach($keys as $key){
                if(strtolower($key) == strtolower($sub)){
                    $sub_marks[] = $request[$key];

                    foreach($grades as $grade){
                        if($request[$key] >= $grade->grade_min_mark && $request[$key] <= $grade->grade_max_mark ){
                            $sub_grade_point[] = [ $key => $grade->grade_point];
                            $grade_point[] = $grade->grade_point;
                        }
                    }   
                }
            }   
        }
        if(!empty($sub_marks)){
            $sub_total = array_sum($sub_marks);
        }

        if(!empty($result) && !empty($name)) { 
            $credentials['dept'] ? $result[] = [ 'dept' => $credentials['dept'] ] : null;
            $credentials['session'] ? $result[] = [ 'session' => $credentials['session'] ] : null;
            $credentials['semester'] ? $result[] = [ 'semester' => $credentials['semester'] ] : null;
            $credentials['class'] ? $result[] = [ 'class' => $credentials['class'] ] : null;

            if(!empty($sub_total)){
                $result[] = [ 'total' => $sub_total ];
            }

            if(!empty($grade_point)){
                $sub_grade_total = array_sum($grade_point);
                $items = count($grade_point);
                $cgpa = $sub_grade_total / $items;
                $result[] = [ 'cgpa' => round($cgpa, 2) ];
            }

            // Insert Record
            $wpdb->insert($wpdb->prefix . 'std_res_beta_result', array(
                'res_info' => json_encode($result), 
                'res_subject' => 'not published'
            ));

            if($wpdb->insert_id > 0){
                $totalInserted++;
            }
        }

       
    }
    return $totalInserted;   
}

/**
 * 
 * React Rest API for Save CSV File Of Student Results.
 *
 * @since 1.0.0
 *
 */
function sr_save_imported_result($req)
{ 
    global $wpdb;

    $result_tbl = $wpdb->prefix . 'std_res_beta_result';
    $sub_tbl = $wpdb->prefix . 'std_res_beta_subject';
    $grade_tbl = $wpdb->prefix . 'std_res_beta_grade';
    $request = $req->get_params();

    $sub_data = [];
    $subs = $wpdb->get_results( $wpdb->prepare( "SELECT subject_name FROM {$sub_tbl} " ));
    

    foreach($subs as $sub){
        $sub_data[] = $sub->subject_name;
    }   

    $grades = $wpdb->get_results( $wpdb->prepare( "SELECT * FROM {$grade_tbl}" ));

   
    if(isset($request['title'])){

        $filetype = wp_check_filetype($request['title']);

        if(!empty( $filetype['ext'] )  == 'csv'){

            $totalInserted = 0;
            $filename = $_FILES['file']['tmp_name'];
            $csvFile = fopen($filename, 'r');
            $delimiter = getFileDelimiter($filename);  // Finds csv separator.
            $fieldTitle = array_map("utf8_encode", fgetcsv($csvFile, '1000', $delimiter));
            
             // Get credentials
            $credentials = get_option('credentials');
            
            while(($csvData = fgetcsv($csvFile, '1000', $delimiter )) !== FALSE){
                
                $csvData = array_map("utf8_encode", $csvData);
                $fieldItems = count($csvData);
                $indexCount = 0;
                $res_info = [];

                $sub_marks = [];
                $sub_total = '';
                $sub_grade_point = [];
                $grade_point = [];
                

                foreach($csvData as $data){
                    if($indexCount < $fieldItems ){
                        if($indexCount == 0){
                            $res_info_data[] = [trim($fieldTitle[$indexCount]) => $data];
                            $key = key($res_info_data[0]);
                            $d = str_replace('ï»¿"', '', key($res_info_data[0]));
                            $final_data = str_replace('"', '', $d );

                            $res_info[] = [ $final_data => $data ];
                        }else{
                            $res_info[] = [trim($fieldTitle[$indexCount]) => $data];
                        }                                        
                        $indexCount++;
                    };
                };
                
                $credentials['dept'] ? $res_info[] = [ 'dept' => $credentials['dept'] ] : null;
                $credentials['session'] ? $res_info[] = [ 'session' => $credentials['session'] ] : null;
                $credentials['semester'] ? $res_info[] = [ 'semester' => $credentials['semester'] ] : null;
                $credentials['class'] ? $res_info[] = [ 'class' => $credentials['class'] ] : null;

                $name = trim($csvData[0]);
                $keys = array_keys($res_info);

                
                foreach($sub_data as $sub){
                    foreach($keys as $key){                        
                        if(strtolower(implode(" ",array_keys(($res_info[$key])))) == strtolower($sub)){
                            $sub_marks[] = ($res_info[$key]);
                            foreach($grades as $grade){
                                if(implode(" ",array_values(($res_info[$key]))) >= $grade->grade_min_mark && implode(" ",array_values(($res_info[$key]))) <= $grade->grade_max_mark ){
                                  
                                    $key_res = (implode(" ",array_keys(($res_info[$key]))));
                                    $sub_grade_point[] = [ $key_res => $grade->grade_point];
                                    $grade_point[] = $grade->grade_point;      
                                }
                            }      
                        }
                    }   
                }

                if(!empty($sub_marks)){
                    $marks = [];
                    foreach($sub_marks as $sub_mark){
                        $marks[] = implode(" ",array_values(($sub_mark)));
                    }

                    $sub_total = array_sum($marks);
                }

                if(!empty($sub_total)){
                    $res_info[] = [ 'total' => $sub_total ];
                }

                // return $grade_point;
                if(!empty($grade_point)){
                    $sub_grade_total = array_sum($grade_point);
                    $items = count($grade_point);
                    $cgpa = $sub_grade_total / $items;
                    $res_info[] = [ 'cgpa' => round($cgpa, 2) ];
                }

                $info = json_encode($res_info);
 
                $cntSQL = "SELECT count(*) as count FROM {$result_tbl} where res_info='".$info."'";
                $record = $wpdb->get_results($cntSQL, OBJECT);

                if($record[0]->count==0){
                    if(!empty($name) && !empty($info)) { 
                        // Insert Record
                        $wpdb->insert($result_tbl, array(
                            'res_info' => $info,
                            'res_subject' => 'not published'
                        ));

                        if($wpdb->insert_id > 0){
                            $totalInserted++;
                        }
                    }
                }
            }
        }
    }
    return ($totalInserted);
}

/**
 * 
 * React Rest API for Save CSV File Of Students.
 *
 * @since 1.0.0
 *
 */
function sr_save_imported_students($req)
{ 
    global $wpdb;
    // global $students_table;
     $students_table = $wpdb->prefix . 'std_res_beta_students' ;
   
    $request = $req->get_params();

    if(isset($request['title'])){

        $filetype = wp_check_filetype($request['title']);

        if(!empty( $filetype['ext'] )  == 'csv'){

            $totalInserted = 0;
            $filename = $_FILES['file']['tmp_name'];
            $csvFile = fopen($filename, 'r');
            $delimiter = getFileDelimiter($filename);  // Finds csv separator.
            $fieldTitle = array_map("utf8_encode", fgetcsv($csvFile, '1000', $delimiter));

            // Get credentials
            $credentials = get_option('credentials');
            
            while(($csvData = fgetcsv($csvFile, '1000', $delimiter )) !== FALSE){
                
                $csvData = array_map("utf8_encode", $csvData);
                $fieldItems = count($csvData);
                $indexCount = 0;
                $std_info = [];
                foreach($csvData as $data){
                    if($indexCount < $fieldItems ){
                        $std_info[] = [trim($fieldTitle[$indexCount]) => $data];
                        $indexCount++;
                    };
                };

                $std_info[] = [ 'dept' => $credentials['dept'] ];
                $std_info[] = [ 'session' => $credentials['session'] ];
                $std_info[] = [ 'semester' => $credentials['semester'] ];
                $std_info[] = [ 'class' => $credentials['class'] ];

                $name = trim($csvData[0]);
                $info = json_encode($std_info);
                                
                // Check records
                $cntSQL = "SELECT count(*) as count FROM {$students_table} where std_info='".$info."'";
                $record = $wpdb->get_results($cntSQL, OBJECT);

                if($record[0]->count==0){
                    if(!empty($name) && !empty($info)) { 
                        // Insert Record
                        $wpdb->insert($students_table, array(
                            'std_info'    => $info, 
                        ));

                        if($wpdb->insert_id > 0){
                            $totalInserted++;
                        }
                    }
                }
            }
        }
    }

    return ($totalInserted);
}

/**
 * 
 * 
 * Get table heads.
 *
 * @since 1.0.0
 *
 */
function get_theads()
{
    global $wpdb;
    $result_tbl = $wpdb->prefix . 'std_res_beta_result';

    $field = 'res_info';

    $row = $wpdb->get_row( $wpdb->prepare( "SELECT {$field} FROM {$result_tbl}" ), ARRAY_A);
    
   return json_decode($row['res_info']);
}

/**
 * 
 * 
 * Search student result.
 *
 * @since 1.0.0
 *
 */
function sr_search_students($req)
{
    global $wpdb;
    $result_tbl = $wpdb->prefix . 'std_res_beta_result';
    $field = 'res_info';
    $request = $req->get_params();
    $res_info = [];

    $results = $wpdb->get_results($wpdb->prepare("SELECT {$field} FROM {$result_tbl}"), ARRAY_A);

    foreach($results as $res){
        $res_info[] = json_decode($res['res_info']);
    }

    $data = [];
    
    foreach($res_info as $r ){
        $row = '';
        $obj = $request['key'];

        foreach($r as $dt){
            if(!empty($dt->$obj)){
                $row = $dt->$obj;
            };
        }
        if($row == $request['val']){
            $data [] = $r;
        }
    } 
   return ($data);
}

/**
 * 
 * 
 * Get depertments table.
 *
 * @since 1.0.0
 *
 */
function get_dept()
{
    global $wpdb;
    $dept_tbl = $wpdb->prefix . 'std_res_beta_dept';
    $field = 'dept_name';

    $depts = $wpdb->get_results( $wpdb->prepare( "SELECT {$field} FROM {$dept_tbl}" ));

    $depertments = [];

    foreach($depts as $dept){
        $depertments[] = $dept->dept_name;
    }
    
   return $depertments;
}

/**
 * 
 * 
 * Save depertments.
 * 
 * @since 1.0.0
 *
 */
function save_dept($req)
{
    global $wpdb;
    $requests = $req->get_params();
    $dept_tbl = $wpdb->prefix . 'std_res_beta_dept';
    
    $wpdb->query("TRUNCATE TABLE $dept_tbl");

    foreach($requests as $request){
        $wpdb->insert($dept_tbl, array(
        'dept_name' => $request
        ));
    }

   return $requests;
}

/**
 * 
 * 
 * Get table sessions.
 *
 * @since 1.0.0
 *
 */
function get_session()
{
    global $wpdb;
    $session_tbl = $wpdb->prefix . 'std_res_beta_session';
    $field = 'session_name';

    $sessions = $wpdb->get_results( $wpdb->prepare( "SELECT {$field} FROM {$session_tbl}" ));

    $sessions_data = [];

    foreach($sessions as $session){
        $sessions_data[] = $session->session_name;
    }
    
   return $sessions_data;
}

/**
 * 
 * 
 * Save sessions.
 *
 * @since 1.0.0
 *
 */
function save_session($req)
{
    global $wpdb;
    $requests = $req->get_params();
    $session_tbl = $wpdb->prefix . 'std_res_beta_session';
    $field = 'session_name';

    $wpdb->query("TRUNCATE TABLE $session_tbl");

    foreach($requests as $request){
        $wpdb->insert($session_tbl, array(
        $field => $request
        ));
    }

   return $requests;
}

/**
 * 
 * 
 * Get table semster.
 *
 * @since 1.0.0
 *
 */
function get_semseter()
{
    global $wpdb;
    $semester_tbl = $wpdb->prefix . 'std_res_beta_semester';
    $field = 'semester_name';

    $semesters = $wpdb->get_results( $wpdb->prepare( "SELECT {$field} FROM {$semester_tbl}" ));

    $semester_data = [];

    foreach($semesters as $semester){
        $semester_data[] = $semester->semester_name;
    }
    
   return $semester_data;
}

/**
 * 
 * 
 * Save semester.
 *
 * @since 1.0.0
 *
 */
function save_semseter($req)
{
    global $wpdb;
    $requests = $req->get_params();
    $semester_tbl = $wpdb->prefix . 'std_res_beta_semester';
    $field = 'semester_name';

    $wpdb->query("TRUNCATE TABLE $semester_tbl");

    foreach($requests as $request){
        $wpdb->insert($semester_tbl, array(
        $field => $request
        ));
    }

   return $requests;
}

/**
 * 
 * 
 * Get table Class.
 *
 * @since 1.0.0
 *
 */
function get_classes()
{
    global $wpdb;
    $class_tbl = $wpdb->prefix . 'std_res_beta_class';
    $field = 'class_name';

    $classes = $wpdb->get_results( $wpdb->prepare( "SELECT {$field} FROM {$class_tbl}" ));

    $class_data = [];

    foreach($classes as $class){
        $class_data[] = $class->class_name;
    }
    
   return $class_data;
}

/**
 * 
 * 
 * Save Class.
 *
 * @since 1.0.0
 *
 */
function save_classes($req)
{
    global $wpdb;
    $requests = $req->get_params();
    $class_tbl = $wpdb->prefix . 'std_res_beta_class';
    $field = 'class_name';

    $wpdb->query("TRUNCATE TABLE $class_tbl");

    foreach($requests as $request){
        $wpdb->insert($class_tbl, array(
        $field => $request
        ));
    }

   return $requests;
}

/**
 * 
 * 
 * Get table Course.
 *
 * @since 1.0.0
 *
 */
function get_course()
{
    global $wpdb;
    $course_tbl = $wpdb->prefix . 'std_res_beta_course';
    $field = 'course_name';

    $courses = $wpdb->get_results( $wpdb->prepare( "SELECT {$field} FROM {$course_tbl}" ));

    $course_data = [];

    foreach($courses as $course){
        $course_data[] = $course->course_name;
    }
    
//    return ("semsters!!!!");
   return $course_data;
}

/**
 * 
 * 
 * Save Course.
 *
 * @since 1.0.0
 *
 */
function save_course($req)
{
    global $wpdb;
    $requests = $req->get_params();
    $course_tbl = $wpdb->prefix . 'std_res_beta_course';
    $field = 'course_name';

    $wpdb->query("TRUNCATE TABLE $course_tbl");

    foreach($requests as $request){
        $wpdb->insert($course_tbl, array(
        $field => $request
        ));
    }

   return $requests;
}

/**
 * 
 * 
 * Get table Subjects.
 *
 * @since 1.0.0
 *
 */
function get_sub()
{
    global $wpdb;
    $sub_tbl = $wpdb->prefix . 'std_res_beta_subject';
    $field = 'subject_name';

    $subs = $wpdb->get_results( $wpdb->prepare( "SELECT {$field} FROM {$sub_tbl}" ));

    $sub_data = [];

    foreach($subs as $sub){
        $sub_data[] = $sub->subject_name;
    }
    
    return $sub_data;
}

/**
 * 
 * 
 * Save Course.
 *
 * @since 1.0.0
 *
 */
function save_sub($req)
{
    global $wpdb;
    $requests = $req->get_params();
    $sub_tbl = $wpdb->prefix . 'std_res_beta_subject';
    $field = 'subject_name';

    $wpdb->query("TRUNCATE TABLE $sub_tbl");

    foreach($requests as $request){
        $wpdb->insert($sub_tbl, array(
        $field => $request
        ));
    }

   return $requests;
}

/**
 * 
 * 
 * Get table 4th Subjects.
 *
 * @since 1.0.0
 *
 */
function get_4th_sub()
{
    global $wpdb;
    $sub_tbl = $wpdb->prefix . 'std_res_beta_subject';
    $field = 'subject_name';

    $subs = $wpdb->get_results( $wpdb->prepare( "SELECT {$field} FROM {$sub_tbl} where subject_info='4th'" ));

    $sub_data = [];

    foreach($subs as $sub){
        $sub_data[] = $sub->subject_name;
    }
    
    return $sub_data;
}

/**
 * 
 * 
 * Save 4th Subject.
 *
 * @since 1.0.0
 *
 */
function save_4th_sub($req)
{
    global $wpdb;
    $requests = $req->get_params();
    
    // return $requests;


    $sub_tbl = $wpdb->prefix . 'std_res_beta_subject';
    $field = 'subject_name';

    // $wpdb->query("TRUNCATE TABLE $sub_tbl");
    $wpdb->delete($sub_tbl, [
        'subject_info' => '4th',
    ] );

    foreach($requests as $request){
        $wpdb->insert($sub_tbl, array(
        $field => $request,
        'subject_info' => '4th',
        ));
    }

   return $requests;
}

/**
 * 
 * 
 * Get table Exams.
 *
 * @since 1.0.0
 *
 */
function get_exam()
{
    global $wpdb;
    $exam_tbl = $wpdb->prefix . 'std_res_beta_exams';
    $field = 'exam_name';

    $exams = $wpdb->get_results( $wpdb->prepare( "SELECT {$field} FROM {$exam_tbl}" ));

    $exam_data = [];

    foreach($exams as $exam){
        $exam_data[] = $exam->exam_name;
    }
    
    return $exam_data;
}

/**
 * 
 * 
 * Save Exams.
 *
 * @since 1.0.0
 *
 */
function save_exam($req)
{
    global $wpdb;
    $requests = $req->get_params();
    $exam_tbl = $wpdb->prefix . 'std_res_beta_exams';
    $field = 'exam_name';

    $wpdb->query("TRUNCATE TABLE $exam_tbl");

    foreach($requests as $request){
        $wpdb->insert($exam_tbl, array(
        $field => $request
        ));
    }

   return $requests;
}

/**
 * 
 * 
 * Get Grades.
 *
 * @since 1.0.0
 *
 */
function get_grade()
{
    global $wpdb;
    $grade_tbl = $wpdb->prefix . 'std_res_beta_grade';
   
    $grades = $wpdb->get_results( $wpdb->prepare( "SELECT * FROM {$grade_tbl}" ));

    return $grades;
   
}

/**
 * 
 * 
 * Save Grades.
 *
 * @since 1.0.0
 *
 */
function save_grade($req)
{
    global $wpdb;
    $requests = $req->get_params();
    $grade_tbl = $wpdb->prefix . 'std_res_beta_grade';
   
    
    $wpdb->insert($grade_tbl, array(
        "grade_title" => $requests['grade'],
        "grade_min_mark" => floatval($requests['from']),
        "grade_max_mark" => floatval($requests['to']),
        "grade_point" => floatval($requests['point']),
    
    ));

   return $requests;
}

/**
 * 
 * 
 * Get Grades.
 *
 * @since 1.0.0
 *
 */
function get_4th_sub_point()
{
    $points_diff = get_option('4th_sub_point_diff');
   

    return $points_diff;
   
}

/**
 * 
 * 
 * Save Grades.
 *
 * @since 1.0.0
 *
 */
function save_4th_sub_point($req)
{
    $requests = $req->get_params();

    update_option('4th_sub_point_diff', $requests);

   return $requests;
}

/**
 * 
 * 
 * Delete Grades.
 *
 * @since 1.0.0
 *
 */
function delete_grade($req)
{
    global $wpdb;
    $grade_id = $req->get_params();
    $grade_tbl = $wpdb->prefix . 'std_res_beta_grade';
    $field = 'id';

    $wpdb->delete($grade_tbl, [
        $field => $grade_id[0],
    ]);

   return $grade_id;
}

/**
 * 
 * 
 * Get Credentials.
 *
 * @since 1.0.0
 *
 */
function get_credentials()
{
    $credentials = get_option('credentials');

    return $credentials;
}

/**
 * 
 * 
 * Save Credentials.
 *
 * @since 1.0.0
 *
 */
function save_credentials($req)
{
    $requests = $req->get_params();

    update_option('credentials', $requests);
    
   return $requests;
}

/**
 * 
 * 
 * Get Configurations.
 *
 * @since 1.0.0
 *
 */
function get_config()
{
    $config_by = get_option( 'config_by' );

    return $config_by;

}

/**
 * 
 * 
 * Save Configurations.
 *
 * @since 1.0.0
 *
 */
function save_config($req)
{
    $requests = $req->get_params();

    update_option('config_by', $requests);
    
   return $requests;
}

/**
 * 
 * 
 * Get Grade Configurations.
 *
 * @since 1.0.0
 *
 */
function get_config_grade()
{
    $config_grade_by = get_option( 'config_grade_by' );

    return $config_grade_by;

}

/**
 * 
 * 
 * Save Grade Configurations.
 *
 * @since 1.0.0
 *
 */
function save_config_grade($req)
{
    $requests = $req->get_params();

    update_option('config_grade_by', $requests);
    
   return $requests;
}

/**
 * 
 * 
 * Enqueue admin  javascript.
 *
 * @since 1.0.0
 *
 */
function std_res_enqueue_admin_script()
{
     $currentScreen = get_current_screen();
     if($currentScreen->id == 'toplevel_page_std_res_settigns'){ 
        $base_url = get_site_url( __FILE__ );
         
        wp_enqueue_script('std_res_admin_react_scripts', plugin_dir_url(dirname(__FILE__)) . 'admin/build/index.js');
        wp_localize_script('std_res_admin_react_scripts' , 'api_base_url', [ $base_url ] );
    }

}



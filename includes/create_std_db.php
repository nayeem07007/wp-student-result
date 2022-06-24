<?php 
function std_result_create_db() {
    
    require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );  
    
    global $wpdb;

	$charset_collate = $wpdb->get_charset_collate();
	$students_tbl = $wpdb->prefix . 'std_res_beta_students';
	$result_tbl = $wpdb->prefix . 'std_res_beta_result';
    $grade_tbl = $wpdb->prefix . 'std_res_beta_grade';
    $dept_tbl = $wpdb->prefix . 'std_res_beta_dept';
    $class_tbl = $wpdb->prefix . 'std_res_beta_class';
    $session_tbl = $wpdb->prefix . 'std_res_beta_session';
    $course_tbl = $wpdb->prefix . 'std_res_beta_course';
    $exams_tbl = $wpdb->prefix . 'std_res_beta_exams';
    $semester_tbl = $wpdb->prefix . 'std_res_beta_semester';
    $subject_tbl = $wpdb->prefix . 'std_res_beta_subject';

	
	$sql = "CREATE TABLE IF NOT EXISTS $students_tbl (
		id mediumint(9)     NOT NULL AUTO_INCREMENT,
		std_name            varchar(50) NULL,
		std_info             varchar(255) NOT NULL,
		std_status          boolean NULL,
		time datetime DEFAULT '0000-00-00 00:00:00'  NULL,
		UNIQUE KEY id (id)

	) $charset_collate;";

    dbDelta( $sql );

    $sql2 = "CREATE TABLE IF NOT EXISTS $result_tbl (
        id mediumint(9)         NOT NULL AUTO_INCREMENT,
        res_subject             varchar(20) NULL,
        res_subject_code        int(10) NULL,
        res_total_marks         int(10) NULL,
        res_marks_obtained      int(10) NULL,
        res_grade               text NULL,
        res_grade_point         text NULL,
        res_info                text NULL,
        std_id mediumint(9)     NOT NULL,
        UNIQUE KEY id (id)
        -- FOREIGN KEY (std_id) REFERENCES $students_tbl(ID)

    ) $charset_collate;";

    dbDelta( $sql2 );
    
    $sql3 = "CREATE TABLE IF NOT EXISTS $grade_tbl (
        id mediumint(9)         NOT NULL AUTO_INCREMENT,
        grade_title             varchar(20) NULL,
        grade_min_mark          float(9) NULL,
        grade_max_mark          float(9) NULL,
        grade_point             float(9) NULL,
        grade_to_class          varchar(20) NULL,
        UNIQUE KEY id (id)

    ) $charset_collate;";

    dbDelta( $sql3 );

    $sql4 = "CREATE TABLE IF NOT EXISTS $dept_tbl (
        id mediumint(9)         NOT NULL AUTO_INCREMENT,
        dept_name               varchar(100) NULL,
        dept_credit             int(9) NULL,
        dept_info               text NULL,
        UNIQUE KEY id (id)

    ) $charset_collate;";

    dbDelta( $sql4 );

    $sql5 = "CREATE TABLE IF NOT EXISTS $class_tbl (
        id mediumint(9)         NOT NULL AUTO_INCREMENT,
        class_name              varchar(200) NULL,
        class_info              text NULL,
        UNIQUE KEY id (id)

    ) $charset_collate;";

    dbDelta( $sql5 );

    $sql6 = "CREATE TABLE IF NOT EXISTS $session_tbl (
        id mediumint(9)         NOT NULL AUTO_INCREMENT,
        session_name            varchar(120) NULL,
        session_info            text NULL,
        UNIQUE KEY id (id)

    ) $charset_collate;";

    dbDelta( $sql6 );

    $sql7 = "CREATE TABLE IF NOT EXISTS $semester_tbl (
        id mediumint(9)         NOT NULL AUTO_INCREMENT,
        semester_name           varchar(200) NULL,
        semester_credit         varchar(200) NULL,
        semester_info           text NULL,
        UNIQUE KEY id (id)

    ) $charset_collate;";

    dbDelta( $sql7 );

    $sql8 = "CREATE TABLE IF NOT EXISTS $course_tbl (
        id mediumint(9)         NOT NULL AUTO_INCREMENT,
        course_name             varchar(200) NULL,
        course_credit           varchar(200) NULL,
        course_info             text NULL,
        UNIQUE KEY id (id)

    ) $charset_collate;";

    dbDelta( $sql8 );

    $sql9 = "CREATE TABLE IF NOT EXISTS $exams_tbl (
        id mediumint(9)         NOT NULL AUTO_INCREMENT,
        exam_name               varchar(200) NULL,
        exam_credit             varchar(200) NULL,
        exam_info               text NULL,
        UNIQUE KEY id (id)

    ) $charset_collate;";

    dbDelta( $sql9 );

    $sql10 = "CREATE TABLE IF NOT EXISTS $subject_tbl (
        id mediumint(9)         NOT NULL AUTO_INCREMENT,
        subject_name               varchar(200) NULL,
        subject_credit             varchar(200) NULL,
        subject_info               text NULL,
        UNIQUE KEY id (id)

    ) $charset_collate;";

    dbDelta( $sql10 );

}
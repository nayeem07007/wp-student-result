jQuery(document).ready(function ($) {
  ("use strict");

  // Hide table view
  $(".resultView").hide();

  // Initialize needed veriables.
  var api = api_base_url + "/wp-json/sr/v1/search/results";
  var examUrl = api_base_url + "/wp-json/sr/v1/exam";
  var sessionUrl = api_base_url + "/wp-json/sr/v1/session";
  var semesterUrl = api_base_url + "/wp-json/sr/v1/semester";
  var classUrl = api_base_url + "/wp-json/sr/v1/class";
  var results = null;

  // Disable submit button if input input is empty
  $("#searchRes").attr("disabled", true);

  // get options to display
  $.ajax({
    url: examUrl,
    type: "GET",
    dataType: "json",
    success: function (res) {
      addExamOpts(res);
    },
  });

  $.ajax({
    url: sessionUrl,
    type: "GET",
    dataType: "json",
    success: function (res) {
      addSessionOpts(res);
    },
  });

  $.ajax({
    url: semesterUrl,
    type: "GET",
    dataType: "json",
    success: function (res) {
      if (res.length == 0) {
        $("#semester_field").hide();
        return;
      }
      addSemesterOpts(res);
    },
  });

  $.ajax({
    url: classUrl,
    type: "GET",
    dataType: "json",
    success: function (res) {
      if (res.length == 0) {
        $("#class_field").hide();
        return;
      }
      addClassOpt(res);
    },
  });

  // Add exam options
  function addExamOpts(exams) {
    // console.log(exams);
    $.each(exams, function (index, exam) {
      $("#sr_exam").append("<option>" + exam + "</option>");
    });
  }

  // Add session options
  function addSessionOpts(sessions) {
    // console.log(sessions);
    $.each(sessions, function (index, session) {
      $("#sr_session").append("<option>" + session + "</option>");
    });
  }

  // Add semster options
  function addSemesterOpts(semesters) {
    console.log(semesters);
    $.each(semesters, function (index, semester) {
      $("#sr_semester").append("<option>" + semester + "</option>");
    });
  }

  // Add class options
  function addClassOpt(classes) {
    // console.log(classes);
    $.each(classes, function (index, className) {
      $("#sr_class").append("<option>" + className + "</option>");
    });
  }

  // Enable submit button if roll is not empty.
  $("#sr_roll").keyup(function () {
    if ($(this).val().length != 0) $("#searchRes").attr("disabled", false);
    else $("#searchRes").attr("disabled", true);
  });

  // Search Result
  $("#searchRes").click(function (event) {
    event.preventDefault();

    var searchBy = {
      exam: $("#sr_exam").val(),
      session: $("#sr_session").val(),
      semester: $("#sr_semester").val(),
      class: $("#sr_class").val(),
      roll: $("#sr_roll").val(),
    };

    $.ajax({
      url: api,
      type: "post",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(searchBy),
      success: function (data) {
        console.log(data[0]);
        if (data.length > 0) {
          $("#headerTitle").empty();
          $("<h4>Student Reesult</h4>").appendTo("#headerTitle");
        }

        $(".resultView").show();
        generateTable(data[0]);
      },
    });

    // generate result table
    function generateTable(results) {
      console.log(results);
      $("#rtBody").empty();
      $(".resultView").show();
      if (!results) {
        $("#headerTitle").empty();
        $("<h4 class='text-danger'>No result found</h4>").appendTo(
          "#headerTitle"
        );
        return;
      }

      var keys = Object.keys(results);

      $.each(keys, function (index, key) {
        if (Object.keys(results[key]) != "sl") {
          if (Object.keys(results[key]) == "cgpa") {
            console.log(results[key].cgpa.toFixed(2));
            $("#rtBody").append(
              "<tr><th class='col-md-9' scope='row'>" +
              Object.keys(results[key]) +
              "</th><td>" +
              results[key].cgpa.toFixed(2) +
              "</td></tr>"
            );
            return;
          }
          $("#rtBody").append(
            "<tr><th class='col-md-9' scope='row'>" +
              Object.keys(results[key]) +
              "</th><td>" +
              Object.values(results[key]) +
              "</td></tr>"
          );
        }
      });
    }
  });

  // Reset form.
  $("#resFormReset").click(function (event) {
    event.preventDefault();
    $("#SearchResForm").trigger("reset");
    $(".resultView").hide();
    $("#searchRes").attr("disabled", true);
    $("#rtBody").find("th").text("");
    $("#rtBody").find("td").text("");
  });
});

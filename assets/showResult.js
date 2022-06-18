jQuery(document).ready(function ($) {
  ("use strict");
  // Hide fail msg
  $("#fail_msg").hide();

  // Hide table view
  // $(".resultView").hide();

  $("#searchRes").attr("disabled", false); // delete it later

  // Initialize needed veriables.
  var api = api_base_url + "/wp-json/sr/v1/search/results";
  var examUrl = api_base_url + "/wp-json/sr/v1/exam";
  var sessionUrl = api_base_url + "/wp-json/sr/v1/session";
  var semesterUrl = api_base_url + "/wp-json/sr/v1/semester";
  var classUrl = api_base_url + "/wp-json/sr/v1/class";
  var results = null;

  // Disable submit button if input is empty
  // $("#searchRes").attr("disabled", true); enable it
  // Disable validation if input roll is empty
  $("#sr_validate").attr("disabled", "disabled");

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
    if ($(this).val().length != 0) $("#sr_validate").removeAttr("disabled");
    else $("#sr_validate").attr("disabled", "disabled");
  });

  // Validation
  var randomNum1;
  var randomNum2;
  var maxNum = 20;
  var total;

  randomNum1 = Math.ceil(Math.random() * maxNum);
  randomNum2 = Math.ceil(Math.random() * maxNum);
  total = randomNum1 + randomNum2;

  $("#validation_label").prepend(randomNum1 + " + " + randomNum2);

  $("#sr_validate").keyup(function () {
    var input = $(this).val();
    $("#fail_msg").hide();

    // if (input == total) {
    //   console.log("success!!!");
    //   $("#fail_msg").hide();
    //   $("#searchRes").attr("disabled", false);
    // } else {
    //   console.log("failed!!!");
    //   $("#fail_msg").show();
    //   $("#searchRes").attr("disabled", "disabled");
    // }

    $("#searchRes").attr("disabled", false); // delete it later
  });

  // Printing result function
  function printDiv() {
    var divToPrint = document.getElementById("resModalBody");

    var newWin = window.open("", "Print-Window");

    newWin.document.open();

    newWin.document.write(
      '<html><body onload="window.print()">' +
        divToPrint.innerHTML +
        "</div></body></html>"
    );

    newWin.document.close();

    setTimeout(function () {
      newWin.close();
    }, 10);
  }

  // Search Result
  $("#searchRes").click(function (event) {
    event.preventDefault();
    $("#fail_msg").hide();

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
          // $("<h4>Student Reesult</h4>").appendTo("#headerTitle");
        }
        // $(".resultView").show(); enable it if needed
        $("#resDisplayModal").trigger("focus");
        $("#resDisplayModal").show();
        generateTable(data[0]);
      },
    });

    // generate result table
    function generateTable(results) {
      console.log(results);
      $("#rtBody").empty();
      // $(".resultView").show();
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
              "<tr><th class='col-md-3' scope='row'>" +
                Object.keys(results[key]) +
                "</th><td class='col-md-3'>" +
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

  // Print result call
  $("#prin_me_link").click(function () {
    console.log("print clicked!!!");
    printDiv();
    // printDiv("#resModalBody");

    //Hide all other elements other than printarea.
    // $(".resultView").printThis();
    // $(".resultSearch").hide();
    // $("#resDisplayModal").show();

    // $("div:not(#resDisplayModal").hide(); // hide everything that isn't #myDiv
    // $("#resDisplayModal").appendTo("body"); // move #myDiv up to the body
    // window.print();

    // printDiv("#resultView");
    // window.open();
    // window.document.write($(".resultView").html());
    // window.print();
    // setTimeout(function () {
    //   window.close();
    // }, 1000);
    // return false;
  });

  // Reset form.
  $("#resFormReset").click(function (event) {
    event.preventDefault();
    resetRes();
  });

  $("#resDisplayModal").focusout(function () {
    resetRes();
  });

  // Reset function
  function resetRes() {
    $("#resDisplayModal").hide();

    $("#fail_msg").hide();
    $("#SearchResForm").trigger("reset");
    $("#sr_validate").attr("disabled", "disabled");
    // $(".resultView").hide();
    // $("#searchRes").attr("disabled", true); enable it later
    $("#rtBody").find("th").text("");
    $("#rtBody").find("td").text("");
  }
});

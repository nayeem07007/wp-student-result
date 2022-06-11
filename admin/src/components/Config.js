import React, { useState, useEffect, Fragment } from "react";
import Loading from "./UI/Loading";
import Container from "react-bootstrap/esm/Container";
import CreateDept from "./UI/CreateDept";
import AssignClasses from "./UI/AssignClasses";
import AssignSubjects from "./UI/AssignSubjects";
import AssignSession from "./UI/AssignSession";
import AssignExams from "./UI/AssignExams";
import AssignGrade from "./UI/AssignGrade";
import classes from "./Config.module.css";
import AssignCourses from "./UI/AssignCourses";
import AssignSemester from "./UI/AssignSemester";
import axios from "axios";
import Assign4thSubject from "./UI/Assign4thSubject";

const Config = () => {
  const [isLoading, setIsLoading] = useState(false); // turn it back to true
  const [isClass, setIsClass] = useState(Boolean);
  const [isSemester, setIsSemester] = useState(Boolean);
  const [isGpa, setIsGpa] = useState(Boolean);
  const [isCgpa, setIsCgpa] = useState(Boolean);

  const [configBy, setConfigBy] = useState();

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 3000);
  }, []);

  useEffect(() => {
    axios
      .get(api_base_url + "/wp-json/sr/v1/config")
      .then((response) => {
        // console.log(response.data);

        if (response.data[0] == "semester") {
          setIsSemester(true);
          setIsClass(false);
        } else {
          setIsSemester(false);
          setIsClass(true);
        }
      })
      .catch((error) => console.log(error));

    axios
      .get(api_base_url + "/wp-json/sr/v1/config_grade")
      .then((response) => {
        // console.log(response.data);

        if (response.data[0] == "CGPA") {
          setIsCgpa(true);
          setIsGpa(false);
        } else {
          setIsGpa(true);
          setIsCgpa(false);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const selectClass = (e) => {
    setIsClass(true);
    setIsSemester(false);

    const selected = "class";

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    axios
      .post(api_base_url + "/wp-json/sr/v1/config", selected, {
        headers: headers,
      })
      .then((response) => null)
      .catch((error) => console.log(error));
  };

  const selectSemester = (e) => {
    setIsSemester(true);
    setIsClass(false);
    const selected = "semester";
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    axios
      .post(api_base_url + "/wp-json/sr/v1/config", selected, {
        headers: headers,
      })
      .then((response) => null)
      .catch((error) => console.log(error));
  };

  const selectGpa = (e) => {
    setIsGpa(true);
    setIsCgpa(false);
    const selected = "GPA";
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    axios
      .post(api_base_url + "/wp-json/sr/v1/config_grade", selected, {
        headers: headers,
      })
      .then((response) => null)
      .catch((error) => console.log(error));
  };

  const selectCgpa = (e) => {
    setIsGpa(false);
    setIsCgpa(true);
    const selected = "CGPA";
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    axios
      .post(api_base_url + "/wp-json/sr/v1/config_grade", selected, {
        headers: headers,
      })
      .then((response) => null)
      .catch((error) => console.log(error));
  };

  // console.log("class : " + isClass);
  // console.log("semester : " + isSemester);
  return (
    <Fragment>
      {isLoading === true ? (
        <Loading />
      ) : (
        <Container fluid="md" className={classes.container}>
          <div className={classes.radioContainer}>
            <h4>How would you like to maintain students?</h4>
            <div>
              <div className={classes.radio}>
                <label>{"1 . "}</label>
                <input
                  type="radio"
                  onClick={selectClass}
                  checked={isClass}
                  value="Class"
                  name="class"
                />{" "}
                By Class
                <input
                  type="radio"
                  onClick={selectSemester}
                  checked={isSemester}
                  value="Semester"
                  name="class"
                />{" "}
                By Semester
              </div>
              <div className={classes.radio}>
                <label>{"2 . "}</label>
                <input
                  type="radio"
                  onClick={selectGpa}
                  checked={isGpa}
                  value="GPA"
                  name="gpa"
                />{" "}
                GPA
                <input
                  type="radio"
                  onClick={selectCgpa}
                  checked={isCgpa}
                  value="CGPA"
                  name="cgpa"
                />{" "}
                CGPA
              </div>
            </div>
          </div>
          <CreateDept />
          <AssignSession />
          {isSemester && <AssignSemester />}
          {isClass && <AssignClasses />}
          {isSemester && <AssignCourses />}
          {isClass && <AssignSubjects />}
          <AssignExams />
          <AssignGrade />
          <Assign4thSubject />
        </Container>
      )}
    </Fragment>
  );
};

export default Config;

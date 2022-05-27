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

const Config = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isClass, setIsClass] = useState(Boolean);
  const [isSemester, setIsSemester] = useState(Boolean);
  const [configBy, setConfigBy] = useState();

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 3000);
  }, []);

  useEffect(() => {
    axios
      .get(api_base_url + "/wp-json/sr/v1/config")
      .then((response) => {
        console.log(response.data);

        if (response.data[0] == "semester") {
          setIsSemester(true);
          setIsClass(false);
        } else {
          setIsSemester(false);
          setIsClass(true);
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
      .then((response) => console.log(response.data))
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
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  console.log("class : " + isClass);
  console.log("semester : " + isSemester);
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
        </Container>
      )}
    </Fragment>
  );
};

export default Config;

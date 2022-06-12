import React, { Fragment, useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import classes from "./ChooseCredentials.module.css";
import axios from "axios";

const ChooseCredentials = (props) => {
  const [deptOpts, setDeptOpts] = useState([]);
  const [semesterOpts, setSemesterOpts] = useState([]);
  const [sessionOpts, setSessionOpts] = useState([]);
  const [classOpts, setClassOpts] = useState([]);
  const [credentialsData, setCredentialsData] = useState({});
  const [selectBy, setSelectBy] = useState();

  const Cap = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    axios
      .post(api_base_url + "/wp-json/sr/v1/credentials", credentialsData, {
        headers: headers,
      })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }, [credentialsData]);

  useEffect(() => {
    axios
      .get(api_base_url + "/wp-json/sr/v1/dept")
      .then((response) => {
        setDeptOpts(response.data);
      })
      .catch((error) => console.log(error));

    axios
      .get(api_base_url + "/wp-json/sr/v1/session")
      .then((response) => {
        setSessionOpts(response.data);
      })
      .catch((error) => console.log(error));

    axios
      .get(api_base_url + "/wp-json/sr/v1/semester")
      .then((response) => {
        setSemesterOpts(response.data);
      })
      .catch((error) => console.log(error));

    axios
      .get(api_base_url + "/wp-json/sr/v1/class")
      .then((response) => {
        setClassOpts(response.data);
      })
      .catch((error) => console.log(error));

    axios
      .get(api_base_url + "/wp-json/sr/v1/config")
      .then((response) => {
        setSelectBy(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const saveDeptCredentials = (e) => {
    setCredentialsData({ ...credentialsData, dept: e.target.value });
  };

  const saveSessionCredentials = (e) => {
    setCredentialsData({ ...credentialsData, session: e.target.value });
  };

  const saveSemesterCredentials = (e) => {
    setCredentialsData({ ...credentialsData, semester: e.target.value });
  };

  const saveClassCredentials = (e) => {
    setCredentialsData({ ...credentialsData, class: e.target.value });
  };

  {
    Object.keys(credentialsData).length >= 3 && props.onFill(credentialsData);
  }

  // console.log(selectBy);
  return (
    <Fragment>
      <div className={classes.container}>
        <h4>Select Credentials</h4>
        <div className={classes.credentials}>
          <label>Department</label>
          <select
            onChange={saveDeptCredentials}
            className="browser-default custom-select"
          >
            <option> </option>
            {deptOpts &&
              deptOpts.map((opt, i) => (
                <option key={opt + i}>{Cap(opt)}</option>
              ))}
          </select>
          <label>Session</label>
          <select
            onChange={saveSessionCredentials}
            className="browser-default custom-select"
          >
            <option> </option>
            {sessionOpts &&
              sessionOpts.map((opt, i) => (
                <option key={opt + i}>{Cap(opt)}</option>
              ))}
          </select>
          {selectBy == "semester" && (
            <>
              <label>Semester</label>

              <select
                onChange={saveSemesterCredentials}
                className="browser-default custom-select"
              >
                <option> </option>
                {semesterOpts &&
                  semesterOpts.map((opt, i) => (
                    <option key={opt + i}>{Cap(opt)}</option>
                  ))}
              </select>
            </>
          )}

          {selectBy == "class" && (
            <>
              <label>Class</label>
              <select
                onChange={saveClassCredentials}
                className="browser-default custom-select"
              >
                <option> </option>
                {classOpts &&
                  classOpts.map((opt, i) => (
                    <option key={opt + i}>{Cap(opt)}</option>
                  ))}
              </select>
            </>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ChooseCredentials;

import React, { Fragment, useState, useEffect } from "react";
import classes from "./SubReg.module.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { BackspaceFill, Collection } from "react-bootstrap-icons";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const SubReg = () => {
  const Cap = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const [isLoading, setIsLoading] = useState(false); // Turn it back to true
  const [fields, setFields] = useState([]);
  const [tags, setTags] = useState([]);
  const [fields4th, setFields4th] = useState([]);
  const [tags4th, setTags4th] = useState([]);
  const [show, setShow] = useState(false);
  const [gradePoint, setGradePoint] = useState("");
  const [isNewSaved, setIsnewSaved] = useState(false);
  const [credentialsData, setCredentialsData] = useState({});
  const [deptOpts, setDeptOpts] = useState([]);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 3000);
  }, []);

  useEffect(() => {
    axios
      .get(api_base_url + "/wp-json/sr/v1/dept")
      .then((response) => {
        setDeptOpts(response.data);
      })
      .catch((error) => console.log(error));

    axios
      .get(api_base_url + "/wp-json/sr/v1/subject")
      .then((response) => {
        // console.log(response);
        setTags(response.data);
      })
      .catch((error) => console.log(error));

    axios
      .get(api_base_url + "/wp-json/sr/v1/4th/subject")
      .then((response) => {
        setTags4th(response.data);
      })
      .catch((error) => console.log(error));

    axios
      .get(api_base_url + "/wp-json/sr/v1/4th_sub_point")
      .then((response) => {
        // console.log(response.data.gets);
        setGradePoint(response.data.gets);
      })
      .catch((error) => console.log(error));
  }, []);

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

  const saveGrade = () => {
    const gradePointDiff = {
      gets: gradePoint,
      counts: "1",
    };
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    axios
      .post(api_base_url + "/wp-json/sr/v1/4th_sub_point", gradePointDiff, {
        headers: headers,
      })
      .then((response) => {
        console.log(response);
        setIsnewSaved(!isNewSaved);
      })
      .catch((error) => console.log(error));
  };

  const addTag = (e) => {
    if (e.key === "Enter") {
      if (e.target.value.length > 0) {
        setFields([...fields, e.target.value.toLowerCase()]);
        setTags([...tags, e.target.value.toLowerCase()]);
        e.target.value = "";
      }
    }
  };

  const removeTag = (removedTag) => {
    const newTags = tags.filter((tags) => tags !== removedTag);
    setTags(newTags);
  };

  const saveSub = () => {
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    axios
      .post(api_base_url + "/wp-json/sr/v1/subject", tags, {
        headers: headers,
      })
      .then((response) => {
        // console.log(response);
      })
      .catch((error) => console.log(error));
  };

  const add4thTag = (e) => {
    if (e.key === "Enter") {
      if (e.target.value.length > 0) {
        setFields4th([...fields4th, e.target.value.toLowerCase()]);
        setTags4th([...tags4th, e.target.value.toLowerCase()]);
        e.target.value = "";
      }
    }
  };

  const remove4thTag = (removedTag) => {
    const newTags4th = tags4th.filter((tags4th) => tags4th !== removedTag);
    setTags4th(newTags4th);
  };

  const save4thSubjects = () => {
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    axios
      .post(api_base_url + "/wp-json/sr/v1/4th/subject", tags4th, {
        headers: headers,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  const saveDeptCredentials = (e) => {
    setCredentialsData({ ...credentialsData, dept: e.target.value });
  };

  return (
    <Fragment>
      {isLoading === true ? (
        <Loading />
      ) : (
        <div className={classes.container}>
          <Container fluid="md" className={classes.section}>
            <h5>Add Subjects</h5>
            <div className={classes.select_dept}>
              <label className={classes.label}> Select Department </label>
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
            </div>
            <div className={classes.fields}>
              <h5>Insert Subjects</h5>
              <h6>
                Please, Insert your required subject name and press Enter. Click
                the cross button to remove it.
              </h6>

              <div className={classes.tagContainer}>
                {tags.map((t, i) => {
                  return (
                    <div key={i} className={classes.tag}>
                      {t}{" "}
                      <span onClick={() => removeTag(t)}>
                        <BackspaceFill />
                        <i className="bi bi-backspace" />
                      </span>
                    </div>
                  );
                })}
                <input onKeyDown={addTag} placeholder="..." />
              </div>
              <Button onClick={saveSub} className={classes.bttn}>
                save
              </Button>
            </div>
          </Container>
          <Container fluid="md" className={classes.section}>
            {/* <h4>Assign Classes</h4> */}
            <h5>Add 4th Subjects</h5>
            <div className={classes.fields}>
              <h6 className={classes.heading}>
                Please, Insert your required 4th subject name (If have any) and
                press Enter. Click the cross button to remove it.
              </h6>

              <div className={classes.tagContainer}>
                {tags4th.map((t, i) => {
                  return (
                    <div key={i} className={classes.tag}>
                      {t}{" "}
                      <span onClick={() => remove4thTag(t)}>
                        <BackspaceFill />
                        <i className="bi bi-backspace" />
                      </span>
                    </div>
                  );
                })}
                <input onKeyDown={add4thTag} placeholder="..." />
              </div>
              <Button onClick={save4thSubjects} className={classes.bttn}>
                save
              </Button>
            </div>
            <div className={classes.section}>
              <div className={classes.defining_heading}>
                <h5>Define 4th Subject's Grade Point.</h5>
              </div>
              <Form>
                <Row className="">
                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label className={classes.Form_label}>
                      What is the exact grade point students have to achieve to
                      increase 1 point in total from 4th subjects?
                    </Form.Label>
                    <Form.Control
                      className={classes.point_input}
                      value={gradePoint}
                      type="number"
                      pattern="^(\d+)(,\d{1,2}|.\d{1,2})?$"
                      onChange={(e) => setGradePoint(e.target.value)}
                    />
                    {gradePoint && (
                      <p>
                        If a student gets {gradePoint} points in 4th subject
                        then 1 grade point will be counted as addition.
                      </p>
                    )}
                  </Form.Group>
                </Row>
              </Form>
              <Button onClick={saveGrade} className={classes.bttn}>
                save
              </Button>
            </div>
          </Container>
        </div>
      )}
    </Fragment>
  );
};

export default SubReg;

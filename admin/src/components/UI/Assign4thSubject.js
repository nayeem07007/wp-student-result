import React, { Fragment, useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import ModalClasses from "./Modal.module.css";
import { BackspaceFill, Collection } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.css";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import classes from "./Assign4thSubject.module.css";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// import { PlusSquareFill, } from "react-bootstrap-icons";

const Assign4thSubject = () => {
  const Cap = (str) => {
    // Capitalise string
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const [fields, setFields] = useState([]);
  const [tags, setTags] = useState([]);

  const [show, setShow] = useState(false);
  // const [subjects, setSubjects] = useState([]);

  const [gradePoint, setGradePoint] = useState("");
  const [isNewSaved, setIsnewSaved] = useState(false);

  useEffect(() => {
    axios
      .get(api_base_url + "/wp-json/sr/v1/4th/subject")
      .then((response) => {
        setTags(response.data);
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

  // console.log(grades);
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

  const save4thSubjects = () => {
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    axios
      .post(api_base_url + "/wp-json/sr/v1/4th/subject", tags, {
        headers: headers,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Fragment>
      <div className={ModalClasses.ModalBttn}>
        <Button variant="primary" onClick={() => setShow(true)}>
          Assign 4th Subjects
        </Button>
        Create desired 4th subjects and grading system as organizations
        structure.
      </div>

      <Modal
        className={ModalClasses.modal}
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <div className={ModalClasses.modalBody}>
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              Assign 4th Subjects
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container fluid="md" className="">
              {/* <h4>Assign Classes</h4> */}
              <h5>Add 4th Subjects</h5>
              <div className={classes.fields}>
                <h6 className={classes.heading}>
                  Please, Insert your required 4th subject name (If have any)
                  and press Enter. Click the cross button to remove it.
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
                <Button onClick={save4thSubjects} className={classes.bttn}>
                  save
                </Button>
              </div>
              <div className={classes.defining_heading}>
                <h5>Define 4th Subject's Grade Point.</h5>
              </div>
              <Form>
                <Row className="mb-3">
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
            </Container>
          </Modal.Body>
        </div>
      </Modal>
    </Fragment>
  );
};

export default Assign4thSubject;

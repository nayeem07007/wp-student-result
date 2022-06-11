import React, { Fragment, useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import classes from "./AssignGrade.module.css";
import ModalClasses from "./Modal.module.css";
import { BackspaceFill, Collection } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.css";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
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
  const [marksFrom, setMarksFrom] = useState("");
  const [marksTo, setMarksTo] = useState("");
  const [marksToGrade, setMarksToGrade] = useState("");
  const [marksToPoint, setMarksToPoint] = useState("");
  const [grades, setGrades] = useState([]);
  const [isNewSaved, setIsnewSaved] = useState(false);

  useEffect(() => {
    axios
      .get(api_base_url + "/wp-json/sr/v1/grade")
      .then((response) => {
        // console.log(response.data);
        setGrades(response.data);
      })
      .catch((error) => console.log(error));
  }, [isNewSaved, grades]);

  const saveGrade = () => {
    const grade = {
      from: marksFrom,
      to: marksTo,
      grade: marksToGrade,
      point: marksToPoint,
    };
    setGrades([...grades]);

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    axios
      .post(api_base_url + "/wp-json/sr/v1/grade", grade, {
        headers: headers,
      })
      .then((response) => {
        // console.log(response);
        setIsnewSaved(!isNewSaved);
        setMarksFrom("");
        setMarksTo("");
        setMarksToGrade("");
        setMarksToPoint("");
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
      .post(api_base_url + "/wp-json/sr/v1/course", tags, {
        headers: headers,
      })
      .then((response) => {
        // console.log(response);
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
                <h6>
                  Please, Insert your required 4th subject name and press Enter.
                  Click the cross button to remove it.
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

              <Form>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>Marks From</Form.Label>

                    <Form.Control
                      value={marksFrom}
                      type="number"
                      pattern="^(\d+)(,\d{1,2}|.\d{1,2})?$"
                      onChange={(e) => setMarksFrom(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>To</Form.Label>
                    <Form.Control
                      value={marksTo}
                      type="number"
                      pattern="^(\d+)(,\d{1,2}|.\d{1,2})?$"
                      onChange={(e) => setMarksTo(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Grade</Form.Label>
                    <Form.Control
                      value={marksToGrade}
                      type="text"
                      onChange={(e) => setMarksToGrade(Cap(e.target.value))}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Grade Point</Form.Label>
                    <Form.Control
                      value={marksToPoint}
                      type="number"
                      pattern="^(\d+)(,\d{1,2}|.\d{1,2})?$"
                      onChange={(e) => setMarksToPoint(e.target.value)}
                    />
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

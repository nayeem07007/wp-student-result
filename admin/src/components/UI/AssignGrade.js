import React, { Fragment, useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import classes from "./AssignGrade.module.css";
import ModalClasses from "./Modal.module.css";
import { BackspaceFill, Collection } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.css";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Select from "react-select";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";

// import { PlusSquareFill, } from "react-bootstrap-icons";

const AssignGrade = () => {
  const Cap = (str) => {
    // Capitalise string
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const [show, setShow] = useState(false);
  const [marksFrom, setMarksFrom] = useState("");
  const [marksTo, setMarksTo] = useState("");
  const [marksToGrade, setMarksToGrade] = useState("");
  const [marksToPoint, setMarksToPoint] = useState("");
  const [grades, setGrades] = useState([]);
  const [isNewSaved, setIsnewSaved] = useState(false);

  const tHeads = ["Mark from", "Mark to", "Grade", "Point"];

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

  const deleteGradeRow = (e) => {
    const gradeId = e.target.value;
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    axios
      .post(api_base_url + "/wp-json/sr/v1/delete/grade", gradeId, {
        headers: headers,
      })
      .then((response) => {
        setIsnewSaved(!isNewSaved);
        // console.log(response);
      })
      .catch((error) => console.log(error));
  };
  // console.log(grades);

  return (
    <Fragment>
      <div className={ModalClasses.ModalBttn}>
        <Button variant="primary" onClick={() => setShow(true)}>
          Assign Grade System
        </Button>
        Create desired grading system as organizations structure.
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
              Assign Grade System
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container fluid="md" className="">
              {/* <h4>Assign Classes</h4> */}
              {grades.length > 0 && (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      {tHeads.map((tHead, i) => (
                        <th key={i}>{tHead}</th>
                        // <th key={i}>{Cap(tHead)}</th>
                      ))}
                      <th key={"action"}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {grades.map((grade, i) => (
                      <tr key={grade.id + i}>
                        <td key={grade.grade_min_mark}>
                          {grade.grade_min_mark}
                        </td>
                        <td key={grade.grade_max_mark}>
                          {grade.grade_max_mark}
                        </td>
                        <td key={grade.grade_title}>{grade.grade_title}</td>
                        <td key={grade.grade_point}>{grade.grade_point}</td>
                        <td key={"action" + i}>
                          <Button
                            value={grade.id}
                            onClick={deleteGradeRow}
                            variant="outline-danger"
                            size="sm"
                          >
                            {"Delete"}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
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

export default AssignGrade;

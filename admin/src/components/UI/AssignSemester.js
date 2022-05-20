import React, { Fragment, useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import classes from "./AssignSemester.module.css";
import ModalClasses from "./Modal.module.css";
import { BackspaceFill, Collection } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.css";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Select from "react-select";
import Modal from "react-bootstrap/Modal";

const AssignSemester = () => {
  const Cap = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const [fields, setFields] = useState([]);
  const [tags, setTags] = useState([]);
  const [show, setShow] = useState(false);
  // const [deptOpts, setDeptOpts] = useState([]);
  // const [sessionOpts, setSessionOpts] = useState([]);

  useEffect(() => {
    // Might not be needed!!!
    // axios
    //   .get(api_base_url + "/wp-json/sr/v1/dept")
    //   .then((response) => {
    //     console.log(response.data);
    //     // setDepts(response.data);

    //     const opts = response.data.map((dept) => ({
    //       value: dept,
    //       label: Cap(dept),
    //     }));

    //     setDeptOpts([...deptOpts, ...opts]);
    //   })
    //   .catch((error) => console.log(error));

    // axios
    //   .get(api_base_url + "/wp-json/sr/v1/session")
    //   .then((response) => {
    //     console.log(response.data);
    //     // setSessionOpts(response.data);
    //     const sOpts = response.data.map((session) => ({
    //       value: session,
    //       label: Cap(session),
    //     }));

    //     setSessionOpts([...sessionOpts, ...sOpts]);
    //   })
    //   .catch((error) => console.log(error));

    axios
      .get(api_base_url + "/wp-json/sr/v1/semester")
      .then((response) => {
        console.log(response);
        setTags(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

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

  const saveSemester = () => {
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    axios
      .post(api_base_url + "/wp-json/sr/v1/semester", tags, {
        headers: headers,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  // console.log(tags);
  // console.log(deptOpts);
  // console.log(sessionOpts);

  return (
    <Fragment>
      <div className={ModalClasses.ModalBttn}>
        <Button variant="primary" onClick={() => setShow(true)}>
          Assign Semesters
        </Button>
        Assign new semesters and save it to keep tracks of students by semester.
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
              Assign Semesters
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container fluid="md" className="">
              {/* Might Not be needed!!! */}
              {/* <div>
                <h5>Select depertment :</h5>
                <Select options={deptOpts} />
              </div>

              <div>
                <h5>Select Session :</h5>
                <Select options={sessionOpts} />
              </div> */}

              <h5>Add Semesters</h5>
              <div className={classes.fields}>
                <h6>
                  Please, Insert your required semester name and press Enter.
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
                <Button onClick={saveSemester} className={classes.bttn}>
                  save
                </Button>
              </div>
            </Container>
          </Modal.Body>
        </div>
      </Modal>
    </Fragment>
  );
};

export default AssignSemester;

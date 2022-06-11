import React, { Fragment, useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import classes from "./CreateDept.module.css";
import ModalClasses from "./Modal.module.css";
import { BackspaceFill, Collection } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.css";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Modal from "react-bootstrap/Modal";

const CreateDept = (props) => {
  const Cap = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const [show, setShow] = useState(false);
  const [fields, setFields] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    axios
      .get(api_base_url + "/wp-json/sr/v1/dept")
      .then((response) => {
        // console.log(response);
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

  const saveDept = () => {
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    axios
      .post(api_base_url + "/wp-json/sr/v1/dept", tags, {
        headers: headers,
      })
      .then((response) => {
        // console.log(response);
      })
      .catch((error) => console.log(error));
  };

  // console.log(tags);
  // console.log(props.deptData);

  return (
    <Fragment>
      <div className={ModalClasses.ModalBttn}>
        <Button variant="primary" onClick={() => setShow(true)}>
          Create Departments
        </Button>
        Assign new departments to save it and maintain data by departments.
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
              Create Departments
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container fluid="md">
              {/* <h4>Create Depertments</h4> */}
              <div className={classes.fields}>
                <h6>
                  Please, Insert your required Departments name and press Enter.
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
                <Button onClick={saveDept} className={classes.bttn}>
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

export default CreateDept;

import React, { Fragment, useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import classes from "./AssignSubjects.module.css";
import ModalClasses from "./Modal.module.css";
import { BackspaceFill, Collection } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.css";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Select from "react-select";
import Modal from "react-bootstrap/Modal";

const AssignSubjects = () => {
  const Cap = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const [fields, setFields] = useState([]);
  const [tags, setTags] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    axios
      .get(api_base_url + "/wp-json/sr/v1/subject")
      .then((response) => {
        console.log(response);
        setTags(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  // const options = [
  //   { value: "english", label: "English" },
  //   { value: "bangla", label: "Bangla" },
  //   { value: "math", label: "Math" },
  // ];

  // const sessionsOptions = [
  //   { value: "2021-2022", label: "2021-2022" },
  //   { value: "2020-2021", label: "2020-2021" },
  //   { value: "2019-2020", label: "2019-2020" },
  // ];
  // const classOptions = [
  //   { value: "09", label: "09" },
  //   { value: "08", label: "08" },
  //   { value: "07", label: "07" },
  // ];

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
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  console.log(tags);

  return (
    <Fragment>
      <div className={ModalClasses.ModalBttn}>
        <Button variant="primary" onClick={() => setShow(true)}>
          Assign Subjects
        </Button>
        Depertments wise subject assigning will keep the system most effecient.
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
              Assign Subjects
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container fluid="md" className="">
              {/* <h4>Assign Subjects</h4> */}
              {/* <div>
                <h5>Select depertment :</h5>
                <Select options={options} />
              </div>

              <div>
                <h5>Select Session :</h5>
                <Select options={sessionsOptions} />
              </div> */}

              {/* <div>
                <h5>Select Class :</h5>
                <Select options={classOptions} />
              </div> */}

              <h5>Add Subjects</h5>
              <div className={classes.fields}>
                <h6>
                  Please, Insert your required subject name and press Enter.
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
                <Button onClick={saveSub} className={classes.bttn}>
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

export default AssignSubjects;

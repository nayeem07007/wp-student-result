import React, { Fragment, useState, useEffect } from "react";
import classes from "./Student.module.css";
import RegForm from "./UI/RegForm";
import FileInput from "./UI/FileInput";
import ShowStudents from "./UI/ShowStudents";
import ChooseCredentials from "./UI/ChooseCredentials";
import Loading from "./UI/Loading";
import ModalClasses from "./UI/Modal.module.css";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/esm/Container";

const Student = (props) => {
  const [isLoading, setIsLoading] = useState(false); // Need to turn it true
  const [isFilled, setIsFilled] = useState(false);
  const [showEntryStd, setShowEntryStd] = useState(false);
  const [showImportStd, setShowImportStd] = useState(false);
  const [filledCredentials, setFilledCredentials] = useState({});

  const filledhandler = (credentials) => {
    setFilledCredentials(credentials);
    setIsFilled(true);
  };

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  console.log(filledCredentials);
  return (
    <Fragment>
      {isLoading === true ? (
        <Loading />
      ) : (
        <div className={classes.container}>
          <div className={classes.std_sec}>
            <h5 className={classes.std_title}> Add Students </h5>
            <button
              type="button"
              class="btn btn-outline-success btn-rounded"
              data-mdb-ripple-color="dark"
              onClick={() => {
                setShowEntryStd(true);
              }}
            >
              Entry Results
            </button>{" "}
            <button
              type="button"
              class="btn btn-outline-success btn-rounded"
              data-mdb-ripple-color="dark"
              onClick={() => {
                setShowImportStd(true);
              }}
            >
              Import Results
            </button>
          </div>
          <Modal
            className={ModalClasses.modal}
            show={showEntryStd}
            onHide={() => setShowEntryStd(false)}
            dialogClassName="modal-90w"
            size="xl"
            aria-labelledby="example-custom-modal-styling-title"
          >
            <div className={ModalClasses.modalBody}>
              <Modal.Header closeButton className={ModalClasses.modal_header}>
                <Modal.Title
                  className="h5"
                  id="example-custom-modal-styling-title"
                >
                  Entry Students
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Container fluid="md" className="">
                  <ChooseCredentials onFill={filledhandler} />
                  <RegForm filled={isFilled} />
                </Container>
              </Modal.Body>
            </div>
          </Modal>
          <Modal
            className={ModalClasses.modal}
            show={showImportStd}
            onHide={() => setShowImportStd(false)}
            dialogClassName="modal-90w"
            size="xl"
            aria-labelledby="example-custom-modal-styling-title"
          >
            <div className={ModalClasses.modalBody}>
              <Modal.Header closeButton className={ModalClasses.modal_header}>
                <Modal.Title
                  className="h5"
                  id="example-custom-modal-styling-title"
                >
                  Imprt Students
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Container fluid="md" className="">
                  <ChooseCredentials onFill={filledhandler} />
                  <FileInput
                    url={api_base_url + "/wp-json/sr/v1/import/students"}
                    filled={isFilled}
                    credentials={filledCredentials}
                  />
                </Container>
              </Modal.Body>
            </div>
          </Modal>
          <ShowStudents />
        </div>
      )}
    </Fragment>
  );
};

export default Student;

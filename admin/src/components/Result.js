import React, { Fragment, useState, useEffect } from "react";
import classes from "./Result.module.css";
import FieldSelector from "./UI/FieldSelector";
import FileInput from "./UI/FileInput";
import Search from "./UI/SearchResult";
import ChooseCredentials from "./UI/ChooseCredentials";
import Loading from "./UI/Loading";
import ModalClasses from "./UI/Modal.module.css";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/esm/Container";

const Result = () => {
  const [isLoading, setIsLoading] = useState(false); // Turn it back to true
  const [searchResult, setSearchResult] = useState([]);
  const [isFilled, setIsFilled] = useState(false);
  const [showEntryResults, setShowEntryResults] = useState(false);
  const [showImportResults, setShowImportResults] = useState(false);
  const [filledCredentials, setFilledCredentials] = useState({});

  const filledhandler = (credentials) => {
    setFilledCredentials(credentials);
    setIsFilled(true);
  };

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 3000);
  }, []);

  return (
    <Fragment>
      {isLoading === true ? (
        <Loading />
      ) : (
        <div className={classes.container}>
          <div className={classes.res_sec}>
            <h5 className={classes.res_title}> Add Result </h5>
            <button
              type="button"
              class="btn btn-outline-success btn-rounded"
              data-mdb-ripple-color="dark"
              onClick={() => {
                setShowEntryResults(true);
              }}
            >
              Entry Results
            </button>{" "}
            <button
              type="button"
              class="btn btn-outline-success btn-rounded"
              data-mdb-ripple-color="dark"
              onClick={() => {
                setShowImportResults(true);
              }}
            >
              Import Results
            </button>
          </div>
          <Modal
            className={ModalClasses.modal}
            show={showEntryResults}
            onHide={() => setShowEntryResults(false)}
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
                  Entry Results
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Container fluid="md" className="">
                  <ChooseCredentials onFill={filledhandler} />
                  <FieldSelector searchRes={searchResult} filled={isFilled} />
                </Container>
              </Modal.Body>
            </div>
          </Modal>
          <Modal
            className={ModalClasses.modal}
            show={showImportResults}
            onHide={() => setShowImportResults(false)}
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
                  Imprt Results
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Container fluid="md" className="">
                  <ChooseCredentials onFill={filledhandler} />
                  <FileInput
                    url={api_base_url + "/wp-json/sr/v1/import/results"}
                    filled={isFilled}
                    credentials={filledCredentials}
                  />
                </Container>
              </Modal.Body>
            </div>
          </Modal>
          <Search />
        </div>
      )}
    </Fragment>
  );
};

export default Result;

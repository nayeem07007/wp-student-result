import React, { Fragment, useRef, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
import axios from "axios";

const FileInput = (props) => {
  // const [isFilled, SetIsFilled] = useState(props.filled);
  const isFilled = props.filled;
  const url = props.url;
  const fileUpload = useRef();
  // const [file, setFile] = useState("");

  console.log(props.credentials);
  // console.log(props.filled);

  const submitFile = (e) => {
    e.preventDefault();
    console.log("Import Clicked!!!");

    if (fileUpload.current.files.length > 0) {
      var formData = new FormData();
      let file = fileUpload.current.files[0];

      console.log(formData);

      formData.append("file", file);
      formData.append("title", file.name);

      let headers = {};
      headers["Content-Disposition"] =
        "form-data; filename='" + file.name + "'";

      axios
        .post(url, formData, headers)
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    }
  };

  return (
    <Fragment>
      <Container fluid="md" className="pt-3 pb-2">
        <p className="text-info">
          Import CSV file only and maintain same table structure for the best
          use of Student Result.
        </p>
        <div className="input-group">
          <input
            type="file"
            name="import_file"
            className="custom-file-input"
            id="fileUpload"
            ref={fileUpload}
            aria-describedby="inputGroupFileAddon01"
          />
          <div className="custom-file">
            {props.filled == true && (
              <Button variant="outline-success" onClick={submitFile}>
                Import
              </Button>
            )}
            {isFilled == false && (
              <Button disabled variant="outline-success" onClick={submitFile}>
                Import
              </Button>
            )}
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

export default FileInput;

import React, { Fragment, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import classes from "./RegForm.module.css";
import Container from "react-bootstrap/esm/Container";
import { BackspaceFill } from "react-bootstrap-icons";
import DebounceInput from "react-debounce-input";
import axios from "axios";

const RegForm = (props) => {
  const [fields, setFields] = useState(["name", "roll"]);
  const [formdata, setFormdata] = useState([]);
  const [defaultVal, setDefaultVal] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  const Cap = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const addTag = (e) => {
    if (e.key === "Enter") {
      if (e.target.value.length > 0) {
        setFields([...fields, e.target.value]);
        e.target.value = "";
      }
    }
  };

  const removeTag = (removedTag) => {
    const newFields = fields.filter((fields) => fields !== removedTag);
    setFields(newFields);
  };

  const saveFormdata = (e) => {
    const title = e.target.name;
    setFormdata([...formdata, { [title]: e.target.value }]);
  };

  const submitForm = (e) => {
    e.preventDefault();
    setIsSaving(true);
    console.log("submit clicked!!!");

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    axios
      .post(
        api_base_url + "/wp-json/sr/v1/students",
        JSON.stringify(formdata),
        {
          headers: headers,
        }
      )
      // .then((response) => console.log(fields))
      .then((response) => {
        setTimeout(() => {
          setFields([...fields]);
          setDefaultVal([""]);
          setIsSaving(false);
        }, 1000);
      })
      .catch((error) => console.log(error));
  };

  console.log(formdata);
  // console.log(api_base_url);
  return (
    <Fragment>
      <Container fluid="md">
        <div className={classes.formHeading}>
          <h4>Register Student</h4>
        </div>
        <div className={classes.fields}>
          <h6>
            Please, Insert your required field name and press Enter. Click the
            cross button to remove field.
          </h6>
          <div className={classes.tagContainer}>
            {fields.map((field, index) => {
              return (
                <div key={index} className={classes.tag}>
                  {field}{" "}
                  <span onClick={() => removeTag(field)}>
                    <BackspaceFill />
                    <i className="bi bi-backspace" />
                  </span>
                </div>
              );
            })}
            <input onKeyDown={addTag} placeholder="Name, Roll etc." />
          </div>
        </div>
        <Form>
          {fields.map((field, index) => (
            <Form.Group
              key={index}
              className={classes.mb3}
              controlId={"formGroup_" + Cap(field)}
            >
              <Form.Label>{Cap(field)}</Form.Label>
              <DebounceInput
                type="any"
                name={field}
                value={defaultVal}
                id={"formGroup_" + Cap(field)}
                className="form-control"
                placeholder={"Enter " + field}
                minLength={1}
                debounceTimeout={1000}
                onChange={saveFormdata}
              />
            </Form.Group>
          ))}
        </Form>
        {fields.length > 0 && props.filled && (
          <Button
            className={classes.ssbttn}
            letiant="primary"
            id="submitBtn"
            onClick={submitForm}
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>
        )}
      </Container>
    </Fragment>
  );
};

export default RegForm;

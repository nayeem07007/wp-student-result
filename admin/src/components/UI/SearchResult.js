import React, { Fragment, useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import DebounceInput from "react-debounce-input";

const SearchResult = (props) => {
  const [inputs, setInputs] = useState({
    key: "",
    value: "",
  });

  const [options, setOptions] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios
      .get(api_base_url + "/wp-json/sr/v1/getTheads")
      .then((response) => {
        setOptions(response.data);
        // console.log(response);
      })
      .catch((error) => console.log(error));
  });

  const search = (e) => {
    e.preventDefault();
    const data = { key: inputs.key, val: inputs.value };

    // console.log(data);
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    axios
      .post(api_base_url + "/wp-json/sr/v1/search", data, {
        headers: headers,
      })
      .then((response) => {
        // console.log(response.data);
        setResults(response.data);
      })
      .catch((error) => console.log(error));
  };
  // console.log(inputs);

  {
    results.length > 0 && props.onSearch(results);
  }
  // console.log(options);
  return (
    <Fragment>
      <Container fluid="md">
        <h4>Search Result</h4>
        <Form>
          <Form.Group className="mb-3" controlId="formSelect">
            <Form.Label>
              <b>Search by : </b>
            </Form.Label>
            <Form.Select
              id="search_tag"
              defaultValue={"choose"}
              onChange={(e) => setInputs({ inputs: "", key: e.target.value })}
            >
              <option value="choose" disabled key="1092">
                Choose
              </option>
              {options &&
                options.map((opt, i) => (
                  <option key={i} value={Object.keys(opt).toString()}>
                    {Object.keys(opt).toString()}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>
              <b>Value : </b>
            </Form.Label>

            <DebounceInput
              type="any"
              name={"Value"}
              className="form-control"
              placeholder={" "}
              minLength={1}
              debounceTimeout={1000}
              onChange={(e) => setInputs({ ...inputs, value: e.target.value })}
            />
          </Form.Group>

          <Button variant="primary" onClick={search}>
            Search
          </Button>
        </Form>
      </Container>
    </Fragment>
  );
};

export default SearchResult;

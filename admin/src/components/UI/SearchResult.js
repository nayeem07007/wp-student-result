import React, { Fragment, useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import DebounceInput from "react-debounce-input";
import Table from "react-bootstrap/Table";
import Select from "react-select";
import classes from "./SearchResult.module.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

const SearchResult = (props) => {
  const Cap = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const [inputs, setInputs] = useState({
    key: "",
    value: "",
  });

  const [options, setOptions] = useState([]);
  const [results, setResults] = useState([]);
  const [studentsData, setStudentsData] = useState([]);
  const [showResults, setShowResults] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [columns, setColumns] = useState([
    // { dataField: "dept", text: "Department", sort: true },
    // { dataField: "session", text: "Session", sort: true },
    // { dataField: "class", text: "Class", sort: true },
    // { dataField: "semester", text: "Semester", sort: true },
    { dataField: "status", text: "Status", sort: true },
  ]);

  useEffect(() => {
    axios
      .get(api_base_url + "/wp-json/sr/v1/getTheads")
      .then((response) => {
        setOptions(response.data);
      })
      .catch((error) => console.log(error));

    axios
      .get(api_base_url + "/wp-json/sr/v1/results")
      .then((response) => {
        console.log(response);
        setStudentsData(response.data);
        let newCol = [];
        Object.keys(response.data[0]).map((col) => {
          newCol.push({ dataField: col, text: Cap(col), sort: true });
          // { dataField: col, text: Cap(col), sort: true },
        });
        setColumns([...newCol]);
      })
      .catch((error) => console.log(error));
  }, []);

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
        setShowResults(false);
        setResults(response.data);
      })
      .catch((error) => console.log(error));
  };
  console.log(columns);

  const deleteResult = (res) => {
    setDeleting(true);
    console.log("delete clicked!!!");
    console.log(res);
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    axios
      .post(
        api_base_url + "/wp-json/sr/v1/delete/result",
        JSON.stringify(res),
        {
          headers: headers,
        }
      )
      .then((response) => {
        console.log(response);
        const newResults = results.filter((results) => results !== res);
        setResults(newResults);
        setDeleting(false);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Fragment>
      <div className="container m-4">
        <h5>Search Result</h5>
        <Form>
          <Form.Group
            className={`"col-md-4 mb-3" ${classes.search_form}`}
            controlId="formSelect"
          >
            <Form.Label>
              <b>Search by : </b>
            </Form.Label>
            <Form.Select
              className={classes.select_f}
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

          <Form.Group
            className={`"col-md-4 mb-3"  ${classes.search_form}`}
            controlId="formBasicPassword"
          >
            <Form.Label>
              <b>Value : </b>
            </Form.Label>

            <DebounceInput
              type="any"
              name={"Value"}
              className={`"form-control" ${classes.search_form}`}
              placeholder={" "}
              minLength={1}
              debounceTimeout={1000}
              onChange={(e) => setInputs({ ...inputs, value: e.target.value })}
            />
          </Form.Group>

          <Button
            className={classes.search_btn}
            variant="primary"
            onClick={search}
          >
            Search
          </Button>
        </Form>

        {results.length > 0 && (
          <Table striped bordered hover>
            <thead>
              <tr>
                {results[0].map(
                  (result) =>
                    Object.values(result).toString() != "" && (
                      <th
                        key={
                          Object.keys(result).toString() +
                          Object.keys(result).toString()
                        }
                      >
                        {Cap(Object.keys(result).toString())}
                      </th>
                    )
                )}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {results.map((res) => (
                <tr key={Object.values(res[0]).toString()}>
                  {res.map(
                    (result) =>
                      Object.values(result).toString() != "" && (
                        <td
                          key={
                            Object.values(result).toString() +
                            Object.keys(result).toString()
                          }
                        >
                          {Object.values(result).toString()}
                        </td>
                      )
                  )}
                  <td>
                    <button
                      type="submit"
                      className="btn-danger"
                      onClick={() => {
                        deleteResult(res);
                      }}
                    >
                      {deleting ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        {showResults == true && (
          <div className="text-center mt-4">
            <h5 className={classes.table_heading}>Results Table</h5>
            <BootstrapTable
              striped
              hover
              condensed
              bootstrap4
              keyField="sl"
              data={studentsData}
              columns={columns}
              pagination={paginationFactory({ sizePerPage: 5 })}
            />
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default SearchResult;

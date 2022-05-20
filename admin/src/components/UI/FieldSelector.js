import React, { Fragment, useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import classes from "./FieldSelector.module.css";
import { BackspaceFill, Collection } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { CSVLink } from "react-csv";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import cellEditFactory from "react-bootstrap-table2-editor";
import axios from "axios";
import Select from "react-select";

const FieldSelector = (props) => {
  const Cap = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const [fields, setFields] = useState([]);
  const [theads, setTheads] = useState([
    { label: "sl", key: "sl" },
    { label: "name", key: "name" },
    { label: "roll", key: "roll" },
  ]);
  const [tags, setTags] = useState(["sl", "name", "roll"]);
  const [changes, setChanges] = useState(true);
  const [results, setResults] = useState([]);
  const [selectedOpts, setSelectedOpts] = useState([]);
  const [selectedExamOptions, setSelectedExamOptions] = useState([]);
  const [tableData, setTableData] = useState({
    sl: 1,
    name: "",
    roll: "",
  });

  const [studentsData, setStudentsData] = useState([tableData]);
  const [columns, setColumns] = useState([
    { dataField: "sl", text: "Sl", sort: true },
    { dataField: "name", text: "Name", sort: true },
    { dataField: "roll", text: "Roll", sort: true },
  ]);
  const [resLength, setReslength] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [exams, setExams] = useState([]);

  const subOpts = subjects.map((sub, i) => ({ value: sub, label: sub }));
  const examOpts = exams.map((exam, i) => ({ value: exam, label: exam }));

  // console.log(tableData);

  useEffect(() => {
    axios
      .get(api_base_url + "/wp-json/sr/v1/subject")
      .then((response) => {
        setSubjects(response.data);
      })
      .catch((error) => console.log(error));

    axios
      .get(api_base_url + "/wp-json/sr/v1/exam")
      .then((response) => {
        setExams(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    setStudentsData([tableData]);
  }, [tags]);

  useEffect(() => {
    if (props.searchRes.length > 0) {
      setResults(props.searchRes);
      setReslength(props.searchRes.length);
    }
  }, [props.searchRes]);

  useEffect(() => {
    fields.map((f, i) => {
      setColumns([...columns, { dataField: f, text: f, sort: true }]);
    });
  }, [fields]);

  const addTag = (e) => {
    if (e.key === "Enter") {
      if (e.target.value.length > 0) {
        setFields([...fields, e.target.value.toLowerCase()]);
        setTags([...tags, e.target.value.toLowerCase()]);
        setTheads([
          ...theads,
          { label: Cap(e.target.value), key: e.target.value.toLowerCase() },
        ]);
        if (e.target.value.toLowerCase() == "sl") {
          setTableData({ ...tableData, [e.target.value.toLowerCase()]: "1" });
        } else {
          setTableData({ ...tableData, [e.target.value.toLowerCase()]: " " });
        }
        e.target.value = "";
      }
    }
  };

  const removeTag = (removedTag) => {
    const newTags = tags.filter((tags) => tags !== removedTag);
    setTags(newTags);

    const newColumns = columns.filter(
      (columns) => columns.dataField !== removedTag
    );
    setColumns(newColumns);

    const newTheads = theads.filter((theads) => theads.key !== removedTag);
    setTheads(newTheads);

    delete tableData[removedTag];
  };

  const addRow = () => {
    let sl = studentsData.length + 1;
    let tblData = { ...tableData };
    let keys = Object.keys(tableData);

    console.log(keys);
    keys.map((key) => {
      if (key == "sl") {
        tblData[key] = sl;
      } else {
        tblData[key] = "";
      }

      if (key == "Exam") {
        tblData[key] = selectedExamOptions[0].value;
      }
    });

    setStudentsData([tblData, ...studentsData]);
    setChanges(true);
  };

  const saveChanges = () => {
    // console.log("saved Changes!!!");
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    axios
      .post(
        api_base_url + "/wp-json/sr/v1/results",
        JSON.stringify(studentsData),
        {
          headers: headers,
        }
      )
      .then((response) => {
        console.log(response.data);
        setResults(response.data);
      })
      .catch((error) => console.log(error));

    setChanges(false);
  };

  const saveSelectedOpts = (selectedOptions) => {
    setSelectedOpts(selectedOptions);

    selectedOptions.map((opt) => {
      setTags([...tags, Cap(opt["value"])]);
      setFields([...fields, Cap(opt["value"])]);
      setTableData({ ...tableData, [Cap(opt["value"])]: " " });
    });
  };

  const saveSelectedExamOpts = (selectedExamOptions) => {
    setSelectedExamOptions(selectedExamOptions);

    selectedExamOptions.map((opt) => {
      setTags([...tags, Cap("exam")]);
      setFields([...fields, Cap("exam")]);
      setTableData({ ...tableData, [Cap("exam")]: Cap(opt["value"]) });
    });
  };

  console.log(results);

  return (
    <Fragment>
      <Container fluid="md">
        <h2>Create Table</h2>
        <div className={classes.fields}>
          <div className={classes.multiSelect}>
            <label class="form-label select-label">Select Subjects</label>
            <Select
              isMulti
              isDisabled={!props.filled}
              name="colors"
              options={subOpts}
              onChange={saveSelectedOpts}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>

          <div className={classes.multiSelect}>
            <label class="form-label select-label">Select Examinations</label>
            <Select
              isMulti
              isDisabled={!props.filled}
              name="colors"
              options={examOpts}
              onChange={saveSelectedExamOpts}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>
          <h6>
            Please, Insert your required table's header name and press Enter.
            Click the cross button to remove it.
          </h6>

          <p>
            Insert "sl" table header to maintain serial and get the best uses of
            the plugin.
          </p>
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
            {props.filled && (
              <input onKeyDown={addTag} placeholder="sl, Name, Roll etc." />
            )}
          </div>
        </div>
        {theads.length > 0 && (
          <div className="p-2">
            <Button class={classes.bttn} variant="outline-success" size="md">
              <CSVLink
                data={studentsData}
                headers={theads}
                filename="result.csv"
              >
                Export CSV
              </CSVLink>
            </Button>{" "}
            <Button
              class={classes.bttn}
              variant="outline-success"
              size="md"
              onClick={addRow}
            >
              Add Row
            </Button>{" "}
            {changes && (
              <Button
                class={classes.bttn}
                variant="outline-success"
                size="md"
                onClick={saveChanges}
              >
                Save Changes
              </Button>
            )}{" "}
          </div>
        )}
        <div className="table">
          {columns.length > 0 && (
            <BootstrapTable
              bootstrap4
              keyField="sl"
              data={studentsData}
              columns={columns}
              pagination={paginationFactory({ sizePerPage: 5 })}
              cellEdit={cellEditFactory({
                mode: "click",
                blurToSave: true,
              })}
            />
          )}
          {results.length > 0 && (
            <Table striped bordered hover>
              <thead>
                <tr>
                  {results[0].map(
                    (result) =>
                      Object.values(result).toString() != "" && (
                        <th key={Object.keys(result).toString()}>
                          {Cap(Object.keys(result).toString())}
                        </th>
                      )
                  )}
                </tr>
              </thead>
              <tbody>
                {results.map((res) => (
                  <tr key={Object.values(res[0]).toString()}>
                    {res.map(
                      (result) =>
                        Object.values(result).toString() != "" && (
                          <td key={Object.values(result).toString()}>
                            {Object.values(result).toString()}
                          </td>
                        )
                    )}
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </Container>
    </Fragment>
  );
};

export default FieldSelector;

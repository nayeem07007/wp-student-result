import React, { Fragment, useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import classes from "./ShowStudents.module.css";
import Table from "react-bootstrap/Table";
import axios from "axios";
import paginationFactory from "react-bootstrap-table2-paginator";

const ShowStudents = () => {
  const Cap = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const [studentsData, setStudentsData] = useState([]);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    axios
      .get(api_base_url + "/wp-json/sr/v1/students")
      .then((response) => {
        // console.log(response.data);
        setStudentsData(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const deleteStudent = (res) => {
    setDeleting(true);
    console.log("delete clicked!!!");
    // console.log(res);
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    axios
      .post(
        api_base_url + "/wp-json/sr/v1/delete/student",
        JSON.stringify(res),
        {
          headers: headers,
        }
      )
      .then((response) => {
        console.log(response);
        const newStudents = studentsData.filter(
          (studentsData) => studentsData !== res
        );
        setStudentsData(newStudents);
        setDeleting(false);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Fragment>
      <div className={classes.container}>
        <h5>Students Table</h5>
        <hr />
        <div className="table">
          {studentsData.length > 0 && (
            <Table striped bordered hover>
              <thead>
                <tr>
                  {studentsData[0].map(
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
                {studentsData.map((res) => (
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
                          deleteStudent(res);
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
        </div>
      </div>
    </Fragment>
  );
};

export default ShowStudents;

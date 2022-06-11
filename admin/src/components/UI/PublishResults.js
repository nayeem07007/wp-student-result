import React, { Fragment, useEffect, useState } from "react";
import classes from "./PublishResults.module.css";
import "bootstrap/dist/css/bootstrap.css";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Form from "react-bootstrap/Form";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

const PublishResults = () => {
  const Cap = (str) => {
    // Capitalise string
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // const [show, setShow] = useState(false);
  const [configedBySemester, setConfigedBySemester] = useState(false);
  const [configedByClass, setConfigedByClass] = useState(true);
  const [availableResults, setAvailableResults] = useState([]);
  const [publishingData, setPublishingData] = useState({});
  const [selectBy, setSelectBy] = useState("");
  const [publishingStatus, setPublishingStatus] = useState(false);
  const [unpublishingStatus, setUnpublishingStatus] = useState(false);
  const [publishedItems, setPublishedItems] = useState("0");
  const [unpublishedItems, setUnpublishedItems] = useState("0");
  const [deptOption, setDeptOption] = useState([]);
  const [sessionOption, setSessionOption] = useState([]);
  const [classOption, setClassOption] = useState([]);
  const [semesterOption, setSemesterOption] = useState([]);
  const [studentsData, setStudentsData] = useState([]);
  const [columns, setColumns] = useState([
    { dataField: "dept", text: "Department", sort: true },
    { dataField: "session", text: "Session", sort: true },
    { dataField: "class", text: "Class", sort: true },
    { dataField: "semester", text: "Semester", sort: true },
    { dataField: "status", text: "Status", sort: true },
  ]);
  const fiteredDeptOpt = deptOption.filter(function (elem, pos) {
    return deptOption.indexOf(elem) == pos;
  });
  // console.log(fiteredDeptOpt);

  const fiteredSessionOpt = sessionOption.filter(function (elem, pos) {
    return sessionOption.indexOf(elem) == pos;
  });

  const fiteredClassOpt = classOption.filter(function (elem, pos) {
    return classOption.indexOf(elem) == pos;
  });

  const fiteredSemesterOpt = semesterOption.filter(function (elem, pos) {
    return semesterOption.indexOf(elem) == pos;
  });

  useEffect(() => {
    console.log(Object.keys(availableResults));
    let stdData = [];
    Object.keys(availableResults).map((key) => {
      console.log(availableResults[key].class);
      stdData.push(availableResults[key]);
    });

    stdData.map((std) => {
      std.semester == null
        ? setConfigedBySemester(false)
        : setConfigedBySemester(true);
    });
    // console.log(stdData);
    setStudentsData([...studentsData, ...stdData]);
  }, [availableResults]);

  useEffect(() => {
    if (configedBySemester == false) {
      const newColumns = columns.filter(
        (columns) => columns["dataField"] !== "semester"
      );
      setColumns(newColumns);
    }
    if (configedByClass == false) {
      const newColumns = columns.filter(
        (columns) => columns["dataField"] !== "class"
      );
      setColumns(newColumns);
    }
  }, [configedBySemester]);

  useEffect(() => {
    axios
      .get(api_base_url + "/wp-json/sr/v1/config")
      .then((response) => {
        setSelectBy(response.data[0]);
      })
      .catch((error) => console.log(error));

    axios
      .get(api_base_url + "/wp-json/sr/v1/published/results")
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));

    axios
      .get(api_base_url + "/wp-json/sr/v1/publishing/results")
      .then((response) => {
        // console.log(response);
        setAvailableResults(response.data);

        let newDepts = [Object.values(response.data).map((res) => res.dept)];
        setDeptOption(...newDepts);

        let newSession = [
          Object.values(response.data).map((res) => res.session),
        ];
        setSessionOption(...newSession);

        let newClass = [Object.values(response.data).map((res) => res.class)];
        setClassOption(...newClass);

        let newSemester = [
          Object.values(response.data).map((res) => res.semester),
        ];
        setSemesterOption(...newSemester);
      })
      .catch((error) => console.log(error));
  }, []);

  const saveDept = (e) => {
    // console.log(e.target.value);
    setPublishingData({ ...publishingData, dept: e.target.value });
  };

  const saveSession = (e) => {
    // console.log(e.target.value);
    setPublishingData({ ...publishingData, session: e.target.value });
  };

  const saveSemester = (e) => {
    // console.log(e.target.value);
    setPublishingData({ ...publishingData, semester: e.target.value });
  };

  const saveClass = (e) => {
    // console.log(e.target.value);
    setPublishingData({ ...publishingData, class: e.target.value });
  };

  const savePublishResults = () => {
    setUnpublishedItems("");
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    axios
      .post(api_base_url + "/wp-json/sr/v1/publish/results", publishingData, {
        headers: headers,
      })
      .then((response) => {
        response.data == 0
          ? setPublishedItems("false")
          : setPublishedItems(response.data);
      })
      .catch((error) => console.log(error));
  };

  const saveUnpublishResults = () => {
    setPublishedItems("");
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    axios
      .post(api_base_url + "/wp-json/sr/v1/unpublish/results", publishingData, {
        headers: headers,
      })
      .then((response) => {
        response.data == 0
          ? setUnpublishedItems("false")
          : setUnpublishedItems(response.data);

        setTimeout(() => {
          setPublishingStatus(false);
          setUnpublishingStatus(false);
          setPublishedItems("0");
          setUnpublishedItems("0");
          setPublishingData({
            dept: "",
            session: "",
            class: "",
            semester: "",
          });
        }, 2000);
      })
      .catch((error) => console.log(error));
  };

  // Handle published or not status
  useEffect(() => {
    if (Object.keys(publishingData).length == 3) {
      let items = Object.keys(availableResults);
      items.map((item, i) => {
        // console.log(publishingData.dept);
        if (availableResults[item].dept == publishingData.dept) {
          if (availableResults[item].session == publishingData.session) {
            if (availableResults[item].class) {
              if (availableResults[item].class == publishingData.class) {
                if (availableResults[item].status == "published") {
                  setPublishingStatus(true);
                  setUnpublishingStatus(false);
                } else {
                  setPublishingStatus(false);
                  setUnpublishingStatus(true);
                }
              }
            }
            if (availableResults[item].semester) {
              if (availableResults[item].semester == publishingData.semester) {
                if (availableResults[item].status == "published") {
                  setPublishingStatus(true);
                  setUnpublishingStatus(false);
                } else {
                  setPublishingStatus(false);
                  setUnpublishingStatus(true);
                }
              }
            }
          }
        }
      });
    }
  }, [publishingData]);

  return (
    <Fragment>
      <div className={classes.resContainer}>
        <div className={classes.form_container}>
          {publishedItems > 0 && (
            <h6 className="text-success">
              {publishedItems} results published successfully.
            </h6>
          )}
          {publishedItems == "false" && <h6>No result found to publish.</h6>}
          {unpublishedItems > 0 && (
            <h6> {unpublishedItems} results unpublished successfully.</h6>
          )}
          {unpublishedItems == "false" && (
            <h6> No result found to unpublish.</h6>
          )}
          <Form className={classes.Form} id="result_publishing_form">
            <label>Department</label>
            <select
              value={publishingData.dept}
              onChange={saveDept}
              className="browser-default custom-select"
            >
              <option> </option>
              {fiteredDeptOpt &&
                fiteredDeptOpt.map((opt, i) => (
                  <option key={opt + i}>{Cap(opt)}</option>
                ))}
            </select>
            <label>Session</label>
            <select
              value={publishingData.session}
              onChange={saveSession}
              className="browser-default custom-select"
            >
              <option> </option>
              {fiteredSessionOpt &&
                fiteredSessionOpt.map((opt, i) => (
                  <option key={opt + i}>{opt}</option>
                ))}
            </select>
            {selectBy == "semester" && (
              <>
                <label>Semester</label>

                <select
                  value={publishingData.semester}
                  onChange={saveSemester}
                  className="browser-default custom-select"
                >
                  <option> </option>
                  {fiteredSemesterOpt &&
                    fiteredSemesterOpt.map((opt, i) => (
                      <option key={opt + i}>{Cap(opt)}</option>
                    ))}
                </select>
              </>
            )}

            {selectBy == "class" && (
              <>
                <label>Class</label>
                <select
                  value={publishingData.class}
                  onChange={saveClass}
                  className="browser-default custom-select"
                >
                  <option> </option>
                  {fiteredClassOpt &&
                    fiteredClassOpt.map((opt, i) => (
                      <option key={opt + i}>{Cap(opt)}</option>
                    ))}
                </select>
              </>
            )}
            <Button
              disabled={publishingStatus}
              onClick={savePublishResults}
              variant="outline-success"
              className={classes.bttn}
            >
              Publish
            </Button>
            {"  "}
            <Button
              disabled={unpublishingStatus}
              onClick={saveUnpublishResults}
              variant="outline-danger"
              className={classes.bttn}
            >
              Unpublish
            </Button>
          </Form>
        </div>
        {columns.length > 3 && (
          <div className="text-center">
            <h5 className={classes.table_heading}>
              Table for Published/Unpublished Results
            </h5>
            <BootstrapTable
              // striped
              // hover
              // condensed
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

export default PublishResults;

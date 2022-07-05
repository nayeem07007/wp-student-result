import React, { Fragment, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./UI/Navbar";
import Result from "./Result";
import Student from "./Student";
import Config from "./Config";
import SubReg from "./SubReg";
import StudentResult from "./StudentResult";

function App() {
  const [result, setResult] = useState();
  const [student, setStudent] = useState();
  const [config, setConfig] = useState();
  const [studentResult, setStudentResult] = useState();
  const [subReg, setSubReg] = useState();

  const addShowOption = (result, studentRes, student, subReg, config) => {
    setStudentResult(studentRes);
    setResult(result);
    // setStudent(student);
    setConfig(config);
    setSubReg(subReg);
  };

  return (
    <Fragment>
      <Navbar onSelect={addShowOption} />
      {studentResult == "yes" && <StudentResult />}
      {result == "yes" && <Result />}
      {/* {student == "yes" && <Student />} */}
      {config == "yes" && <Config />}
      {subReg == "yes" && <SubReg />}
    </Fragment>
  );
}

export default App;

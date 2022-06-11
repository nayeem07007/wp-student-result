import React, { Fragment, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./UI/Navbar";
import Result from "./Result";
import Student from "./Student";
import Config from "./Config";
import StudentResult from "./StudentResult";

function App() {
  const [result, setResult] = useState();
  const [student, setStudent] = useState();
  const [config, setConfig] = useState();
  const [studentResult, setStudentResult] = useState();
  // const [goPro, setGoPro] = useState();

  const addShowOption = (result, studentRes, student, goPro, config) => {
    setStudentResult(studentRes);
    setResult(result);
    setStudent(student);
    setConfig(config);
    // setGoPro(goPro);
  };

  return (
    <Fragment>
      <Navbar onSelect={addShowOption} />
      {studentResult == "yes" && <StudentResult />}
      {result == "yes" && <Result />}
      {student == "yes" && <Student />}
      {config == "yes" && <Config />}
      {/* {goPro == "yes" && <GoPro />} */}
    </Fragment>
  );
}

export default App;

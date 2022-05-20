import React, { Fragment, useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./UI/Navbar";
import Dashboard from "./Dashboard";
import Result from "./Result";
import Student from "./Student";
import Config from "./Config";
import GoPro from "./GoPro";

function App() {
  const [result, setResult] = useState();
  const [student, setStudent] = useState();
  const [config, setConfig] = useState();
  // const [dash, setDash] = useState();
  // const [goPro, setGoPro] = useState();

  const addShowOption = (result, dashboard, student, goPro, config) => {
    // setDash(dashboard);
    setResult(result);
    setStudent(student);
    setConfig(config);
    // setGoPro(goPro);
  };

  return (
    <Fragment>
      <Navbar onSelect={addShowOption} />
      {/* {dash == "yes" && <Dashboard />} */}
      {result == "yes" && <Result />}
      {student == "yes" && <Student />}
      {config == "yes" && <Config />}
      {/* {goPro == "yes" && <GoPro />} */}
    </Fragment>
  );
}

export default App;

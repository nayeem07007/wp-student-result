import React, { Fragment, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavItem from "react-bootstrap/NavItem";
import Container from "react-bootstrap/Container";

const NavbarSection = (props) => {
  const [isStudentRes, setIsStudentRes] = useState("yes");
  const [isResult, setIsResult] = useState("no");
  const [isStudent, setIsStudent] = useState("no");
  const [isSubReg, setIsSubReg] = useState("no");
  const [isConfig, setIsConfig] = useState("no");

  const showResult = () => {
    setIsResult("yes");
    setIsStudentRes("no");
    setIsStudent("no");
    setIsSubReg("no");
    setIsConfig("no");
  };

  // const showStudent = () => {
  //   setIsResult("no");
  //   setIsStudentRes("no");
  //   setIsStudent("yes");
  //   setIsSubReg("no");
  //   setIsConfig("no");
  // };

  const showSubReg = () => {
    setIsResult("no");
    setIsStudentRes("no");
    setIsStudent("no");
    setIsSubReg("yes");
    setIsConfig("no");
  };

  const showStudentRes = () => {
    setIsResult("no");
    setIsStudentRes("yes");
    setIsStudent("no");
    setIsSubReg("no");
    setIsConfig("no");
  };

  const showConfig = () => {
    setIsResult("no");
    setIsStudentRes("no");
    setIsStudent("no");
    setIsSubReg("no");
    setIsConfig("yes");
  };
  props.onSelect(isResult, isStudentRes, isStudent, isSubReg, isConfig);

  return (
    <Fragment>
      {
        <Navbar className="" bg="light" expand="lg">
          <Container fluid>
            <Navbar.Brand onClick={showStudentRes}>Student Result</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarSR" />
            <Navbar.Collapse id="navbarSR">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                {/* <Nav.Link href="" onClick={showDashboard}>
                  Dashboard
                </Nav.Link> */}
                <Nav.Link active="true" href="" onClick={showResult}>
                  Result Entry
                </Nav.Link>
                {/* <Nav.Link active="true" href="" onClick={showStudent}>
                  Student
                </Nav.Link> */}
                <Nav.Link active="true" href="" onClick={showConfig}>
                  Configure
                </Nav.Link>
                <Nav.Link active="true" href="" onClick={showSubReg}>
                  Subject Register
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      }
    </Fragment>
  );
};

export default NavbarSection;

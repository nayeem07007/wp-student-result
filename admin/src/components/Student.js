import React, { Fragment, useState, useEffect } from "react";
import classes from "./Student.module.css";
import RegForm from "./UI/RegForm";
import FileInput from "./UI/FileInput";
import ShowStudents from "./UI/ShowStudents";
import ChooseCredentials from "./UI/ChooseCredentials";
import Loading from "./UI/Loading";

const Student = (props) => {
  const [isLoading, setIsLoading] = useState(false); // Need to turn it true
  const [isFilled, setIsFilled] = useState(false);
  const [filledCredentials, setFilledCredentials] = useState({});

  const filledhandler = (credentials) => {
    setFilledCredentials(credentials);
    setIsFilled(true);
  };

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 3000);
  }, []);

  console.log(filledCredentials);
  return (
    <Fragment>
      {isLoading === true ? (
        <Loading />
      ) : (
        <div className={classes.container}>
          <ChooseCredentials onFill={filledhandler} />
          <FileInput
            url={api_base_url + "/wp-json/sr/v1/import/students"}
            filled={isFilled}
            credentials={filledCredentials}
          />
          <RegForm filled={isFilled} />
          <ShowStudents />
        </div>
      )}
    </Fragment>
  );
};

export default Student;

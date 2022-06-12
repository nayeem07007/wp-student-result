import React, { Fragment, useState, useEffect } from "react";
import classes from "./Result.module.css";
import FieldSelector from "./UI/FieldSelector";
import FileInput from "./UI/FileInput";
import Search from "./UI/SearchResult";
import ChooseCredentials from "./UI/ChooseCredentials";
import Loading from "./UI/Loading";

const Result = () => {
  const [isLoading, setIsLoading] = useState(false); // Turn it back to true
  const [searchResult, setSearchResult] = useState([]);
  const [isFilled, setIsFilled] = useState(false);
  const [filledCredentials, setFilledCredentials] = useState({});

  const filledhandler = (credentials) => {
    setFilledCredentials(credentials);
    setIsFilled(true);
  };
  const onSearchHandler = (searchRes) => {
    setSearchResult(searchRes);
  };
  // console.log(searchResult);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 3000);
  }, []);

  return (
    <Fragment>
      {isLoading === true ? (
        <Loading />
      ) : (
        <div className={classes.container}>
          <ChooseCredentials onFill={filledhandler} />
          <FileInput
            url={api_base_url + "/wp-json/sr/v1/import/results"}
            filled={isFilled}
            credentials={filledCredentials}
          />
          <Search onSearch={onSearchHandler} />
          <FieldSelector searchRes={searchResult} filled={isFilled} />
        </div>
      )}
    </Fragment>
  );
};

export default Result;

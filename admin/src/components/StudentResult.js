import React, { Fragment, useState, useEffect } from "react";
import PublishResults from "./UI/PublishResults";
import Loading from "./UI/Loading";

const StudentResult = () => {
  const [isLoading, setIsLoading] = useState(true); // Change it back to true.

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  return (
    <Fragment>
      {isLoading === true ? (
        <Loading />
      ) : (
        <div>
          <PublishResults />
        </div>
      )}
    </Fragment>
  );
};

export default StudentResult;

import React from "react";

const Movieid = ({ match }) => {
  return <h1>Movie Id is {match.params._id}</h1>;
};

export default Movieid;

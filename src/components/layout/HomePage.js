import React from "react";
const HomePage = props => {
  return (
    <div className="columns is-centered">
      <div className="column is-half">{props.children}</div>
    </div>
  );
};

export default HomePage;

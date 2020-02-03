import React from "react";
const HomePage = props => {
  return (
    <div className="columns is-centered">
      <div className="column is-four-fifths">{props.children}</div>
    </div>
  );
};

export default HomePage;

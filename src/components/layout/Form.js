import React from "react";
const Form = props => {
  return (
    <div className="columns is-centered">
      <div className="column is-half is-full-mobile">{props.children}</div>
    </div>
  );
};

export default Form;

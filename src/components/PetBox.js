import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../App.scss";

const PetBox = ({ name, type, comments, petid, customerid }) => {
  return (
    <div className="columns box has-margin-bottom-40">
      <p className="column is-one-fifth has-text-weight-semibold has-text-primary has-margin-right-20">
        {name}
      </p>
      <p className="column is-one-fifth has-margin-right-20">{type}</p>
      <div className="column is-two-fifths has-margin-right-20">
        <p className="has-text-weight-semibold">Comments:</p>
        <p>{comments}</p>
      </div>
      <div className="column is-one-fifth is-multiline">
        <Link
          to={`/auth/pet/edit/${petid}`}
          className="button is-info has-text-weight-semibold has-margin-bottom-15 has-margin-right-100-desktop buttonwidth "
        >
          Edit
        </Link>

        <Link
          onClick={() =>
            axios
              .delete(`/api/pets/${petid}`)
              .then(() => window.location.reload())
              .catch(err => console.log(err))
          }
          to={`/auth/customers/${customerid}`}
          className="button is-danger has-text-weight-semibold has-margin-bottom-10 buttonwidth"
        >
          Delete
        </Link>
      </div>
    </div>
  );
};

export default PetBox;

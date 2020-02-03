import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CustomerBox = ({ name, address, phone, priceperday, id }, props) => {
  return (
    <div>
      <div className="columns box has-margin-bottom-40">
        <p className="column is-one-fifth has-text-weight-semibold has-text-primary has-margin-right-20">
          {name}
        </p>
        <p className="column is-two-fifths has-margin-right-20">
          <i className="fas fa-home"></i> {address}
        </p>
        <p className="column is-one-fifth has-margin-right-20">
          <i className="fas fa-mobile-alt"></i> {phone}
        </p>
        <p className="column is-one-fifth has-margin-right-20 has-text-weight-bold">
          {priceperday} <i className="fas fa-euro-sign"></i>
        </p>
      </div>
      <div className="columns">
        <Link
          to={`/auth/customers/edit/${id}`}
          className="button is-info has-text-weight-semibold is-overlay has-margin-bottom-15 has-margin-right-30 is-fullwidth"
        >
          Edit customer
        </Link>

        <Link
          onClick={() =>
            axios
              .delete(`/api/customers/${id}`)
              .then(() => window.location.reload())
              .catch(err => console.log(err))
          }
          to="/auth/customers"
          className="button is-danger has-text-weight-semibold has-margin-bottom-10 is-fullwidth"
        >
          Delete customer
        </Link>
      </div>
    </div>
  );
};

export default CustomerBox;

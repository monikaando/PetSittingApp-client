import React from "react";
import { Link } from "react-router-dom";

const CustomerCard = ({ name, address, phone, priceperday, id }) => {
  return (
    <div className="columns">
      <div className="column is-8 is-offset-2">
        <Link to={`/auth/customers/${id}`}>
          <div className="columns box has-margin-bottom-5">
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
        </Link>
      </div>
    </div>
  );
};

export default CustomerCard;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import qs from "qs";

const ArchiveBox = ({
  jobid,
  startdate,
  enddate,
  numberofdays,
  totalprice,
  priceperday,
  paid,
  archived,
  description
}) => {
  const [state, setState] = useState({
    jobid,
    startdate,
    enddate,
    numberofdays,
    totalprice,
    priceperday,
    paid,
    archived,
    description
  });

  const setArchived = async () => {
    var updatedArchived = { ...state, archived: true };
    try {
      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      };
      const body = qs.stringify(updatedArchived);
      await axios.put(
        `${process.env.REACT_APP_API}/api/jobs/${state.jobid}`,
        body,
        config
      );
      window.location.reload();
    } catch (err) {}
  };

  const setPaid = async e => {
    var updatedPaid = { ...state, paid: e.target.value };
    try {
      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      };
      const body = qs.stringify(updatedPaid);
      await axios.put(
        `${process.env.REACT_APP_API}/api/jobs/${state.jobid}`,
        body,
        config
      );
      window.location.reload();
    } catch (err) {}
  };
  const deleteJob = async () => {
    await axios.delete(`${process.env.REACT_APP_API}/api/jobs/${state.jobid}`);
    window.location.reload();
  };
  return (
    <div key={state.jobid} className="columns has-margin-bottom-20">
      <div className="column is-2">
        <p className="has-text-weight-semibold">Start:</p>
        <p className="has-text-weight-semibold has-text-primary">
          {state.startdate}
        </p>
      </div>
      <div className="column is-2">
        <p className="has-text-weight-semibold">End:</p>
        <p className="has-text-weight-semibold has-text-primary">
          {state.enddate}
        </p>
      </div>
      <div className="column is-1 has-text-weight-semibold">
        <p>Days:</p>
        <p>{state.numberofdays}</p>
      </div>
      <div className="column is-1 has-text-weight-semibold">
        <p>Total:</p>
        <p>{state.totalprice} €</p>
      </div>
      <div className="column is-1 has-text-weight-semibold ">
        <p>Paid: {}</p>
      </div>
      <div className="column is-3 has-margin-left-20-desktop">
        <p className="has-text-weight-semibold">Comments:</p>
        <p>{state.description}</p>
      </div>

      <div className="columns is-2 has-margin-left-30-desktop has-margin-bottom-60 has-margin-top-20">
        <div
          onClick={setArchived}
          className="button is-dark has-text-weight-semibold is-fullwidth has-margin-bottom-15"
        >
          Unarchive
        </div>
      </div>
    </div>
  );
};

export default ArchiveBox;

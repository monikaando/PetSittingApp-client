import React, { useState } from "react";
import qs from "qs";
import { Link } from "react-router-dom";
import axios from "axios";

const JobBox = props => {
  const [state, setState] = useState({
    jobid: props.jobid,
    startdate: props.startdate,
    enddate: props.enddate,
    numberofdays: props.numberofdays,
    totalprice: props.totalprice,
    priceperday: props.priceperday,
    paid: props.paid,
    archived: props.archived,
    description: props.description,
    forceUpdate: props.forceUpdate
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
      props.forceUpdate();
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
      props.forceUpdate();
    } catch (err) {}
  };
  const deleteJob = async () => {
    await axios.delete(`${process.env.REACT_APP_API}/api/jobs/${state.jobid}`);
    props.forceUpdate();
  };

  if (props.archived) {
    return <div></div>;
  }
  if (props.paid) {
    return (
      <div className="column is-full">
        <div
          key={state.jobid}
          className="columns box is-full has-margin-bottom-20"
        >
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
          <div className="column field is-2 has-text-weight-semibold ">
            <p>Paid:</p>
            <p className="control">
              <span className="select">
                <select onChange={setPaid}>
                  <option value={false}>no</option>
                  <option selected value={true}>
                    yes
                  </option>
                </select>
              </span>
            </p>
          </div>
          <div className="column is-3 has-margin-left-20">
            <p className="has-text-weight-semibold">Comments:</p>
            <p>{state.description}</p>
          </div>
        </div>

        <div className="columns has-margin-bottom-60 has-margin-top-20">
          <Link
            to={`/auth/editjob/${state.jobid}`}
            className="button is-info has-text-weight-semibold has-margin-right-30 is-fullwidth has-margin-bottom-10"
          >
            Edit
          </Link>

          <div
            onClick={deleteJob}
            className="button is-danger has-text-weight-semibold has-margin-right-30 is-fullwidth has-margin-bottom-10"
          >
            Delete
          </div>

          <div
            onClick={setArchived}
            className="button is-warning has-text-weight-semibold is-fullwidth has-margin-bottom-15"
          >
            Archive
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="column is-full">
        <div key={state.jobid} className="columns box has-margin-bottom-20">
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
          <div className="column field is-2 has-text-weight-semibold ">
            <p>Paid:</p>
            <p className="control">
              <span className="select">
                <select onChange={setPaid}>
                  <option selected value={false}>
                    no
                  </option>
                  <option value={true}>yes</option>
                </select>
              </span>
            </p>
          </div>
          <div className="column is-3 has-margin-left-20-desktop">
            <p className="has-text-weight-semibold">Comments:</p>
            <p>{state.description}</p>
          </div>
        </div>

        <div className="columns has-margin-bottom-60 has-margin-top-20">
          <Link
            to={`/auth/editjob/${state.jobid}`}
            className="button is-info has-text-weight-semibold has-margin-right-30 is-fullwidth has-margin-bottom-10"
          >
            Edit
          </Link>

          <div
            onClick={deleteJob}
            className="button is-danger has-text-weight-semibold has-margin-right-30 is-fullwidth has-margin-bottom-10"
          >
            Delete
          </div>

          <div
            onClick={setArchived}
            className="button is-warning has-text-weight-semibold is-fullwidth has-margin-bottom-15"
          >
            Archive
          </div>
        </div>
      </div>
    );
  }
};

export default JobBox;

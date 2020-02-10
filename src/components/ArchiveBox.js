import React, { useState, useEffect } from "react";
import axios from "axios";
import qs from "qs";

const ArchiveBox = props => {
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

  useEffect(() => {
    setState({
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
  }, [props.archived]);

  const setArchived = async () => {
    console.log("UNARCHIVE");
    var updatedArchived = { ...state, archived: !state.archived };
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

  if (state.archived) {
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
          <p>Paid: </p>
          <p>{state.paid ? "Yes" : "No"}</p>
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
  } else {
    return <div></div>;
  }
};

export default ArchiveBox;

import React, { useState, useEffect, useCallback, Fragment } from "react";
import axios from "axios";
import "../App.scss";
import Calendar from "../components/myCalendar";
import CustomerBox from "../components/CustomerBox";
import PetBox from "../components/PetBox";
import JobBox from "../components/JobBox";
import ArchiveBox from "../components/ArchiveBox";
// import { Link } from "react-router-dom";
function CustomerDetails(props) {
  console.log("calling overview");
  useEffect(() => {
    fetchItems();
  }, []);
  const [items, setItems] = useState(null);
  const fetchItems = async () => {
    let customer = await axios.get(
      `${process.env.REACT_APP_API}/api/customers/${props.match.params.id}`
    );
    let custInfo = customer.data;
    setItems({ ...custInfo, update: true });
  };
  const forceUpdate = async () => {
    console.log("UPDATING EVERYTHING");
    let customer = await axios.get(
      `${process.env.REACT_APP_API}/api/customers/${props.match.params.id}`
    );
    let custInfo = customer.data;
    setItems({ ...custInfo, update: !items.update });
    console.log(items.update);
  };
  return items ? (
    <Fragment>
      <div className="columns">
        <div className="column is-8 is-offset-2 is-8-mobile is-offset-2-mobile">
          <h3 className="is-size-3 has-text-weight-semibold has-text-primary has-text-centered-mobile has-margin-bottom-20">
            CUSTOMER
          </h3>
          <CustomerBox
            name={items.name}
            address={items.address}
            phone={items.phone}
            priceperday={items.priceperday}
            id={items._id}
          />
        </div>
      </div>
      <div className="columns">
        <div className="column is-8 is-offset-2 is-8-mobile is-offset-2-mobile">
          <div className="columns">
            <div className="column">
              <h3 className="is-size-3 has-text-weight-semibold has-text-info has-text-centered-mobile has-margin-bottom-20 has-margin-top-40">
                PETS
              </h3>
            </div>
          </div>
          {items.pets &&
            items.pets.map(pet => (
              <PetBox
                history={props.history}
                key={pet._id}
                name={pet.name}
                type={pet.type}
                comments={pet.comments}
                petid={pet._id}
                customerid={items._id}
              />
            ))}

          <div className="columns">
            <button
              onClick={() =>
                props.history.push("/auth/addpet", {
                  id: items._id
                })
              }
              className="button is-primary has-text-weight-semibold has-margin-top-40 is-fullwidth"
            >
              Add pet
            </button>
          </div>
        </div>
      </div>
      <div className="columns">
        <div className="column is-8 is-offset-2 is-8-mobile is-offset-2-mobile is-paddingless">
          <div className="columns">
            <div className="column">
              <h3 className="is-size-3 has-text-weight-semibold has-text-warning has-text-centered-mobile has-margin-bottom-5 has-margin-top-40">
                JOB
              </h3>
            </div>
          </div>

          {items.jobs &&
            items.jobs.map(job => (
              <JobBox
                key={job._id}
                jobid={job._id}
                startdate={job.startdate}
                enddate={job.enddate}
                numberofdays={job.numberofdays}
                priceperday={items.priceperday}
                totalprice={job.totalprice}
                paid={job.paid}
                archived={job.archived}
                description={job.description}
                customerid={items._id}
                forceUpdate={forceUpdate}
              />
            ))}

          <button
            onClick={() => props.history.push(`/auth/addjob/${items._id}`)}
            className="button is-warning has-text-weight-semibold has-margin-top-40 has-margin-top-20-mobile is-fullwidth"
          >
            Add Job
          </button>
        </div>
      </div>
      <div className="columns">
        <div className="column is-8 is-offset-2 is-full-mobile is-paddingless has-padding-left-5-mobile has-padding-right-5-mobile mobileCalendarHeight has-margin-top-60">
          <Calendar id={items._id} update={items.update} />
        </div>
      </div>
      {items.jobs &&
        items.jobs.map(job => (
          <ArchiveBox
            id={items._id}
            key={job._id}
            jobid={job._id}
            startdate={job.startdate}
            enddate={job.enddate}
            numberofdays={job.numberofdays}
            priceperday={items.priceperday}
            totalprice={job.totalprice}
            paid={job.paid}
            archived={job.archived}
            description={job.description}
            customerid={items._id}
            forceUpdate={forceUpdate}
          />
        ))}
    </Fragment>
  ) : (
    <div className="columns is-centered">
      <img src="/images/loading-dog.gif" alt="Loading" width="15%" />
    </div>
  );
}
export default CustomerDetails;

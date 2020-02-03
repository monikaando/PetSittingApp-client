import React, { useState, useEffect } from "react";
import FormLayout from "../components/layout/Form";
import axios from "axios";

const Overview = () => {
  useEffect(() => {
    fetchItems();
  }, [0]);
  const [allJobs, setAllJobs] = useState({});

  const fetchItems = async () => {
    const response2020 = await axios.get(`/api/yearlytotal/2020`);
    const jobs2020 = response2020.data;
    console.log(jobs2020.data);
    const response2019 = await axios.get(`/api/yearlytotal/2019`);
    const jobs2019 = response2019.data;
    console.log(jobs2019.data);
    const response2018 = await axios.get(`/api/yearlytotal/2018`);
    const jobs2018 = response2018.data;
    console.log(jobs2018.data);
    const response2017 = await axios.get(`/api/yearlytotal/2017`);
    const jobs2017 = response2017.data;
    console.log(jobs2017.data);
    setAllJobs({
      year2020: jobs2020,
      year2019: jobs2019,
      year2018: jobs2018,
      year2017: jobs2017
    });
  };

  const calculateTotal = year => {
    console.log("year array: ", year);
    var yearlyTotal = 0;
    year.forEach(job => (yearlyTotal = yearlyTotal + job.totalprice));
    return yearlyTotal;
  };

  if (Object.keys(allJobs).length === 0) {
    return <div></div>;
  } else {
    return (
      <FormLayout>
        <div className="columns box is-multiline has-text-centered">
          <p className="column is-full">
            <span className="has-text-weight-semibold has-text-link">
              Total summary:
            </span>
            {calculateTotal(allJobs.year2020) +
              calculateTotal(allJobs.year2019)}{" "}
            €
          </p>
          <p className="column is-full">
            <span className="has-text-weight-semibold has-text-primary">
              2020:
            </span>
            {calculateTotal(allJobs.year2020)} €
          </p>
          <p className="column is-full">
            <span className="has-text-weight-semibold has-text-primary">
              2019:
            </span>
            {calculateTotal(allJobs.year2019)} €
          </p>
          <p className="column is-full">
            <span className="has-text-weight-semibold has-text-primary">
              2018:{" "}
            </span>
            ...... €
          </p>
          <p className="column is-full">
            <span className="has-text-weight-semibold has-text-primary">
              2017:{" "}
            </span>
            ...... €
          </p>
        </div>
      </FormLayout>
    );
  }
};

export default Overview;

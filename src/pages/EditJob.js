import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FormLayout from "../components/layout/Form";
import axios from "axios";
var moment = require("moment");

// CSS Modules, react-datepicker-cssmodules.css
// import "react-datepicker/dist/react-datepicker-cssmodules.css";

const AddJob = props => {
  useEffect(() => {
    fetchItems();
  }, []);

  const [formData, setFormData] = useState({
    jobid: "",
    startdate: new Date(),
    enddate: new Date(),
    numberofdays: 0,
    priceperday: 0,
    totalprice: 0,
    paid: false,
    description: "",
    customer: ""
  });

  const fetchItems = async () => {
    const jobRequest = await axios.get(`/api/jobs/${props.match.params.id}`);
    const job = jobRequest.data;

    setFormData({
      jobid: job._id,
      startdate: new Date(moment(job.startdate)),
      enddate: new Date(moment(job.enddate)),
      numberofdays: job.numberofdays,
      priceperday: job.customer.priceperday,
      totalprice: job.totalprice,
      paid: job.paid,
      description: job.description,
      customer: job.customer._id
    });
  };

  console.log("formdata ", formData);

  const handleChangeStart = date => {
    setFormData({
      ...formData,
      startdate: date
    });
    console.log(formData);
  };

  const handleChangeEnd = date => {
    console.log("Date, ", formData);
    setFormData({
      ...formData,
      enddate: date
    });
  };

  const calculateDays = () => {
    var newStartDate = moment(formData.startdate).format("YYYY-MM-DD");
    var newEndDate = moment(formData.enddate).format("YYYY-MM-DD");
    var totaldays = moment(newEndDate).diff(moment(newStartDate), "days") + 1;
    return totaldays;
  };

  const calculatePrice = days => {
    var price = days * formData.priceperday;
    return price;
  };

  const handleInput = e => {
    setFormData({ ...formData, description: e.target.value });
  };

  const {
    jobid,
    startdate,
    enddate,
    priceperday,
    paid,
    description,
    customer
  } = formData;

  const sendData = async () => {
    let newDays = calculateDays();
    let newTotal = calculatePrice(newDays);
    const newJob = {
      startdate: moment(startdate).format("YYYY-MM-DD"),
      enddate: moment(enddate).format("YYYY-MM-DD"),
      numberofdays: newDays,
      priceperday,
      totalprice: newTotal,
      paid,
      description
    };
    console.log(newJob);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      const body = JSON.stringify(newJob);
      const res = await axios.put(`/api/jobs/${jobid}`, body, config);
      console.log(res.data);

      props.history.push(`/auth/customers/${customer}`);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <FormLayout>
      {/* <p>Number of days: {formData.numberOfDays}</p> */}
      <div className="box columns is-centered is-multiline">
        <DatePicker
          className="column is-full input is-info"
          selected={formData.startdate}
          onChange={handleChangeStart}
          dateFormat="d MMMM, yyyy"
          todayButton="Today"
        />
        <DatePicker
          className="column is-full has-margin-left-20 input is-info"
          selected={formData.enddate}
          onChange={handleChangeEnd}
          minDate={formData.startdate}
          dateFormat="d MMMM, yyyy"
          todayButton="Today"
        />

        <input
          type="text"
          name="description"
          value={formData.description}
          placeholder="Add a Comment"
          onChange={handleInput}
          className="column is-full has-margin-top-20"
        />
        <input
          className="button is-info has-margin-top-20"
          onClick={sendData}
          type="submit"
          value="Update"
        />
      </div>
    </FormLayout>
  );
};

export default AddJob;

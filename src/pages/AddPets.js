import React, { useState } from "react";
import FormLayout from "../components/layout/Form";
import axios from "axios";

const AddPet = props => {
  const [formData, setFormData] = useState({
    customerid: props.location.state.id,
    type: "",
    name: "",
    comments: ""
  });

  const { type, name, comments, customerid } = formData;
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData.customerid);
  };
  const onSubmit = async e => {
    e.preventDefault();
    const newPet = {
      customerid,
      type,
      name,
      comments
    };
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      const body = JSON.stringify(newPet);
      const res = await axios.post("/api/pets", body, config);
      console.log(res.data);

      props.history.push(`/auth/customers/${props.location.state.id}`);
    } catch (err) {
      console.log(err.response.data);
    }
  };
  return (
    <FormLayout>
      <div className="box columns is-centered">
        <div className="column is-4 has-margin-top-15 is-hidden-mobile">
          <img src="/images/cat3.png" alt="cat" />
        </div>
        <div className="column is-8">
          <div className="box columns is-centered">
            <div className="column has-padding-bottom-20">
              <h1 className="is-size-3">Add a Pet</h1>
              <form onSubmit={e => onSubmit(e)}>
                <div className="field">
                  <p className="control has-icons-left has-icons-right">
                    <input
                      className="input"
                      type="text"
                      placeholder="Type of Pet"
                      name="type"
                      value={type}
                      onChange={e => onChange(e)}
                      required
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-user"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left has-icons-right">
                    <input
                      className="input"
                      type="text"
                      placeholder="Name"
                      name="name"
                      value={name}
                      onChange={e => onChange(e)}
                      required
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-home"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input"
                      type="textarea"
                      placeholder="Comments"
                      name="comments"
                      value={comments}
                      onChange={e => onChange(e)}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-mobile-alt"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control">
                    <input
                      type="submit"
                      className="button is-info"
                      value="Add Pet"
                    />
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="column is-4 has-margin-top-15 is-hidden-desktop">
          <img src="/images/cat3.png" alt="cat" />
        </div>
      </div>
    </FormLayout>
  );
};

export default AddPet;

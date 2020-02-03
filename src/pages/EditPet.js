import React, { useState, useEffect } from "react";
import FormLayout from "../components/layout/Form";
import axios from "axios";

const AddPet = props => {
  useEffect(() => {
    fetchItems();
  }, [0]);

  const [formData, setFormData] = useState({
    customerid: "",
    type: "",
    name: "",
    comments: ""
  });

  const fetchItems = async () => {
    const pet = await axios.get(`/api/pets/${props.match.params.id}`);
    const items = pet.data;
    setFormData({
      customerid: items.customerid,
      type: items.type,
      name: items.name,
      comments: items.comments
    });
  };

  const { type, name, comments, customerid } = formData;
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      const res = await axios.put(
        `/api/pets/${props.match.params.id}`,
        body,
        config
      );

      props.history.push(`/auth/customers/${formData.customerid}`);
    } catch (err) {}
  };
  return (
    <FormLayout>
      <div className="box columns is-centered">
        <div className="column has-padding-bottom-20">
          <h1 className="is-size-3">Edit Pet</h1>
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
                  value="Udapte"
                />
              </p>
            </div>
          </form>
        </div>
      </div>
    </FormLayout>
  );
};

export default AddPet;

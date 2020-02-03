import React, { useState, useEffect } from "react";
import FormLayout from "../components/layout/Form";
import axios from "axios";

const EditCustomer = props => {
  useEffect(() => {
    fetchItems();
  }, [0]);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    priceperday: "",
    id: ""
  });

  const fetchItems = async () => {
    const customer = await axios.get(`/api/customers/${props.match.params.id}`);
    const items = customer.data;
    setFormData({
      name: items.name,
      address: items.address,
      phone: items.phone,
      priceperday: items.priceperday
    });
  };

  const { name, address, phone, priceperday } = formData;
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async e => {
    e.preventDefault();
    const customer = {
      name,
      address,
      phone,
      priceperday
    };
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      const body = JSON.stringify(customer);
      const res = await axios.put(
        `/api/customers/edit/${props.match.params.id}`,
        body,
        config
      );
      console.log(res.data._id);
      props.history.push(`/auth/customers/${props.match.params.id}`);
    } catch (err) {
      console.log(err.response.data);
    }
  };
  return (
    <FormLayout>
      <div className="box columns is-centered">
        <div className="column">
          <h1 className="is-size-3">Edit Customer</h1>
          <form onSubmit={e => onSubmit(e)}>
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
                  <i className="fas fa-user"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input
                  className="input"
                  type="text"
                  placeholder="Address"
                  name="address"
                  value={address}
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
                  type="text"
                  placeholder="Phone Number"
                  name="phone"
                  value={phone}
                  onChange={e => onChange(e)}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-mobile-alt"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input
                  className="input"
                  type="text"
                  placeholder="Price per day"
                  name="priceperday"
                  value={priceperday}
                  onChange={e => onChange(e)}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-euro-sign"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control">
                <input
                  type="submit"
                  className="button is-link"
                  value="Update"
                />
              </p>
            </div>
          </form>
        </div>
      </div>
    </FormLayout>
  );
};

export default EditCustomer;

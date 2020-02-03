import React, { useState, useEffect, Fragment } from "react";
import CustomerCard from "../components/CustomerCard";
import axios from "axios";

function CustomersList() {
  useEffect(() => {
    fetchItems();
  }, []);
  const [items, setItems] = useState([]);
  const fetchItems = async () => {
    const list = await axios.get("/api/customers");

    const items = list.data;
    setItems(items);
  };
  return (
    <Fragment>
      {items.map(item => (
        <CustomerCard
          name={item.name}
          address={item.address}
          phone={item.phone}
          priceperday={item.priceperday}
          id={item._id}
          key={item._id}
        />
      ))}
    </Fragment>
  );
}
export default CustomersList;

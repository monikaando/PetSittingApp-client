import React, { useState, useEffect, Fragment } from "react";
import CustomerCard from "../components/CustomerCard";
import axios from "axios";
import styled, { keyframes } from "styled-components";
import { fadeInLeft } from "react-animations";

const slideAnimation = keyframes`${fadeInLeft}`;

const SlideDiv = styled.div`
  animation: 0.5s ${slideAnimation};
`;

function CustomersList(props) {
  useEffect(() => {
    fetchItems();
  }, []);
  const [items, setItems] = useState([]);
  const fetchItems = async () => {
    const list = await axios.get(`${process.env.REACT_APP_API}/api/customers`);
    const items = list.data;
    setItems(items);
    console.log("CL props: ", props);
  };
  return (
    <Fragment>
      {items.map(item => (
        <SlideDiv>
          <CustomerCard
            name={item.name}
            address={item.address}
            phone={item.phone}
            priceperday={item.priceperday}
            id={item._id}
            key={item._id}
          />
        </SlideDiv>
      ))}
    </Fragment>
  );
}
export default CustomersList;

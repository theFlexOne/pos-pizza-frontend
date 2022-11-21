import Menu from "./components/Menu/Menu";
import Customer from "./components/Customer/Customer";
import { Navigate, Route, Routes } from "react-router-dom";
import { useState } from "react";

const Order = () => {
  const [foodOrder, setFoodOrder] = useState([]);
  const [orderCustomer, setOrderCustomer] = useState([]);
  // const [data, error, isLoading] = useApp("menu", "customers");

  const addToOrder = (item) => setFoodOrder((prev) => [...prev, item]);
  const removeFromOrder = (item) => {};

  return (
    <>
      {/* {isLoading && <div className="loading">Loading...</div>}

      {error && (
        <div className="error error-message">
          There was a problem retrieving data from the server!
        </div>
      )} */}
      {/* {data && (
        <Routes>
          <Route index element={<Navigate to="customer" />} />
          <Route
            path="menu"
            element={<Menu menu={data.menu} addToOrder={addToOrder} />}
          />
          <Route
            path="customer"
            element={
              <Customer
                customers={data.customers}
                setOrderCustomer={setOrderCustomer}
              />
            }
          />
        </Routes>
      )} */}
      Hello world
    </>
  );
};

export default Order;

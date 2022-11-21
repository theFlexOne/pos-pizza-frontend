// const fetchAppData = async () => {
//   try {
//     const res = await fetch(constants.APP_DATA_URL + "/db");
//     // if (!res.ok) {console.error(res)}
//     const data = await res.json();
//     return { results: data, error: null };
//   } catch (err) {
//     console.error(err);
//     return { error: err, results: null };
//   }
// };

import { APP_DATA_URL } from "../constants/constants";

const postNewCustomer = async (customer) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customer),
  };
  try {
    const res = await fetch(APP_DATA_URL + "/customers", options);
    if (!res.ok) return console.error(res.status, res.statusText);
    const newCustomer = await res.json();
    return newCustomer;
  } catch (err) {
    console.error(err);
    return;
  }
};

const deleteCustomer = (id) => {
  fetch(APP_DATA_URL + `/customers/${id}`, { method: "DELETE" })
    .then((res) => {
      if (!res.ok) return console.error(res.status, res.statusText);
      console.log(`deleted customer with id: ${id}`);
    })
    .catch(console.error);
};

const postNewOrder = async (order) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  };
  const res = await fetch(APP_DATA_URL + "/orderHistory", options);
  const newCustomer = await res.json();
  return newCustomer;
};

export { postNewCustomer, deleteCustomer, postNewOrder };

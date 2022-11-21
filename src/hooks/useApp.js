import axios from "axios";
import { useMemo } from "react";
import { useState, useEffect } from "react";
import { APP_DATA_URL } from "../constants/constants";

const emptyQueryObj = { data: [], error: false, isLoading: false };

const useApp = (baseURL = APP_DATA_URL) => {
  const [query, setQuery] = useState(emptyQueryObj);

  async function fetchData(route) {
    setQuery({ ...query, isLoading: true });
    const url = `${baseURL}/${route}`;
    try {
      const res = await axios.get(url);
      console.log("res", res);
      // check for errors here
      const { data } = res;
      setQuery({ ...query, data: [...data], isLoading: false });
    } catch (err) {
      console.error(err.message);
      setQuery({ ...query, error: err, isLoading: false });
    }
  }

  return query;
};

export default useApp;

// useEffect(() => {
//   setIsLoading(true);
//   if (!Array.isArray(routes)) {
//     axios
//       .get(`${APP_DATA_URL}/${routes}`)
//       .then((res) => setData([{ route: routes, data: res.data }]))
//       .catch((err) => {
//         console.error(err.message);
//         setError(err);
//       })
//       .finally(() => setIsLoading(false));
//   } else {
//     const fetchRequests = routes.map((r) =>
//       axios
//         .get(`${APP_DATA_URL}/${r}`)
//         .then((res) => ({ route: r, data: res.data }))
//         .catch(console.error)
//     );
//     Promise.all(fetchRequests)
//       .then((data) => {
//         console.log("data", data);
//         // setData(data);
//       })
//       .catch((err) => {
//         console.error(err.message);
//         setError(err);
//       })
//       .finally(() => setIsLoading(false));
//   }
// }, [routes]);

// const fetchMongoDBData = async (collection = "recipes") => {
//   setIsLoading(true);
//   const ssData = JSON.parse(sessionStorage.getItem(collection));
//   if (ssData) {
//     setResults(ssData);
//     setIsLoading(false);
//     return;
//   }
//   try {
//     const res = await fetch(constants.APP_DATA_URL + "/recipes");
//     if (!res.ok) throw new Error(res.statusText);
//     const recipes = Object.fromEntries([await res.json()]);
//     setResults(recipes);
//   } catch (err) {
//     setError(err);
//   } finally {
//     setIsLoading(false);
//   }
// };

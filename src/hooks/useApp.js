import { useState, useEffect } from "react";
import constants from "../constants/constants";

const initialDataRoutes = ["menu", "customers"];

const populateSessionStorage = (data) => {
  console.log("data", data);
  Object.keys(data).forEach((section) => {
    sessionStorage.setItem(section, JSON.stringify(data[section]));
  });
};

const useApp = async (setData) => {
  const [results, setResults] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchJSONServerData = async (...sections) => {
    setIsLoading(true);
    const fetches = sections.map((section) => {
      const url = `${constants.APP_DATA_URL}/${section}`;
      return fetch(url).then((res) => res.json());
    });
    Promise.all(fetches).then(setData);
  };

  const fetchMongoDBData = async (collection = "recipes") => {
    setIsLoading(true);
    const ssData = JSON.parse(sessionStorage.getItem(collection));
    if (ssData) {
      setResults(ssData);
      setIsLoading(false);
      return;
    }
    try {
      const res = await fetch(constants.APP_DATA_URL + "/recipes");
      if (!res.ok) throw new Error(res.statusText);
      const recipes = Object.fromEntries([await res.json()]);
      setResults(recipes);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    sessionStorage.clear();
    fetchJSONServerData(...initialDataRoutes).then(setData);
  }, [setData]);

  results && console.log("results", results);
  results && populateSessionStorage(results);
  return [results, error, isLoading];
};

export default useApp;

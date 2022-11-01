import { useState, useEffect } from "react";
import constants from "../constants/constants";

const populateSessionStorage = (data) => {
  console.log("data", data);
  Object.keys(data).forEach((section) => {
    sessionStorage.setItem(section, JSON.stringify(data[section]));
  });
};

const useApp = () => {
  const [results, setResults] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchJSONServerData = (section = "menu") => {
    setIsLoading(true);
    const ssData = sessionStorage.getItem(section);
    if (ssData) {
      setResults(ssData);
      setIsLoading(false);
      return;
    }
    const url = `${constants.APP_DATA_URL}/${section}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        sessionStorage.setItem(section, JSON.stringify(data));
        setResults(data);
      })
      .catch(setError)
      .finally(() => {
        setIsLoading(false);
      });
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
    // fetchJSONServerData();
    fetchJSONServerData();
  }, []);

  results && console.log("results", results);
  results && populateSessionStorage(results);
  return [error, isLoading];
};

export default useApp;

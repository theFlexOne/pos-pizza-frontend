import { useState, useEffect } from "react";
import constants from "../constants/constants";

const useFetchApp = () => {
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

  useEffect(() => {
    sessionStorage.clear();
    fetchJSONServerData();
  }, []);

  results && console.log("results", results);
  return [error, isLoading];
};

export default useFetchApp;

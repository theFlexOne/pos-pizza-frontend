import { useEffect, useState } from "react";

const useFetch = (route) => {
  const [data, setdata] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {}, [route]);
};

export default useFetch;

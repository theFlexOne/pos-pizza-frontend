import { useCallback, useEffect, useState } from "react";

const useLocalStorage = (key, init = {}) => {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : init;
  });
  const updateLocalStorage = useCallback(
    (key, val) => localStorage.setItem(key, JSON.stringify(val)),
    [key]
  );

  useEffect(() => {
    updateLocalStorage(key, value);
  }, [value, updateLocalStorage, key]);
  return [value, setValue];
};

export default useLocalStorage;

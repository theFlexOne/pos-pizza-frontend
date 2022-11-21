import axios from "axios";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { APP_DATA_URL } from "../constants/constants";

const AppDataContext = createContext();

const initialState = [];

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE": {
      return [...state, action.payload];
    }
    case "PRINT": {
      if (!action.payload) return console.log(state);
      const data = state.find((d) => d.route === action.payload);
      return console.log(data);
    }
    default: {
      return console.warn(`No actions matching ${action.type}`);
    }
  }
};

const AppDataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [currentUser, setCurrentUser] = useState(null);

  const getData = useCallback(
    async function getData(route) {
      if (!route) return state;
      const data = state.find((d) => d.route === route);
      if (data) return data.data;
      const res = await axios.get(`${APP_DATA_URL}/${route}`);
      //! error check here
      const payload = { route, data: res.data };
      dispatch({ type: "UPDATE", payload });
      return payload.data;
    },
    [state]
  );

  const loginUser = async (pin) => {
    const users = await getData("users");
    const user = users.find((user) => user.pin === `${pin}`);
    console.log(`${Object.values(user.name).join(" ")} is now logged in!`);
    sessionStorage.setItem("user", JSON.stringify(user));
    setCurrentUser(user);
  };

  const actions = { getData, loginUser, currentUser };

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    user && setCurrentUser(user);
  }, []);

  return (
    <AppDataContext.Provider
      value={{ ...actions }}
      // value={{ users: { data: users, error, isLoading }, ...actions }}
    >
      {children}
    </AppDataContext.Provider>
  );
};

const useAppData = (route) => {
  const ctx = useContext(AppDataContext);
  console.log("ctx", ctx);
  if (!ctx) return new Error("Not inside 'UserProvider'");
  return ctx;
};

export { useAppData, AppDataProvider };

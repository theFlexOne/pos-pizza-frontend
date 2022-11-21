import { createContext, useContext, useMemo, useState } from "react";
import useApp from "../hooks/useApp";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [activeUser, setActiveUser] = useState(null);
  const { data, error, isLoading } = useApp(["users"]);

  // const actions = {
  //   lookupUser(id) {
  //     return users.find((u) => u.id === id) || null;
  //   },
  //   validateUser(pin, user) {
  //     return pin === user.pin;
  //   },
  // };

  // users && console.log(actions.lookupUser("14909"));

  console.log("re-render");

  return (
    <UserContext.Provider
      value={null}
      // value={{ users: { data: users, error, isLoading }, ...actions }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUserStore = () => {
  const ctx = useContext(UserContext);
  if (!ctx) return new Error("Not inside 'UserProvider'");
  return ctx;
};

export { useUserStore, UserProvider };

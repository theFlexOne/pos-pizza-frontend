import { useReducer, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import { useOrder } from "../context/OrderContext";
import { postNewCustomer } from "../utils/fetchHelpers";
import { addCustomerToSS, getFromSS } from "../utils/sessionStorageHelpers";

const DEFAULT_ACTION = { type: "error", value: undefined, name: "" };

const initialState = {
  phoneNumber: "555",
  firstName: "",
  lastName: "",
  streetAddress: "",
  secondaryAddress: "",
};

const buildCustomer = ({
  phoneNumber,
  firstName,
  lastName,
  streetAddress,
  secondaryAddress,
}) => {
  return {
    phoneNumber,
    name: {
      firstName,
      lastName,
    },
    address: {
      streetAddress,
      secondaryAddress,
      city: "Gravel Falls",
      state: "Minnesota",
    },
    orderHistory: [],
    id: uuid().split("-")[0],
    created: Date.now(),
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case "update-field": {
      const { name, value } = action;
      if (!name || value === undefined)
        throw new Error(
          "action.type 'update-field' needs a 'name' & 'value' prop"
        );
      const newState = { ...state, [name]: value };
      console.log(`state: `, newState);
      return newState;
    }
    case "clear-field": {
      const { name } = action;
      const newState = { ...state, [name]: "" };
      return newState;
    }
    case "reset": {
      return initialState;
    }
    default:
      console.log("NOT A VALID TYPE: ", action.type);
      console.log("state: ", state);
      console.log("action: ", action);
      return state;
  }
};

const useCustomer = () => {
  const [formStep, setFormStep] = useState(1);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { selectCustomer } = useOrder();
  const focusedInput = useRef(undefined);

  const actions = {
    logThis() {
      console.log("this: ", this);
    },
    handleInputChange(element) {
      const value = element.rawValue || element.value || "";
      const action = {
        type: "update-field",
        value,
        name: element.name,
      };
      dispatch(action);
    },
    handleKeyboardClick(val) {
      // const value = sta;
    },
    handleClearInput(name) {
      const action = {
        type: "update-field",
        value: "",
        name,
      };
      dispatch(action);
    },
    handleCustomerSubmit() {
      const customer = buildCustomer({ ...state });
      postNewCustomer(customer);
      addCustomerToSS(customer);
      selectCustomer(customer);
    },
    toNextPage() {
      setFormStep(() => formStep + 1);
    },
    toPrevPage() {
      setFormStep(() => formStep - 1);
    },
    getFormStep() {
      return formStep;
    },
    lookupCustomer() {
      const customerList = getFromSS("customers");
      const customer = customerList.find(
        ({ phoneNumber }) => phoneNumber === state.phoneNumber
      );
      if (customer) {
        selectCustomer(customer);
        return customer;
      }
      setFormStep(() => formStep + 1);
      return {};
    },
    setFocusedInput(ref) {
      focusedInput.current = ref;
    },
    handleBlur() {
      focusedInput.current = undefined;
    },
    test() {
      const action = { ...DEFAULT_ACTION, type: "TEST" };
      dispatch(action);
    },
  };
  return actions;
};

export default useCustomer;

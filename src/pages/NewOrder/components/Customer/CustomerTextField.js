import React, { useRef, forwardRef } from "react";
import { TextField } from "@mui/material";
import Cleave from "cleave.js/react";
import { useCustomer } from "../../../../context/CustomerContext";

const CleavePhoneInput = forwardRef((props, ref) => {
  const options = {
    blocks: [0, 3, 3, 4],
    delimiters: ["(", ") ", "-", "-"],
    numericOnly: true,
  };
  return <Cleave options={options} htmlRef={ref} {...props} />;
});

const cleaveInputProps = { inputComponent: CleavePhoneInput };

const CustomerTextField = forwardRef(
  ({ name, label, autoFocus, onEnter, flow, ...other }, ref) => {
    const { state, actions } = useCustomer();
    const value = state[name];
    const { handleInputChange, setFocusedInput } = actions;
    const isPhoneNumber = name === "phoneNumber";

    const handleChange = (e) => {
      const { target } = e;
      if (target.rawValue === value && flow) {
        const newValue = target.rawValue.substring(1) + e.nativeEvent.data;
        target.rawValue = newValue;
        return handleInputChange(target);
      }
      return handleInputChange(target);
    };

    return (
      <TextField
        name={name || ""}
        label={label || ""}
        value={value}
        onChange={handleChange}
        InputProps={isPhoneNumber ? cleaveInputProps : undefined}
        inputProps={{ autoFocus }}
        fullWidth
        {...other}
      />
    );
  }
);

export default CustomerTextField;

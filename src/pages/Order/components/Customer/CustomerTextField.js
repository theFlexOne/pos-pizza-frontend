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

const CustomerTextField = ({
  setPhoneInput,
  value,
  name,
  label,
  autoFocus,
  ...otherProps
}) => {
  return (
    <TextField
      name={name || ""}
      label={label || name}
      value={value}
      onChange={(e) => {
        setPhoneInput(e.target.value);
      }}
      onClick={(e) => e.target.focus()}
      inputProps={{ autoFocus }}
      fullWidth
      {...otherProps}
    />
  );
};

export default CustomerTextField;

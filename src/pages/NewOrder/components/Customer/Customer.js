import React, { useState } from "react";
import CustomerLookup from "./CustomerLookup";
import CustomerFormName from "./CustomerFormName";
import CustomerFormAddress from "./CustomerFormAddress";
import { Box } from "@mui/system";

export default function Customer({ goToMenu }) {
  const [formStep, setFormStep] = useState(0);
  const formSteps = [
    <CustomerLookup goToMenu={goToMenu} />,
    <CustomerFormName />,
    <CustomerFormAddress />,
  ];

  const customerData = JSON.parse(sessionStorage.getItem("0"));
  console.log("customerData", customerData);

  function nextStep() {
    setFormStep((prev) => (prev === formSteps.length - 1 ? 0 : prev + 1));
  }
  function prevStep() {
    setFormStep((prev) => (prev === 0 ? formSteps.length - 1 : prev - 1));
  }
  return (
    <Box component="form" id="customerForm">
      {formSteps[formStep]}
    </Box>
  );
}

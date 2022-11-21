import React, { useState } from "react";
import CustomerLookup from "./CustomerLookup";
import CustomerFormName from "./CustomerFormName";
import CustomerFormAddress from "./CustomerFormAddress";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";

function nextStep(steps, setState) {
  setState((prev) => (prev === steps.length - 1 ? 0 : prev + 1));
}
function prevStep(steps, setState) {
  setState((prev) => (prev === 0 ? steps.length - 1 : prev - 1));
}

export default function Customer({ customers, setOrderCustomer }) {
  const [formStep, setFormStep] = useState(0);
  const navigate = useNavigate();

  const handleCustomerLookup = (phone) => {
    console.log("phone", phone);
    console.log("customers", customers);
  };

  const navigateToMenu = () => navigate("../menu");

  const formSteps = [
    <CustomerLookup
      navigateToMenu={navigateToMenu}
      handleCustomerLookup={handleCustomerLookup}
    />,
    <CustomerFormName nextStep={nextStep} prevStep={prevStep} />,
    <CustomerFormAddress
      prevStep={prevStep}
      onCustomerLookup={handleCustomerLookup}
    />,
  ];

  return <Box id="customerForm">{formSteps[formStep]}</Box>;
}

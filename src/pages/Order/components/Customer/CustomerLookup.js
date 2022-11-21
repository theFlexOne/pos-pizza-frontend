import { Box, Button, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import CustomerTextField from "./CustomerTextField";
import { useCustomer } from "../../../../context/CustomerContext";
import useStyles from "../../../../hooks/useStyles";
import NumPad from "../../../../components/NumPad";
// import NumPad from '../../../../components/NumPad';

export default function CustomerLookup({
  navigateToMenu,
  handleCustomerLookup,
}) {
  const styles = useStyles().customerLookup;

  const [phoneInput, setPhoneInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCustomerLookup(phoneInput);
  };

  return (
    <Box sx={styles.page}>
      <Box sx={styles.formContainer}>
        <Box
          sx={styles.form}
          component="form"
          id="phoneInputForm"
          onSubmit={handleSubmit}
        >
          <Typography variant="h5" component="h1" marginBottom="2rem">
            Please enter telephone number:
          </Typography>
          <Box sx={styles.inputWrapper}>
            <CustomerTextField
              name="phoneNumber"
              label="Phone Number"
              autoFocus={true}
              value={phoneInput}
              // flow
            />
          </Box>
          <Button variant="contained" onClick={navigateToMenu}>
            SWITCH TO MENU
          </Button>
        </Box>
        <Box>
          <Typography
            component="h1"
            variant="h3"
            sx={{
              mt: "5rem",
              fontFamily: "FutureLight",
              fontSize: "5rem",
            }}
          >
            POS Pizza
          </Typography>
          <Typography
            component="p"
            sx={{
              fontFamily: "FutureLight",
              fontSize: "1rem",
              fontWeight: "bold",
            }}
          >
            (Point-of-Sales)
          </Typography>
        </Box>
      </Box>
      <Box className="input-container" sx={styles.inputContainer}>
        <NumPad setInput={setPhoneInput} />
        <Button type="submit" variant="contained" form="phoneInputForm">
          LOOKUP TEL
        </Button>
      </Box>
    </Box>
  );
}

// const { actions } = useCustomer();
// const { lookupCustomer, handleClearInput } = actions;
// const inputRef = useRef();
// const clearField = () => handleClearInput("phoneNumber");
// const handleKeyDown = ({ key }) => key === "Enter" && lookupCustomer();

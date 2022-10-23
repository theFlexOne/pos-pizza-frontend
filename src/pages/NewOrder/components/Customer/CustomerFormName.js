import { Box } from "@mui/material";
import React, { useRef, useEffect, useState } from "react";
// import Keyboard from '../../../../components/Keyboard';
import Keyboard from "../../../../lib/Keyboard/Keyboard";
import { useTheme } from "@emotion/react";
import CustomerTextField from "./CustomerTextField";
import { useCustomer } from "../../../../context/CustomerContext";
import useStyles from "../../../../hooks/useStyles";
import OnscreenKeyboardForm from "../../../../components/OnscreenKeyboardForm";

export default function CustomerFormName({ nextPage, prevPage }) {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();

  // const { firstName } = useCustomer().state;
  const styles = useStyles().customerFormName;
  // const inputRef = useRef();

  // const handleKeyDown = ({ key }) => key === "Enter" && nextPage();
  // const handleInput = (e) => console.dir(inputRef.current);

  // const options = {
  //   nextBtn: {
  //     label: "Next Page",
  //     action: nextPage,
  //     disabled: !firstName,
  //   },
  //   prevBtn: { label: "Prev Page", action: prevPage },
  // };

  return (
    <Box sx={styles.page}>
      {/* <Box sx={styles.formContainer}>
        <Box
          component="form"
          sx={styles.form}
          ref={inputRef}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
        >
          <Box sx={styles.firstNameWrapper}>
            <CustomerTextField
              onEnter={() => nextPage()}
              label="First Name"
              name="firstName"
              autoFocus
              sx={styles.firstName}
            />
          </Box>
          <Box sx={styles.lastNameWrapper}>
            <CustomerTextField
              onEnter={() => nextPage()}
              label="Last Name"
              name="lastName"
              sx={styles.lastName}
            />
          </Box>
        </Box>
      </Box> */}
      <OnscreenKeyboardForm>
        <Box>
          <label htmlFor="firstName"></label>
          <input
            type="text"
            className="first-name"
            id="firstName"
            value={firstName}
          />
        </Box>
        <Box>
          <label htmlFor="lastName"></label>
          <input
            type="text"
            className="last-name"
            id="lastName"
            value={lastName}
          />
        </Box>
      </OnscreenKeyboardForm>
      <Box sx={styles.keyboardContainer}>{/* <Keyboard /> */}</Box>
    </Box>
  );
}

import React, { useCallback, useEffect, useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import useStyles from "../../hooks/useStyles";
import { useAppData } from "../../context/AppDataContext";
import { useNavigate } from "react-router-dom";
import NumPad from "../../components/NumPad";

export const Login = () => {
  const [pin, setPin] = useState("");

  const { loginUser, currentUser } = useAppData();

  const defaultStyles = useStyles("login");
  const styles = {
    ...defaultStyles,
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    p: "2.5rem",
    "& > .container": {
      flexBasis: "30%",
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      border: "1px solid black",
      borderRadius: "6px",
      padding: "1rem",
      backgroundColor: "skyblue",
    },
    "& h2": {},
    "& input": {
      fontSize: "1rem",
      padding: ".5rem 1rem",
      textAlign: "center",
    },
  };

  const navigate = useNavigate();
  const navigateCb = useCallback(() => navigate("/order"), [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(pin);
  };

  const handleChange = (e) => {
    let { value } = e.target;
    value = value.slice(0, 4).replace(/\D/g, "");
    setPin(value);
  };

  const handleNumPadInput = (value) => {
    console.log("value", value);
    if (typeof value === "function") value = value(pin);
    value = value.slice(0, 4).replace(/\D/g, "");
    setPin(value);
  };

  useEffect(() => {
    currentUser && navigateCb("../");
  }, [currentUser, navigateCb]);

  return (
    <Box sx={styles}>
      <Box className="container" component="form" onSubmit={handleSubmit}>
        <Typography component="h2" variant="h5">
          Login to continue
        </Typography>
        <TextField
          value={pin}
          onChange={handleChange}
          onClick={(e) => e.target.focus()}
        />
        <button type="submit">LOGIN</button>
      </Box>
      <NumPad setInput={handleNumPadInput} />
    </Box>
  );
};
export default Login;

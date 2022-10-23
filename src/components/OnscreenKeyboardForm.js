import { useState } from "react";
import Keyboard from "../lib/Keyboard/Keyboard";
import { Box } from "@mui/material";

const OnscreenKeyboardForm = ({
  children,
  onKeyTap,
  onSubmit,
  currentInput,
  formRef,
}) => {
  return (
    <Box className="onscreen-keyboard-form">
      <form ref={formRef} id="onscreenKeyboardForm" onSubmit={onSubmit}>
        {children}
      </form>
      <Keyboard
        form="onscreenKeyboardForm"
        input={currentInput}
        onKeyTap={onKeyTap}
      />
    </Box>
  );
};

export default OnscreenKeyboardForm;

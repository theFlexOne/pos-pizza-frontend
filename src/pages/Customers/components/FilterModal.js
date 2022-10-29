import React, { useRef, useState } from "react";
import {
  Button,
  ButtonGroup,
  Dialog,
  DialogContent,
  TextField,
} from "@mui/material";
import Keyboard from "../../../lib/Keyboard/Keyboard";
import { Box } from "@mui/system";
import { useTheme } from "@emotion/react";

const styles = {
  dialog: {
    display: "flex",
    flexDirection: "column",
    minHeight: "80%",
    p: 0,
  },
  container: {
    backgroundColor: "#353536",
    flexBasis: "100%",
    display: "flex",
    justifyContent: "center",
  },
  form: {
    flexGrow: "1",
    bgcolor: "rgba(255, 255, 255, 0.25)",
    display: "flex",
    alignItems: "center",
    m: "2rem",
    p: "0 5rem",
  },
  textFieldBox: {
    mr: "5rem",
    flex: "1",
  },
  textField: {
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    borderRadius: "4px",
  },
};

export default function FilterModal({ isOpen, setIsOpen, handleFilter }) {
  const inputRef = useRef();

  const [inputValue, setInputValue] = useState("");
  const [filterType, setFilterType] = useState("name");

  const {
    palette: { primary },
  } = useTheme();

  // const options = {
  //   nextBtn: {
  //     label: "search",
  //     action: handleFilter,
  //   },
  //   prevBtn: {
  //     label: "cancel",
  //     action: () => {
  //       setFilter({ text: "", type: "name" });
  //       setIsOpen(false);
  //     },
  //   },
  // };

  const FilterButton = ({ label, disabled }) => {
    const active = label === filterType ? { bgcolor: primary[800] } : {};

    return (
      <Button
        data-filter-value={label}
        variant="contained"
        onClick={(e) => setFilterType(e.target.dataset.filterType)}
        sx={{ ...active, minHeight: "3.5rem", flexBasis: "100%" }}
        disabled={disabled}
      >
        {label}
      </Button>
    );
  };

  const handleClick = () => inputRef.current.focus();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFilter(inputValue, filterType);
  };

  return (
    <Dialog fullScreen open={isOpen} onClose={() => setIsOpen(false)}>
      <DialogContent sx={styles.dialog}>
        <Box sx={styles.container}>
          <Box sx={styles.form}>
            <Box
              sx={styles.textFieldBox}
              component="form"
              id="filterForm"
              onSubmit={handleSubmit}
            >
              <TextField
                id="filterInput"
                label={`Filter customers by ${filterType}:`}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onClick={handleClick}
                sx={styles.textField}
                inputProps={{ autoFocus: true }}
                fullWidth
                inputRef={inputRef}
              />
            </Box>
            <ButtonGroup sx={{ flexBasis: "40%" }}>
              <FilterButton label="name" />
              <FilterButton label="phone" />
              <FilterButton label="address" />
            </ButtonGroup>
          </Box>
        </Box>
        <Keyboard
          activeInputId="filterInput"
          formData={inputValue}
          setFormData={setInputValue}
          form="filterForm"

          // next={filterSubmitBtn}
          // prev={cancelBtn}
        />
      </DialogContent>
    </Dialog>
  );
}

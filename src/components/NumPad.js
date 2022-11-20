import { Box } from "@mui/material";
const phoneSetup = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["C", "0", "￩"],
];

const NumPad = ({ setInput, setup = phoneSetup }) => {
  const NumPadRow = ({ children, ...otherProps }) => {
    return (
      <Box
        className="row"
        sx={{ flexBasis: "0%", display: "flex", gap: ".5rem" }}
        {...otherProps}
      >
        {children}
      </Box>
    );
  };

  const NumPadKey = ({ children, keyChar, ...otherProps }) => {
    const onClick = () => {
      console.log("children", children);
      if (children === "C") return setInput("");
      if (children === "￩") return setInput((prev) => prev.slice(0, -1));
      setInput((prev) => prev + children);
    };
    return (
      <Box
        className="key"
        sx={{ p: ".5rem" }}
        onClick={onClick}
        {...otherProps}
      >
        {children}
      </Box>
    );
  };

  return (
    <Box
      className="num-pad-wrapper"
      sx={{ display: "flex", flexDirection: "column", gap: ".5rem" }}
    >
      {setup.map((row, i) => (
        <NumPadRow key={i + 1}>
          {row.map((key) => (
            <NumPadKey key={key} keyChar={key}>
              {key}
            </NumPadKey>
          ))}
        </NumPadRow>
      ))}
    </Box>
  );
};

export default NumPad;

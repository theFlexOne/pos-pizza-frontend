import { useState } from "react";
import "./keyboard.css";
import KeyboardRow from "./component/KeyboardRow/KeyboardRow";

const initialConfig = {
  lowercase: [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "bksp"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l", "enter"],
    ["z", "x", "c", "v", "b", "n", "m", "-", ".", "'"],
    ["shift", "space"],
  ],
  uppercase: [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "bksp"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", "enter"],
    ["Z", "X", "C", "V", "B", "N", "M", "-", ".", "'"],
    ["shift", "space"],
  ],
};

const Keyboard = ({ onKeyTap, input, form, config = initialConfig }) => {
  // const [isLowercase, setIsLowercase] = useState(true);
  const keys = initialConfig.lowercase;
  return (
    <div className="keyboard">
      {keys.map((row, i) => (
        <KeyboardRow
          form={form}
          setIsLowercase={() => {}}
          input={input}
          onClick={onKeyTap}
          chars={row}
          key={i}
          className={`row-${i + 1}`}
        />
      ))}
    </div>
  );
};

export default Keyboard;

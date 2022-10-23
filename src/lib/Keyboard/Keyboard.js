import { useState } from "react";
import "./keyboard.css";
import KeyboardRow from "./component/KeyboardRow/KeyboardRow";

const keyboardData = {
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

const Keyboard = ({ onInput, input }) => {
  const [isLowercase, setIsLowercase] = useState(true);
  const keys = keyboardData[isLowercase ? "lowercase" : "uppercase"];
  return (
    <div className="keyboard">
      {keys.map((row, i) => (
        <KeyboardRow
          setIsLowercase={setIsLowercase}
          input={input}
          onClick={onInput}
          chars={row}
          key={i}
          className={`row-${i + 1}`}
        />
      ))}
    </div>
  );
};

export default Keyboard;

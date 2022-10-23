import "./keyboardRow.css";
import keyboardLegend from "../../keyboardLegend";
import KeyboardKey from "../KeyboardKey/KeyboardKey";

const KeyboardRow = ({ chars, onClick, input, className, setIsLowercase }) => {
  const toggleShift = () => setIsLowercase((c) => !c);
  return (
    <div className={className}>
      {chars.map((char) => {
        char = keyboardLegend[char];
        if (Object.values(char)[0] === "enter") {
          return (
            <KeyboardKey
              size={char.size}
              type="submit"
              form="fullName"
              key={Object.values(char)[0]}
              char={char}
            />
          );
        }
        if (Object.values(char)[0] === "shift") {
          return (
            <KeyboardKey
              size={char.size}
              key={Object.values(char)[0]}
              onClick={toggleShift}
              char={char}
            />
          );
        }
        return (
          <KeyboardKey
            size={char.size}
            key={Object.values(char)[0]}
            input={input}
            onClick={() => onClick(char.value(input))}
            char={char}
          />
        );
      })}
    </div>
  );
};

export default KeyboardRow;

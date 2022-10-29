import "./keyboardRow.css";
import keyboardLegend from "../../keyboardLegend";
import KeyboardKey from "../KeyboardKey/KeyboardKey";
import EnterKey from "../KeyboardKey/components/EnterKey/EnterKey";
import CharacterKey from "../KeyboardKey/components/CharacterKey/CharacterKey";

const KeyboardRow = ({
  chars,
  onClick,
  input,
  className,
  setIsLowercase,
  form,
}) => {
  const toggleShift = () => setIsLowercase((c) => !c);
  return (
    <div className={className}>
      {chars.map((char) => {
        {
          /* char = keyboardLegend[char]; */
        }
        if (Object.values(char)[0] === "enter") {
          return <EnterKey form={form} key={char} />;
        }
        if (Object.values(char)[0] === "shift") {
          return <KeyboardKey key={char} onClick={toggleShift} char={char} />;
        }
        return (
          <CharacterKey
            key={char}
            input={input}
            onClick={onClick}
            charKey={char}
          />
        );
      })}
    </div>
  );
};

export default KeyboardRow;

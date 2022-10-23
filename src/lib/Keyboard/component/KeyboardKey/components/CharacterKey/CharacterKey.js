import keyboardLegend from "../../../../keyboardLegend";
import KeyboardKey from "../../KeyboardKey";

const CharacterKey = ({ charKey, onClick, input }) => {
  const char = keyboardLegend[charKey];
  console.log("char", char);
  return (
    <KeyboardKey
      input={input}
      onClick={() => onClick(input + char.value)}
      char={char}
      data-char={char.value}
    />
  );
};

export default CharacterKey;

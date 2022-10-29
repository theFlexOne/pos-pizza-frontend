import keyboardLegend from "../../../../keyboardLegend";
import KeyboardKey from "../../KeyboardKey";

const CharacterKey = ({ data, onClick, input }) => {
  return <KeyboardKey input={input} onClick={onClick} char={data} />;
};

export default CharacterKey;

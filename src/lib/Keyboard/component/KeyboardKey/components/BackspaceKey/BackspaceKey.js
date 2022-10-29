import keyboardLegend from "../../../../keyboardLegend";
import KeyboardKey from "../../KeyboardKey";

const data = keyboardLegend.find((k) => k.id === "bksp");

const BackspaceKey = ({ onClick }) => {
  return <KeyboardKey char={data} onClick={onClick} />;
};

export default BackspaceKey;

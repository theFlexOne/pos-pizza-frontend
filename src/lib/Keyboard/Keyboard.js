import "./keyboard.css";
import KeyboardRow from "./component/KeyboardRow/KeyboardRow";
import EnterKey from "./component/KeyboardKey/components/EnterKey/EnterKey";
import CharacterKey from "./component/KeyboardKey/components/CharacterKey/CharacterKey";
import keyboardLegend from "./keyboardLegend";
import BackspaceKey from "./component/KeyboardKey/components/BackspaceKey/BackspaceKey";

const initialConfig = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "bksp"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l", "enter"],
  ["z", "x", "c", "v", "b", "n", "m", "-", ".", "'"],
  ["prev", "space", "next"],
];

const Keyboard = ({
  form,
  formData,
  setFormData,
  activeInputId,
  config = initialConfig,
}) => {
  const input = formData[activeInputId];

  const updateFormData = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleCharKeyClick = (e) => {
    const { char } = e.target.dataset;
    console.log("formData type", typeof formData);
    if (typeof formData === "object") {
      const newData = { ...formData };

      newData[activeInputId] = newData[activeInputId] + char;
      setFormData(newData);
      return;
    }
    console.log("FAIL");
    setFormData((prev) => prev + char);
  };

  const handleBkspClick = () => {
    const newInput = input.slice(0, -1);
    console.log("newInput", newInput);
    updateFormData(activeInputId, newInput);
  };

  return (
    <div className="keyboard">
      {config.map((row, i) => (
        <KeyboardRow
          form={form}
          setIsLowercase={() => {}}
          input={input}
          key={i}
          className={`row-${i + 1}`}
        >
          {row.map((char) => {
            if (char === "bksp")
              return <BackspaceKey key={"bksp"} onClick={handleBkspClick} />;
            if (char === "enter") return <EnterKey form={form} key={"enter"} />;
            const keyData = keyboardLegend.find((key) => key.id === char);
            return (
              <CharacterKey
                data={keyData}
                onClick={handleCharKeyClick}
                key={keyData.id}
              />
            );
          })}
        </KeyboardRow>
      ))}
    </div>
  );
};

export default Keyboard;

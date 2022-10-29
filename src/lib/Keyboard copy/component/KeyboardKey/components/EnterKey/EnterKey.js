import React from "react";
import keyboardLegend from "../../../../keyboardLegend";
import KeyboardKey from "../../KeyboardKey";

const keyData = keyboardLegend.enter;

const EnterKey = ({ form }) => {
  return (
    <KeyboardKey size={keyData.size} type="submit" form={form} char={keyData} />
  );
};

export default EnterKey;

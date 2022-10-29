import React from "react";
import keyboardLegend from "../../../../keyboardLegend";
import KeyboardKey from "../../KeyboardKey";

const data = keyboardLegend.find((k) => k.id === "enter");

const EnterKey = ({ form }) => {
  return <KeyboardKey type="submit" form={form} char={data} />;
};

export default EnterKey;

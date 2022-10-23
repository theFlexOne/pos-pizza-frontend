import "./keyboardKey.css";

import React from "react";

const KeyboardKey = ({ char, onClick, size, form, type = "button" }) => {
  return (
    <button form={form} type={type} className={`key ${size}`} onClick={onClick}>
      {char.label}
    </button>
  );
};

export default KeyboardKey;

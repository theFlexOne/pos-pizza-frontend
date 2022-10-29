import "./keyboardKey.css";

import React from "react";

const KeyboardKey = ({ char, onClick, form, type = "button" }) => {
  return (
    <button
      form={form}
      type={type}
      className={`key ${char.size}`}
      onClick={onClick}
      tabIndex="-1"
      data-char={char.value}
    >
      {char.label}
    </button>
  );
};

export default KeyboardKey;

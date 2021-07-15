import React from "react";
import "./Button.scss";
import { ripple } from "../../../assets/config/ripple";
const Button = (props) => {
  return (
    <button
      style={{ ...props.ButtonStyle }}
      className={`Button ${props.ButtonClassname}`}
      onClick={(e) => {
        ripple(e, "red");
        if (props.clicked) props.clicked();
      }}
      type={props.buttonType}
    >
      {props.children}
    </button>
  );
};

export default Button;

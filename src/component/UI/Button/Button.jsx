import React from "react";
import "./Button.scss";
import { ripple } from "../../../assets/config/ripple";
const Button = (props) => {
  return (
    <button
      style={{ ...props.ButtonStyle }}
      className={`Button ${props.ButtonClassname}`}
      onClick={(e) => {
        ripple(e, props.rippleColor);
        if (props.onClick) props.onClick();
      }}
      type={props.buttonType}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    >
      {props.children}
    </button>
  );
};

export default Button;

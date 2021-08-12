import React, { useState } from "react";
import "./Button.scss";
import { ripple } from "../../../assets/config/ripple";
const Button = (props) => {
  const [hover, setHover] = useState(false);
  const onMouseEnter = () => {
    if (props.onMouseEnter) props.onMouseEnter();
    if(!props.disabled)
      setHover(true);
  };
  let newStyle={}
  const onMouseLeave = () => {
    if (props.onMouseLeave) props.onMouseLeave();
    setHover(false);
  };
  if (props.hoverBGColor && hover){
    newStyle={ ...newStyle, backgroundColor: props.hoverBGColor };
  }
  return (
    <button
      style={{
        ...props.ButtonStyle,
        ...newStyle,
      }}
      disabled={props.disabled}
      className={`Button ${props.ButtonClassname}`}
      onClick={(e) => {
        ripple(e, props.rippleColor);
        if (props.onClick) props.onClick();
      }}
      type={props.buttonType}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {props.children}
    </button>
  );
};

export default Button;

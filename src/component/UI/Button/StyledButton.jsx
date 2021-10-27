import React, { useState } from "react";
import "./StyledButton.scss";
import { useTheme } from "../../../styles/ThemeProvider.js";

const StyledButton = (props) => {
  const [isHover, setIsHover] = useState(false);
  const onMouseEnter = () => {
    setIsHover(true);
  };
  const onMouseLeave = () => {
    setIsHover(false);
  };
  const themeState = useTheme();
  const theme = themeState.computedTheme;
  const newStyle = {
    color: theme.on_background,
    backgroundColor: isHover ? props.hover : props.backgroundColor,
  };
  return (
    <button
      className={`sijam-style-button`}
      style={{ ...newStyle, ...props.ButtonStyle }}
      onClick={(e) => {
        if (props.onClick) props.onClick();
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {props.children}
    </button>
  );
};

export default StyledButton;

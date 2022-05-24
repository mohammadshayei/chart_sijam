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
    backgroundColor: isHover
      ? props.hover
        ? props.hover
        : themeState.isDark
          ? theme.surface_12dp
          : theme.background_color
      : props.backgroundColor,
  };
  return (
    <button
      disabled={props.disabled}
      className={`sijam-style-button ${props.className}`}
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

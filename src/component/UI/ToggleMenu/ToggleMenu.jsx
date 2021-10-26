import React, { useEffect, useState } from "react";
import "./ToggleMenu.scss";
import { RiArrowRightSLine } from "react-icons/ri";
import { RiArrowLeftSLine } from "react-icons/ri";

import { useTheme } from "../../../styles/ThemeProvider";
const ToggleMenu = (props) => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;
  const [hover, setHover] = useState(false);
  const onMouseEnter = () => {
    setHover(true);
  };
  const onMouseLeave = () => {
    setHover(false);
  };
  const iconStyle = {
    fontSize: "1.2rem",
    color: hover ? theme.on_primary : theme.on_background,
  };
  useEffect(() => {
    setHover(false);
  }, [props.onToggleMenu]);
  return (
    <div
      className="toggle-icon-container"
      style={{
        backgroundColor: hover ? theme.primary : theme.surface,
        borderColor: theme.border_color,
        padding: hover
          ? props.isMenuOpen
            ? ".1rem .1rem .1rem .4rem"
            : ".1rem .4rem .1rem .1rem"
          : ".1rem",
        borderRadius: hover ? "45%" : "50%",
        transform: hover
          ? props.isMenuOpen
            ? "translateX(calc( -50% + .2rem ))"
            : "translateX(calc( -50% - .2rem ))"
          : "translateX(-50%)",
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={props.onToggleMenu}
    >
      {props.isMenuOpen ? (
        <RiArrowRightSLine style={iconStyle} />
      ) : (
        <RiArrowLeftSLine style={iconStyle} />
      )}
    </div>
  );
};

export default ToggleMenu;

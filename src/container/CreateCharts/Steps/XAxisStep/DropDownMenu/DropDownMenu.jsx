import React, { useState } from "react";
import "./DropDownMenu.scss";
import ReactDom from "react-dom";
import { useTheme } from "../../../../../styles/ThemeProvider";

const DropDownMenu = (props) => {
  const [hover, setHover] = useState(false);
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  const onMouseEnter = () => {
    setHover(true);
  };
  const onMouseLeave = () => {
    setHover(false);
  };

  const onClickHandler = (item) => {
    props.setSelected(item);
    props.setIsOpen(false);
  };

  return ReactDom.createPortal(
    <div
      className="dropdown-menu-container"
      style={{
        color: theme.on_surface,
        backgroundColor: themeState.isDark ? theme.surface_1dp : theme.surface,
      }}
    >
      {props.items.map((item) => (
        <div
          className="dropDownItem"
          onClick={() => onClickHandler(item)}
          style={{ backgroundColor: props.selected === item && theme.primary }}
        >
          {item}
        </div>
      ))}
    </div>,
    document.getElementById("portal")
  );
};

export default DropDownMenu;

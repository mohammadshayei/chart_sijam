import React from "react";
import "./DropDown.scss";
import { useTheme } from "../../../styles/ThemeProvider.js";

const DropDown = (props) => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  const handleClick = (value) => {
    props.setSelected(value);
    props.setDropDown(false); //state of dropdown activate
  };

  return (
    <div
      className="dropdown"
      style={{
        backgroundColor: theme.surface_12dp,
        borderColor: theme.border_color,
      }}
    >
      {props.items.map((item, index) => (
        <div
          key={item}
          onClick={() => handleClick(item)}
          className="dropdown-item"
          style={{ color: theme.on_background }}
        >
          {item}
          {props.icons && (
            <div className="dropdown-icon">{props.icons[index]}</div>
          )}
        </div>
      ))}
      {props.extraItem && props.extraItem}
    </div>
  );
};

export default DropDown;

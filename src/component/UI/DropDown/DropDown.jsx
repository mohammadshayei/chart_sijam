import React, { useRef, useEffect } from "react";
import "./DropDown.scss";
import { useTheme } from "../../../styles/ThemeProvider.js";
import ReactDom from "react-dom";

function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

const DropDown = (props) => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;
  const divRef = useRef();
  useOnClickOutside(divRef, () => {
    props.setDropDown(false);
  });

  const handleClick = (value, id) => {
    props.onClick && props.onClick(id);
    props.setSelected && props.setSelected(value);
    props.setDropDown(false); //state of dropdown activate
  };

  // ReactDom.createPortal
  return (
    <div
      ref={divRef}
      className="dropdown"
      style={{
        ...props.divStyle,
        backgroundColor: theme.surface_12dp,
        borderColor: theme.border_color,
      }}
    >
      {props.items &&
        props.items.map((item, index) => (
          <div
            key={item.name}
            onClick={() => handleClick(item.name, item.id)}
            className="dropdown-item"
            style={{ ...props.contentStyle, color: theme.on_background }}
          >
            {item.name}
            {item.icon && <div className="dropdown-icon">{item.icon}</div>}
          </div>
        ))}
      {props.extraItems && (
        <div
          className="dropdown-divider"
          style={{ borderColor: theme.border_color }}
        ></div>
      )}
      {props.extraItems &&
        props.extraItems.map((item, index) => (
          <div
            key={item.name}
            onClick={() => handleClick(item.name, item.id)}
            className="dropdown-item"
            style={{ ...props.contentStyle, color: theme.on_background }}
          >
            {item.name}
            {item.icon && <div className="dropdown-icon">{item.icon}</div>}
          </div>
        ))}
    </div>
    // ,
    // document.getElementById("portal")
  );
};

export default DropDown;

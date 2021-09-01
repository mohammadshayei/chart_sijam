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
  const handleClick = (value) => {
    props.onClick && props.onClick(value);
    props.setSelected && props.setSelected(value);
    props.setDropDown(false); //state of dropdown activate
  };

  return ReactDom.createPortal(
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
            onClick={() => handleClick(item)}
            className="dropdown-item"
            style={{ ...props.contentStyle, color: theme.on_background }}
          >
            {item.name}
            {props.icons && (
              <div className="dropdown-icon">{props.icons[index]}</div>
            )}
          </div>
        ))}
      {props.extraItem && props.extraItem}
    </div>,
    document.getElementById("portal")
  );
};

export default DropDown;

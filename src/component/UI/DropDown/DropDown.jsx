import React, { useRef, useEffect } from "react";
import "./DropDown.scss";
import { useTheme } from "../../../styles/ThemeProvider.js";

function useOnClickOutside(divContainerRef, ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (
        !divContainerRef.current ||
        divContainerRef.current.contains(event.target) ||
        !ref.current ||
        ref.current.contains(event.target)
      ) {
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
  useOnClickOutside(props.divContainerRef, divRef, () => {
    props.setDropDown(false);
  });

  const handleClick = (value, id, extra) => {
    props.onClick && props.onClick(id);
    props.setSelected && props.setSelected(value, id, extra);
    props.setDropDown(false); //state of dropdown activate
  };
  // ReactDom.createPortal
  return (
    <div
      ref={divRef}
      className="dropdown"
      style={{
        ...props.divStyle,
        backgroundColor: themeState.isDark ? theme.surface_24dp : theme.surface,
      }}
    >
      {props.items &&
        props.items.map((item, index) => (
          <div
            key={item._id ? item._id : item.name}
            onClick={() => {
              handleClick(props.selector ? item[props.selector] : item.name, item._id ? item._id : item.id, item.extra ? item.extra : "");
            }}
            className="dropdown-item"
            style={{
              ...props.contentStyle,
              color: theme.on_background,
            }}
          >
            {item.icon && <div className="dropdown-icon">{item.icon}</div>}
            {props.selector ? item[props.selector] : item.name}
          </div>
        ))}
      {props.extraItems && (
        <div
          className="dropdown-divider"
          style={{ borderColor: theme.darken_border_color }}
        ></div>
      )}
      {props.extraItems &&
        props.extraItems.map((item, index) => (
          <div
            key={item.name}
            onClick={() => {
              handleClick(props.selector ? item[props.selector] : item.name, item._id ? item._id : item.id, item.extra ? item.extra : "");
            }}
            className="dropdown-item"
            style={{ ...props.contentStyle, color: theme.on_background }}
          >
            {item.icon && <div className="dropdown-icon">{item.icon}</div>}
            {props.selector ? item[props.selector] : item.name}
          </div>
        ))}
      {props.additionalCompnoent && (
        <div
          className="dropdown-divider"
          style={{ borderColor: theme.darken_border_color }}
        ></div>
      )}
      {
        props.additionalCompnoent && props.additionalCompnoent
      }
    </div>
    // ,
    // document.getElementById("portal")
  );
};

export default DropDown;

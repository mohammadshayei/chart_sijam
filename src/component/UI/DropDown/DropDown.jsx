import React from "react";
import "./DropDown.scss";

const DropDown = (props) => {
  return (
    <div className="dropdown">
      {props.dropDownItems.map(
        (
          item,
          index //items of your dropdown
        ) =>
          item === "divider" ? (
            <div className="dropdown-divider"></div>
          ) : (
            <div
              key={`${item}`}
              onClick={(e) => {
                props.setSelected(item); //state of selected item
                props.setDropDown(false); //state of dropdown activate
              }}
              className="dropdown-item"
            >
              {item}
              <div className="dropdown-icon">{props.dropDownIcons[index]}</div>
            </div>
          )
      )}
    </div>
  );
};

export default DropDown;

import React from "react";
import "./DropDown.scss";

const DropDown = (props) => {
  return (
    <div className="dropdown">
      {props.dropDownItems.map((item) => (
        <div
          key={`${item}`}
          onClick={(e) => {
            props.setSelected(item);
            props.setDropDown(false);
          }}
          className="dropdown-item"
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default DropDown;

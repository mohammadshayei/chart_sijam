import React from "react";
import "./DropDown.scss";

const DropDown = (props) => {
  return (
    <div className="dropdown">
      {props.dropDownItems.map((item) => (      //items of your dropdown
        <div
          key={`${item}`}
          onClick={(e) => {
            props.setSelected(item);           //state of selected item
            props.setDropDown(false);          //state of dropdown activate 
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

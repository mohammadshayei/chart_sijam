import React from "react";
import "./DropDownMenu.scss";
import ReactDom from "react-dom";

const DropDownMenu = (props) => {
  const onClickHandler = (item) => {
    props.setSelected(item);
    props.setIsOpen(false);
  };

  return ReactDom.createPortal(
    <div className="dropdown-menu-container">
      {props.items.map((item) => (
        <div
          className={`dropDownItem ${props.selected === item && "selected"}`}
          onClick={() => onClickHandler(item)}
        >
          {item}
        </div>
      ))}
    </div>,
    document.getElementById("portal")
  );
};

export default DropDownMenu;

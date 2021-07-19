import React from "react";
import "./DropDown.scss";

import { setType } from "../../../store/actions/detail";

import chartTypes from "../../../constants/chart-types";
import { root } from "postcss";

const DropDown = (props) => {
  handleClick = (value) => {
    setType({ key: props.root, value, item: "type" });
    props.setDropDown(false); //state of dropdown activate
  };

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
              onClick={handleClick}
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

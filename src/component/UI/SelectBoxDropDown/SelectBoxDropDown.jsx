import React from "react";
import "./SelectBoxDropDown.scss";
import Button from "../../../component/UI/Button/Button";
import { stringFa } from "../../../assets/strings/stringFaCollection";
import FiberManualRecordRoundedIcon from "@material-ui/icons/FiberManualRecordRounded";
import { lightTheme } from "../../../styles/theme";
import CheckBox from "../../../component/Input/CheckBox/CheckBox";
const SelectBoxDropDown = (props) => {
  const widthBox=16
  return (
    <div className="SelectBoxDropDownContainer">
      <div className="SelectBoxDropDownHeader">
        <FiberManualRecordRoundedIcon
          style={{ color: "aqua", cursor: "pointer" }}
        />
        <Button
          rippleColor={lightTheme.ripple_holding_menu_item_color}
          ButtonStyle={{
            width: `${widthBox}rem`,
            marginLeft: ".5rem",
            backgroundColor: "white",
            border: `1px solid rgba(56,56,56,1)`,
            padding: " .rem .5rem .rem 0rem",
            height:'1.8rem',
          }}
        >
          <div className="ButtonContent">
            <p style={{ color: lightTheme.text_menu_item_color }}>
              {stringFa.select_bank}
            </p>
          </div>
        </Button>
      </div>
      <div className="SelectBoxDropDownConetent">
        <div className="TitleContent">
          <span>رهگیری ساخت و تولید</span>
        </div>
        <CheckBox style={{width:`${widthBox}rem`}} title="test" />
        <CheckBox style={{width:`${widthBox}rem`}} title="test" />
        <CheckBox style={{width:`${widthBox}rem`}} title="test" />
        <CheckBox style={{width:`${widthBox}rem`}} title="test" />
        <CheckBox style={{width:`${widthBox}rem`}} title="test" />
        <CheckBox style={{width:`${widthBox}rem`}} title="test" />
        <CheckBox style={{width:`${widthBox}rem`}} title="test" />
        <CheckBox style={{width:`${widthBox}rem`}} title="test" />
      </div>
    </div>
  );
};

export default SelectBoxDropDown;

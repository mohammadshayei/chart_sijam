import React, { useEffect, useState } from "react";
import "./MenuItem.scss";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import FiberManualRecordRoundedIcon from "@material-ui/icons/FiberManualRecordRounded"; //to por
import RadioButtonUncheckedRoundedIcon from "@material-ui/icons/RadioButtonUncheckedRounded"; // to khali
import { lightTheme } from "../../../styles/theme";

const MenuItem = (props) => {
  const [clicked, setClicked] = useState(false);
  const styleIcon = {
    width: "17px",
    height: "17px",
    color: lightTheme.menu_icons_color,
  };
  useEffect(() => {
    if (props.clickedList) {
      setClicked(
        props.clickedList.find((item) => item === `${props.type}${props.name}`)
      );
      
    }
  }, [props.clickedList]);
  return (
    <div
      className="MenuItemContainer"
      style={{
        backgroundColor:
          props.type === "holding" ? lightTheme.holding_menu_item_color : "",
      }}
      onClick={() =>
        props.onClick(props.type, props.data, props.index, props.name)
      }
    >
      <div className="DropDownIcon">
        {(props.data.length !== 0 && props.type !=='software') ? (
          <ArrowBackIosRoundedIcon
            style={{
              width: "17px",
              height: "17px",
              color: lightTheme.arrows_color,
            }}
          />
        ) : null}
      </div>
      <div className="TitleContainer">
        <span style={{color:props.type ==='software' && clicked ?lightTheme.clicked_darken_color:''}}>{props.name}</span>
      </div>
      <div className="IconContainer">
        {props.type === "holding" ? (
          <HomeRoundedIcon style={styleIcon} />
        ) : props.type === "company" ? (
          clicked ? (
            <FiberManualRecordRoundedIcon style={styleIcon} />
          ) : (
            <RadioButtonUncheckedRoundedIcon style={styleIcon} />
          )
        ) : null}
      </div>
    </div>
  );
};

export default MenuItem;

import React, { useEffect, useState, useCallback } from "react";
import "./MenuItem.scss";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import FiberManualRecordRoundedIcon from "@material-ui/icons/FiberManualRecordRounded"; //to por
import RadioButtonUncheckedRoundedIcon from "@material-ui/icons/RadioButtonUncheckedRounded"; // to khali
import { useSelector } from "react-redux";

import { lightTheme } from "../../../styles/theme";

const MenuItem = (props) => {
  const [clicked, setClicked] = useState(false);
  const [bg, setBg] = useState("");
  const [fontColor, setFontColor] = useState(lightTheme.text_menu_item_color);
  const [iconColor, setIconColor] = useState(lightTheme.menu_icons_color);
  const [arrowsColor, setArrowsColor] = useState(lightTheme.arrows_color);

  const software = useSelector((state) => state.software);

  const styleIcon = {
    width: "13px",
    height: "13px",
    // color: lightTheme.menu_icons_color,
    color: iconColor,
    marginLeft: ".3rem",
    marginBottom: ".08rem",
  };

  useEffect(() => {
    if (props.clickedList) {
      setClicked(
        props.clickedList.find((item) => item === `${props.type}${props.name}`)
      );
    }
    if (
      props.type === "holding" &&
      props.clickedList.find((item) => item === `${props.type}${props.name}`)
    ) {
      setFontColor("");
      setBg(lightTheme.holding_menu_item_color);
    } else if (
      props.type === "company" &&
      props.clickedList.find((item) => item === `${props.type}${props.name}`)
    ) {
      setFontColor(lightTheme.text_clicked_menu_color);
      setIconColor(lightTheme.text_clicked_menu_color);
      setArrowsColor(lightTheme.text_clicked_menu_color);
      setBg(
        `linear-gradient(${lightTheme.clicked_darken_color},${lightTheme.clicked_lighten_color})`
      );
    } else if (software.id === props.id) {
      console.log('hellow')
      setFontColor(lightTheme.clicked_darken_color);
    }

    if (
      props.type === "holding" &&
      props.closedList.find((item) => item === `${props.type}${props.name}`)
    ) {
      setBg("");
    } else if (
      props.type === "company" &&
      props.closedList.find((item) => item === `${props.type}${props.name}`)
    ) {
      setFontColor(lightTheme.text_menu_item_color);
      setIconColor(lightTheme.menu_icons_color);
      setArrowsColor(lightTheme.arrows_color);
      setBg("");
    } else if (software.id === props.id) {
      setFontColor(lightTheme.text_menu_item_color);
    }
  }, [props.clickedList, props.closedList,software]);

  return (
    <div
      className="MenuItemContainer"
      style={{
        background: bg,
      }}
      onClick={() =>
        props.onClick(props.id, props.type, props.data, props.index, props.name)
      }
    >
      <div className="DropDownIcon">
        {/* {props.data.length !== 0 && props.type !== "software" ? ( */}
        {props.data && props.type !== "software" ? (
          <ArrowBackIosRoundedIcon
            className={`${
              props.type !== "software" &&
              props.clickedList.find(
                (item) => item === `${props.type}${props.name}`
              )
                ? "DropDownOpenRotate"
                : ""
            }
            ${
              props.type !== "software" &&
              props.closedList.find(
                (item) => item === `${props.type}${props.name}`
              )
                ? "DropDownCloseRotate"
                : ""
            }
              `}
            style={{
              width: "17px",
              height: "17px",
              color: arrowsColor,
            }}
          />
        ) : null}
      </div>

      <div className="TitleContainer">
        <span
          style={{
            color: fontColor,
            // software.id === props.id ? lightTheme.clicked_darken_color : "",
            fontWeight: software.id === props.id ? "bold" : "",
          }}
        >
          {props.name}
        </span>
      </div>

      <div className="IconContainer">
        {props.type === "holding" ? (
          <HomeRoundedIcon style={{ ...styleIcon, width: 17, height: 17 }} />
        ) : props.type === "company" ? (
          clicked ? (
            <FiberManualRecordRoundedIcon
              style={{ ...styleIcon, width: 12, height: 12 }}
            />
          ) : (
            <RadioButtonUncheckedRoundedIcon
              style={{ ...styleIcon, width: 11, height: 11 }}
            />
          )
        ) : null}
      </div>
    </div>
  );
};

export default MenuItem;

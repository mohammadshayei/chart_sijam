import React, { useEffect, useState } from "react";
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
  const [fontSize, setFontSize] = useState(12);

  const [boxShadow, setBoxShadow] = useState("");
  const [isHover, setIsHover] = useState(false);
  const detail = useSelector((state) => state.detail);

  const styleIcon = {
    width: "13px",
    height: "13px",
    // color: lightTheme.menu_icons_color,
    color: iconColor,
    marginLeft: ".3rem",
    marginBottom: ".08rem",
  };

  const onMouseEnter = (e) => {
    if (detail.software) {
      if (!clicked && detail.software.id !== props.id) {
        setIsHover(true);
      }
    }
  };
  const onMouseLeave = (e) => {
    if (detail.software) {
      if (!clicked && detail.software.id !== props.id) {
        setIsHover(false);
      }
    }
  };
  useEffect(() => {
    if (props.type === "software") setFontSize(11.5);
    else setFontSize(12);
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
      setBoxShadow("");
    } else if (
      props.type === "company" &&
      props.clickedList.find((item) => item === `${props.type}${props.name}`)
    ) {
      setFontColor(lightTheme.text_clicked_menu_color);
      setIconColor(lightTheme.text_clicked_menu_color);
      setArrowsColor(lightTheme.text_clicked_menu_color);
      setBoxShadow("rgba(0, 0, 0, 0.1) -4px 9px 25px -6px");
      setBg(
        `linear-gradient(150deg,${lightTheme.clicked_darken_color},${lightTheme.clicked_lighten_color})`
      );
    } else if (detail.software) {
      if (detail.software.id === props.id) {
        setFontColor(lightTheme.clicked_darken_color);
        setBoxShadow("");
      }
    }

    if (
      props.type === "holding" &&
      props.closedList.find((item) => item === `${props.type}${props.name}`)
    ) {
      setBg("");
      setBoxShadow("");
    } else if (
      props.type === "company" &&
      props.closedList.find((item) => item === `${props.type}${props.name}`)
    ) {
      setBoxShadow("");
      setFontColor(lightTheme.text_menu_item_color);
      setIconColor(lightTheme.menu_icons_color);
      setArrowsColor(lightTheme.arrows_color);
      setBg("");
    } else if (props.type === "software" && detail.software) {
      if (detail.software.id !== props.id) {
        setBoxShadow("");
        setFontColor(lightTheme.text_menu_item_color);
      }
    }
  }, [props.clickedList, props.name,props.id,props.type,props.closedList, detail.software]);

  return (
    <div
      className="MenuItemContainer"
      style={{
        background: bg,
        boxShadow: boxShadow,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={(e) => {
        props.onClick(
          props.id,
          props.type,
          props.data,
          props.index,
          props.name
        );
      }}
    >
      <div className="DropDownIcon">
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
              width: "13px",
              height: "13px",
              color: arrowsColor,
            }}
          />
        ) : null}
      </div>

      <div className="TitleContainer">
        <span
          style={{
            color: fontColor,
            fontWeight: detail.software
              ? detail.software.id === props.id
                ? "bold"
                : ""
              : "",
            marginRight:
              props.type === "company" || props.type === "holding"
                ? ".7rem"
                : "",
            ...{
              fontSize: isHover ? `${fontSize + 0.5}px` : fontSize,
              transform: isHover ? "scale(1.08)" : "",
            },
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

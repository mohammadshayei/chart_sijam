import React, { useEffect, useState } from "react";
import "./MenuItem.scss";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import FiberManualRecordRoundedIcon from "@material-ui/icons/FiberManualRecordRounded"; //to por
import RadioButtonUncheckedRoundedIcon from "@material-ui/icons/RadioButtonUncheckedRounded"; // to khali
import { ripple } from "../../../assets/config/ripple";
import { useTheme } from "../../../styles/ThemeProvider";
import { useSelector } from "react-redux";

const MenuItem = (props) => {
  const detail = useSelector((state) => state.detail);
  const [clicked, setClicked] = useState(false);
  const styleIcon = {
    width: "13px",
    height: "13px",
    marginLeft: ".3rem",
    marginBottom: ".08rem",
  };
  const themeState = useTheme();
  const theme = themeState.computedTheme;
  useEffect(() => {
    (detail.holding && detail.holding.id === props.id) ||
    (detail.company && detail.company.id === props.id)
      ? setClicked(true)
      : setClicked(false);
  }, [detail.holding, detail.company, props.id]);

  return (
    <div
      className="MenuItemContainer"
      style={{
        background:
          detail.holding && detail.holding.id === props.id
            ? theme.holding_menu_item_color
            : detail.company && detail.company.id === props.id
            ? `linear-gradient(150deg,${theme.clicked_darken_color},${theme.clicked_lighten_color})`
            : "",
        boxShadow:
          detail.company && detail.company.id === props.id
            ? "rgba(0, 0, 0, 0.1) -4px 9px 25px -6px"
            : "",
      }}
      onClick={(e) => {
        ripple(
          e,
          detail.company && detail.company.id === props.id
            ? theme.clicked_darken_color
            : detail.holding && detail.holding.id === props.id
            ? theme.ripple_holding_menu_item_color
            : "black"
        );
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
            className={`${clicked ? "DropDownOpenRotate" : ""}
            ${props.unClicked === props.id ? "DropDownCloseRotate" : ""}
              `}
            style={{
              width: "13px",
              height: "13px",
              color:
                detail.company && detail.company.id === props.id
                  ? theme.text_clicked_menu_color
                  : theme.arrows_color,
            }}
          />
        ) : null}
      </div>

      <div className="TitleContainer">
        <span
          style={{
            color:
              detail.software && detail.software.id === props.id
                ? theme.clicked_darken_color
                : detail.company && detail.company.id === props.id
                ? theme.text_clicked_menu_color
                : theme.text_color,
            fontWeight: detail.software
              ? detail.software.id === props.id
                ? "bold"
                : ""
              : "",
            marginRight:
              props.type === "company" || props.type === "holding"
                ? ".7rem"
                : "",
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
              style={{
                ...styleIcon,
                color:
                  detail.company && detail.company.id === props.id
                    ? theme.text_clicked_menu_color
                    : theme.arrows_color,
                width: 12,
                height: 12,
              }}
            />
          ) : (
            <RadioButtonUncheckedRoundedIcon
              style={{
                ...styleIcon,
                color: theme.arrows_color,
                width: 11,
                height: 11,
              }}
            />
          )
        ) : null}
      </div>
    </div>
  );
};

export default MenuItem;

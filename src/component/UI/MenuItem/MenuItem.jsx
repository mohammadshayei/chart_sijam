import React, { useEffect, useState } from "react";
import "./MenuItem.scss";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import FiberManualRecordRoundedIcon from "@material-ui/icons/FiberManualRecordRounded"; //to por
import RadioButtonUncheckedRoundedIcon from "@material-ui/icons/RadioButtonUncheckedRounded"; // to khali
import { ripple } from "../../../assets/config/ripple";
import { useTheme } from "../../../styles/ThemeProvider";
import { useSelector } from "react-redux";

const MenuItem = ({ _id, selected, parents, name, onClick }) => {
  const detail = useSelector((state) => state.detail);
  const [clicked, setClicked] = useState(false);
  const [type, setType] = useState('')
  const styleIcon = {
    width: "13px",
    height: "13px",
    marginLeft: ".3rem",
    marginBottom: ".08rem",
  };
  const themeState = useTheme();
  const theme = themeState.computedTheme;


  // useEffect(() => {
  //   (detail.holding && detail.holding.id === props.id) ||
  //   (detail.company && detail.company.id === props.id)
  //   ? setClicked(true)
  //   : setClicked(false);
  // }, [detail.holding, detail.company, props.id]);

  // const onContextMenuHandler = (e) => {
  //   if (props.type !== "software") return;
  //   e.preventDefault();
  //   props.onRightClickHandler(e,props.id, props.type, props.parent);
  // };

  useEffect(() => {
    if (!parents) return;
    switch (parents.length) {
      case 0:
        setType('company')
        break;
      case 1:
        setType('software')
        break;
      case 2:
        setType('activeBackup')
        break;
      default:
        setType('company')
        break;
    }

  }, [parents])
  // console.log(1,  type, selected, name)
  return (
    <div
      className="MenuItemContainer"
      // onContextMenu={onContextMenuHandler}
      style={{
        background:
          // detail.holding && detail.holding.id === props.id
          type === 'company' && selected
            ? themeState.isDark
              ? theme.surface_24dp
              : theme.background_color
            // : detail.company && detail.company.id === props.id
            : type === 'software' && selected
              ? `linear-gradient(150deg,${theme.primary},${theme.secondary})`
              : "",
        boxShadow:
          // detail.company && detail.company.id === props.id
          type === 'software' && selected
            ? "rgba(0, 0, 0, 0.1) -4px 9px 25px -6px"
            : "",
      }}
      onClick={(e) => {
        ripple(
          e,
          // detail.company && detail.company.id === props.id
          type === 'software' && selected
            ? theme.on_primary
            // : detail.holding && detail.holding.id === props.id
            : type === 'company' && selected
              ? themeState.isDark
                ? theme.surface_42dp
                : theme.surface
              : themeState.isDark
                ? theme.surface_42dp
                : theme.surface
        );
        onClick(_id, selected, parents);
      }}
    >
      <div className="DropDownIcon">
        {type === "company" || type === "software" ? (
          <ArrowBackIosRoundedIcon
            className={`${selected ? "DropDownOpenRotate" : ""}`}
            // ${props.unClicked === props.id ? "DropDownCloseRotate" : ""}
            style={{
              width: "13px",
              height: "13px",
              color:
                // detail.company && detail.company.id === props.id
                type === 'software' && selected
                  ? theme.on_primary
                  : theme.arrows_color,
            }}
          />
        ) : null}
      </div>

      <div className="TitleContainer">
        <span
          style={{
            color:
              // detail.software && detail.software.id === props.id
              type === 'activeBackup' && selected
                ? theme.primary
                // : detail.company && detail.company.id === props.id
                : type === 'software' && selected
                  ? theme.on_primary
                  : theme.on_background,
            fontWeight: type === 'activeBackup'
              ? selected
                ? "bold"
                : ""
              : "",
            marginRight:
              type === "software" || type === "company"
                ? ".7rem"
                : "",
          }}
        >
          {name}
        </span>
      </div>

      <div className="IconContainer">
        {type === "company" ? (
          <HomeRoundedIcon style={{ ...styleIcon, width: 17, height: 17 }} />
        ) : type === "software" ? (
          selected ? (
            <FiberManualRecordRoundedIcon
              style={{
                ...styleIcon,
                color:
                  type === 'software' && selected
                    ? theme.on_primary
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
export default React.memo(MenuItem);

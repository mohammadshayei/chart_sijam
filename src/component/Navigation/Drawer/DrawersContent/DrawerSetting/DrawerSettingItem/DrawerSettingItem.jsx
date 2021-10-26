import React, { useEffect, useState } from "react";
import "./DrawerSettingItem.scss";
import { GiSettingsKnobs } from "react-icons/gi";
import { FiUsers } from "react-icons/fi";
import { MdLockOutline } from "react-icons/md";

import { useTheme } from "../../../../../../styles/ThemeProvider";
import { Link } from "react-router-dom";
export const DrawerSettingItem = (props) => {
  const [iconComponent, setIconComponent] = useState(null);
  const [divStyle, setDivStyle] = useState(null);
  const [iconColor, setIconColor] = useState(null);
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  const onMouseEnter = () => {
    if (!props.isSelected)
      setDivStyle({ backgroundColor: theme.hover, opacity: "1" });
  };
  const onMouseLeave = () => {
    if (!props.isSelected) setDivStyle({ backgroundColor: "", opacity: ".2" });
  };
  const iconStyle = {
    marginRight: "1rem",
    fontSize: "17px",
    fontWeight: "bold",
    zIndex: 10,
    color: props.isSelected ? theme.primary : theme.on_background,
  };
  useEffect(() => {
    switch (props.icon) {
      case "customization":
        setIconComponent(
          <GiSettingsKnobs
            style={{
              ...iconStyle,
              transform: "rotate(90deg)",
            }}
          />
        );
        break;
      case "users":
        setIconComponent(
          <FiUsers
            style={{
              ...iconStyle,
            }}
          />
        );
        break;
      case "permissions":
        setIconComponent(
          <MdLockOutline
            style={{
              ...iconStyle,
            }}
          />
        );
        break;

      default:
        break;
    }
  }, [props.icon, props.isSelected]);
  useEffect(() => {
    setDivStyle({ backgroundColor: "", opacity: ".2" });
    if (props.isSelected)
      setDivStyle({ backgroundColor: theme.primary, opacity: ".2" });
  }, [props.isSelected]);

  return (
    <Link
      to={{
        pathname: `/view/setting`,
        search: `?menu_item=${props.index+1}${props.index+1===3?'&s=1':''}`,
      }}
      style={{ textDecoration: "none", color: theme.on_background }}
    >

      <div
        className="MenuItemContainer drawer-setting-item-container"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={props.onClick}
      >
        <div className="div-behind" style={{ ...divStyle }} />
        <p
          style={{
            marginRight: ".5rem",
            fontSize: "12px ",
            zIndex: 10,
          }}
        >
          {props.title}
        </p>
        {iconComponent && iconComponent}
      </div>
    </Link>
  );
};

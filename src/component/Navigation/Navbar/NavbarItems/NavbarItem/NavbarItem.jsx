import React, { useEffect, useState } from "react";
import { BiBarChartSquare } from "react-icons/bi";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useTheme } from "../../../../../styles/ThemeProvider";
import Hint from "../../../../UI/Hint/Hint";
import "./NavbarItem.scss";
const NavbarItem = (props) => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;
  const [icon, setIcon] = useState(null);
  const [bgColor, setBgColor] = useState(null);
  const [hintShow, setHintShow] = useState(false);
  const [hover, setHover] = useState(false);
  const [selected, setSelected] = useState(false);
  const location = useLocation();
  const iconStyle = {
    color: "white",
    fontSize: "30px",
  };

  const onMouseEnter = () => {
    setHover(true);
    if (!selected) {
      setBgColor("rgba(209, 204, 204,0.15)");
    }
  };
  const onMouseLeave = () => {
    setHover(false);
    if (!selected) {
      setBgColor("");
    }
  };
  useEffect(() => {
    if (hover) {
      const timer = setTimeout(() => {
        setHintShow(true);
      }, 200);
      return () => {
        setHintShow(false);
        return clearTimeout(timer);
      };
    }
  }, [hover]);
  useEffect(() => {
    if (props.name) {
      switch (props.name) {
        case "view":
          setIcon(<BiBarChartSquare style={iconStyle} />);
          break;

        default:
          break;
      }
    }
  }, [props.name]);
  useEffect(() => {
    switch (location.pathname) {
      case "/view":
        setSelected(true);
        break;

      default:
        setSelected(false);
        break;
    }
  }, [location.pathname]);
  useEffect(() => {
    if (selected) setBgColor("rgba(209, 204, 204,0.3)");
  }, [props.detail,selected]);
  return (
    <div className="navbar-item-container">
      <Link
        to={{
          pathname: props.detail.pathname,
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="navbar-item-content"
        onClick={props.detail.onClick}
        style={{ backgroundColor: bgColor }}
      >
        {icon}
      </Link>
      {selected && <div className="arrow-container" />}
      {hintShow && (
        <Hint
          hint={props.detail.hint}
          tooltipStyle={{
            backgroundColor: `${theme.on_background}`,
            color: theme.background_color,
          }}
          arrowStyle={{
            borderBottom: ` 8px solid ${theme.on_background}`,
          }}
        />
      )}
    </div>
  );
};

export default NavbarItem;

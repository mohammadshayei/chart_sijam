import React from "react";
import "./Header.scss";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import IMAGE from "../../../../assets/images/simamIcon.png";
import { stringFa } from "../../../../assets/strings/strignFa";
import { lightTheme } from "../../../../styles/theme";
const Header = (props) => {
  return (
    <div
      className={`HeaderContainer`}
    >
      <MenuRoundedIcon
        style={{
          width: "30px",
          height: "30px",
          color: lightTheme.clicked_darken_color,
          cursor:'pointer'
        }}
        onClick={props.onToggleMenu}
      />
      <div className="LogoContainer">
        <span style={{ color: lightTheme.clicked_darken_color }}>
          {stringFa.fekrafzar}
        </span>
        <img src={IMAGE} alt="" />
      </div>
    </div>
  );
};

export default Header;

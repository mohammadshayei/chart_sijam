import React from "react";
import "./Header.scss";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import IMAGE from "../../../../assets/images/simamIcon.png";
import { stringFa } from "../../../../assets/strings/stringFaCollection";
import { useTheme } from "../../../../styles/ThemeProvider";

const Header = (props) => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  return (
    <div className={`HeaderContainer`}>
      <MenuRoundedIcon
        style={{
          width: "30px",
          height: "30px",
          color: theme.primary,
          cursor: "pointer",
        }}
        onClick={props.onToggleMenu}
      />
      <div className="LogoContainer">
        <span style={{ color: theme.primary }}>{stringFa.fekrafzar}</span>
        <img src={IMAGE} alt="" />
      </div>
    </div>
  );
};

export default Header;

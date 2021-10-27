import React from "react";
import "./Header.scss";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import { useTheme } from "../../../../styles/ThemeProvider";
import { FaRegCircle } from "react-icons/fa";

const Header = (props) => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  return (
    <div className={`HeaderContainer`}>
      <FaRegCircle
        style={{
          fontSize:"1rem",
          color: theme.primary,
          cursor: "pointer",
        }}
        onClick={props.onToggleMenu}
      />
     
    </div>
  );
};

export default Header;

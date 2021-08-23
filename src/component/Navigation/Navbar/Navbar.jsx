import React, { useState } from "react";
import ProfileDetail from "../../UI/ProfileDetail/ProfileDetail";
import classes from "./Navbar.module.scss";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import StarBorderRoundedIcon from "@material-ui/icons/StarBorderRounded";
import { useTheme } from "../../../styles/ThemeProvider";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import BanksContainer from "./BanksContainer/BanksContainer";
import { ripple } from "../../../assets/config/ripple";
import { stringFa } from "../../../assets/strings/stringFaCollection.js";
import ToolsContainer from "./ToolsContainer/ToolsContainer";

const Navbar = (props) => {
  const [isFav, setIsFav] = useState(false);
  const themeState = useTheme();
  const theme = themeState.computedTheme;
  const onStarClickHandler = (e) => {
    ripple(e, theme.ripple_star_color);
    setIsFav(!isFav);
  };
  const starStyles = {
    color: theme.star_color,
    cursor: "pointer",
    width: "30px",
    height: "30px",
  };

  return (
    <div
      className={classes.NavbarContainer}
      style={{ borderColor: theme.border_color }}
    >
      <div className={classes.ProfileSectionContainer}>
        <ProfileDetail />
        <div className={classes.IconContainer}>
          <div className={classes.StarContainer} onClick={onStarClickHandler}>
            {isFav ? (
              <StarRoundedIcon style={starStyles} />
            ) : (
              <StarBorderRoundedIcon style={starStyles} />
            )}
          </div>
          {props.isMenuOpen ? null : (
            <MenuRoundedIcon
              style={{
                width: "30px",
                height: "30px",
                color: theme.clicked_darken_color,
                cursor: "pointer",
              }}
              onClick={props.onToggleMenu}
            />
          )}
        </div>
      </div>
      <div
        className={classes.ToolsContainer}
        style={{ borderColor: theme.border_color, color: theme.on_background }}
      >
        <ToolsContainer isModalOpen={props.isModalOpen} />
      </div>
      <div className={classes.BanksContainer}>
        <BanksContainer />
      </div>
    </div>
  );
};

export default Navbar;

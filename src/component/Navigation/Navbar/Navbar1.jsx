import React, { useState } from "react";
import ProfileDetail from "../../UI/ProfileDetail/ProfileDetail";
import classes from "./Navbar1.module.scss";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import StarBorderRoundedIcon from "@material-ui/icons/StarBorderRounded";
import { useTheme } from "../../../styles/ThemeProvider";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import BanksContainer from "../../../container/Body/BodyViewContainer/BanksContainer/BanksContainer";
import { ripple } from "../../../assets/config/ripple";
import ToolsContainer from "../../../container/Body/BodyViewContainer/HeaderViewContent/ToolsContainer/ToolsContainer";
import { useSelector } from "react-redux";
import GroupButton from "../../UI/GroupButton/GroupButton.jsx";

const Navbar = (props) => {
  const [isFav, setIsFav] = useState(false);
  const detail = useSelector((state) => state.detail);
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
                color: theme.primary,
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
        {detail.software && <BanksContainer />}
      </div>
    </div>
  );
};

export default Navbar;

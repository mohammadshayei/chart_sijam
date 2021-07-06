import React, { useState } from "react";
import ProfileDetail from "../../UI/ProfileDetail/ProfileDetail";
import classes from "./Navbar.module.scss";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import StarBorderRoundedIcon from "@material-ui/icons/StarBorderRounded";
import { lightTheme } from "../../../styles/theme";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";

const Navbar = (props) => {
  const [isFav, setIsFav] = useState(false);
  const onStarClickHandler = () => {
    setIsFav(!isFav);
  };
  const starStyles = {
    color: lightTheme.star_color,
    cursor: "pointer",
    width: "30px",
    height: "30px",
  };
  return (
    <div className={classes.NavbarContainer}>
      <div className={classes.ProfileSectionContainer}>
        <ProfileDetail />
        <div className={classes.IconContainer}>
          {isFav ? (
            <StarRoundedIcon onClick={onStarClickHandler} style={starStyles} />
          ) : (
            <StarBorderRoundedIcon
              onClick={onStarClickHandler}
              style={starStyles}
            />
          )}
          {props.isMenuOpen ? null : (
            <MenuRoundedIcon
              style={{
                width: "30px",
                height: "30px",
                color: lightTheme.clicked_darken_color,
                cursor: "pointer",
              }}
              onClick={props.onToggleMenu}
            />
          )}
        </div>
      </div>
      <div className={classes.BanksContainer}></div>
    </div>
  );
};

export default Navbar;

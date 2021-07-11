import React, { useState } from "react";
import ProfileDetail from "../../UI/ProfileDetail/ProfileDetail";
import classes from "./Navbar.module.scss";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import StarBorderRoundedIcon from "@material-ui/icons/StarBorderRounded";
import { lightTheme } from "../../../styles/theme";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import BanksContainer from "./BanksContainer/BanksContainer";
import { ripple } from "../../../assets/config/ripple";
const Navbar = (props) => {
  const [isFav, setIsFav] = useState(false);
  const onStarClickHandler = (e) => {
    ripple(e, lightTheme.ripple_star_color);
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
                color: lightTheme.clicked_darken_color,
                cursor: "pointer",
              }}
              onClick={props.onToggleMenu}
            />
          )}
        </div>
      </div>
      <div className={classes.BanksContainer}>
        <BanksContainer />
      </div>
    </div>
  );
};

export default Navbar;

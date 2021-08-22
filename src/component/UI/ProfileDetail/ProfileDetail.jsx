import React, { useState } from "react";
import classes from "./ProfileDetail.module.scss";
import IMAGE from "../../../assets/images/avatar.png";
import { useTheme } from "../../../styles/ThemeProvider";
import ArrowDropDownCircleRoundedIcon from "@material-ui/icons/ArrowDropDownCircleRounded";
import { CgDarkMode } from "react-icons/cg";

const ProfileDetail = (props) => {
  const [isHover, setIsHover] = useState(false);
  const themeState = useTheme();
  const theme = themeState.computedTheme;
  const onMouseEnter = () => {
    setIsHover(true);
  };
  const onMouseLeave = () => {
    setIsHover(false);
  };
  return (
    <div className={classes.ProfileDetailContainer}>
      <img src={IMAGE} alt="profile" />
      <span style={{ color: theme.text_color }}>کاربر مهمان</span>
      <div
        className={classes.DropDownContainer}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={{
          backgroundColor: isHover ? "rgba(0, 0, 0,0.2)" : "",
        }}
      >
        <ArrowDropDownCircleRoundedIcon
          style={{
            color: theme.on_surface,
            width: "17px",
            height: "17px",
          }}
        />
      </div>
      <button
        className={classes.darkModeToggle}
        onClick={() => themeState.toggle()}
      >
        <CgDarkMode />
      </button>
    </div>
  );
};
export default ProfileDetail;

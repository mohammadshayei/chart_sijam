import React, { useEffect, useState } from "react";
import classes from "./ProfileDetail.module.scss";
import IMAGE from "../../../assets/images/avatar.png";
import { useTheme } from "../../../styles/ThemeProvider";
import DropDown from "../../UI/DropDown/DropDown";
import { useDispatch, useSelector } from "react-redux";
import ArrowDropDownCircleRoundedIcon from "@material-ui/icons/ArrowDropDownCircleRounded";
import { stringFa } from "./../../../assets/strings/stringFaCollection";
import * as actions from "../../../store/actions/index";
import { baseUrl } from "../../../constants/Config";
import SkeletonElement from "../../Skeletons/SkeletonElement";
import SkeletonProfile from "../../Skeletons/SkeletonProfile";

const ProfileDetail = (props) => {
  const [isHover, setIsHover] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const themeState = useTheme();
  const [imageSrc, setImageSrc] = useState(`${baseUrl}images/avatar.png`);
  const dispatch = useDispatch();
  const userDetail = useSelector((state) => state.auth.user);
  const logout = () => {
    dispatch(actions.logout());
  };
  const theme = themeState.computedTheme;
  const userMenuItems = [
    {
      name: themeState.isDark ? stringFa.light_theme : stringFa.dark_theme,
      id: "change_theme",
    },
    { name: stringFa.log_out, id: "log_out" },
  ];
  const onMouseEnter = () => {
    setIsHover(true);
  };
  const onMouseLeave = () => {
    setIsHover(false);
  };

  useEffect(() => {
    if (userDetail && userDetail.image) {
      setImageSrc(`${baseUrl}images/${userDetail.image}.png`);
    }
  }, [userDetail]);
  const handleUserMenu = (id) => {
    if (id === "change_theme") themeState.toggle();
    else if (id === "log_out") logout();
  };
  return (
    <div className={classes.ProfileDetailContainer}>
      {userDetail ? (
        <React.Fragment>
          <div className={classes.imageContainer}>
            <img src={imageSrc} alt="profile" />
          </div>
          <span style={{ color: theme.text_color }}>
            {userDetail.name_family}
          </span>
        </React.Fragment>
      ) : (
        <SkeletonProfile />
      )}
      <div
        className={classes.DropDownContainer}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={{
          backgroundColor: isHover ? "rgba(0, 0, 0,0.2)" : "",
        }}
        onClick={() => {
          setUserMenu(!userMenu);
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
      {userMenu && (
        <DropDown
          divStyle={{
            top: "1.6rem",
          }}
          items={userMenuItems}
          setDropDown={setUserMenu}
          onClick={handleUserMenu}
        />
      )}
    </div>
  );
};
export default ProfileDetail;

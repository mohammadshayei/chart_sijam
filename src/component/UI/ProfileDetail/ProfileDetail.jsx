import React, { useEffect, useRef, useState } from "react";
import classes from "./ProfileDetail.module.scss";
import { useTheme } from "../../../styles/ThemeProvider";
import DropDown from "../../UI/DropDown/DropDown";
import { useDispatch, useSelector } from "react-redux";
import { stringFa } from "./../../../assets/strings/stringFaCollection";
import * as actions from "../../../store/actions/index";
import { baseUrl } from "../../../constants/Config";
import SkeletonProfile from "../../Skeletons/SkeletonProfile";
import { IoIosArrowDropdown } from "react-icons/io";
import { IoSettingsOutline, IoSunnyOutline, IoMoon } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { Redirect } from "react-router";

const ProfileDetail = (props) => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;
  const [isHover, setIsHover] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const baseMenuOrder = [
    { name: stringFa.my_profile, id: "my_profile", icon: <FaRegUser /> },
    {
      name: "-",
      id: "change_theme",
    },
    { name: stringFa.log_out, id: "log_out", icon: <FiLogOut /> },
  ];
  const [menuOrders, setMenuOrders] = useState(baseMenuOrder);
  const [imageSrc, setImageSrc] = useState(`${baseUrl}images/avatar.png`);
  const divRef = useRef();
  const dispatch = useDispatch();
  const userDetail = useSelector((state) => state.auth.user);

  const openSetting = () => {
    setRedirect(<Redirect to="/view/setting" />);
    // search: "?menu_item=1",
  };

  const openProfile = () => {
    setRedirect(<Redirect to="/view/user" />);
  };

  const logout = () => {
    dispatch(actions.logout());
  };

  const onMouseEnter = () => {
    setIsHover(true);
  };
  const onMouseLeave = () => {
    setIsHover(false);
  };

  useEffect(() => {
    let updatedMenuOrders = [...menuOrders];
    updatedMenuOrders[1].name = themeState.isDark
      ? stringFa.light_theme
      : stringFa.dark_theme;
    updatedMenuOrders[1].icon = themeState.isDark ? (
      <IoSunnyOutline />
    ) : (
      <IoMoon />
    );
    setMenuOrders(updatedMenuOrders);
  }, [themeState]);

  useEffect(() => {
    if (userDetail && userDetail.image) {
      setImageSrc(`${baseUrl}images/${userDetail.image}.png`);
    }
    if (userDetail) {
      if (userDetail.is_fekrafzar) {
        let updated = false;
        let updatedMenuOrders = [...menuOrders];
        updatedMenuOrders.forEach((element) => {
          if (element.id === "setting") {
            updated = true;
          }
        });
        if (!updated) {
          updatedMenuOrders.splice(updatedMenuOrders.length - 1, 0, {
            name: stringFa.setting,
            id: "setting",
            icon: <IoSettingsOutline />,
          });
        }
        setMenuOrders(updatedMenuOrders);
      } else {
        setMenuOrders(baseMenuOrder);
      }
    }
  }, [userDetail]);

  const handleUserMenu = (id) => {
    switch (id) {
      case "my_profile":
        openProfile();
        break;
      case "change_theme":
        themeState.toggle();
        break;
      case "setting":
        openSetting();
        break;
      case "log_out":
        logout();
        break;

      default:
        break;
    }
  };
  return (
    <div className={classes.ProfileDetailContainer}>
      {redirect}
      {userDetail ? (
        <React.Fragment>
          <div className={classes.imageContainer}>
            <img src={imageSrc} alt="profile" />
          </div>
          <span style={{ color: "white" }}>{userDetail.name_family}</span>
        </React.Fragment>
      ) : (
        <SkeletonProfile />
      )}
      <div
        className={classes.DropDownContainer}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        ref={divRef}
        style={{
          backgroundColor: isHover ? "rgba(209, 204, 204,0.3)" : "",
        }}
        onClick={() => {
          setUserMenu(!userMenu);
        }}
      >
        <IoIosArrowDropdown
          style={{
            color: "white",
            width: "17px",
            height: "17px",
          }}
        />
      </div>
      {userMenu && (
        <DropDown
          divStyle={{
            top: "1.6rem",
            left: "calc(100% - 1.7rem)",
            width: "10rem",
          }}
          items={menuOrders}
          setDropDown={setUserMenu}
          onClick={handleUserMenu}
          divContainerRef={divRef}
        />
      )}
    </div>
  );
};
export default ProfileDetail;

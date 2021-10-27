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

const ProfileDetail = (props) => {
  const [isHover, setIsHover] = useState(false);
  const themeState = useTheme();

  const [userMenu, setUserMenu] = useState(false);
  const baseMenuOrder = [
    {
      name: themeState.isDark ? stringFa.light_theme : stringFa.dark_theme,
      id: "change_theme",
    },
    { name: stringFa.log_out, id: "log_out" },
  ];
  const [menuOrders, setMenuOrders] = useState(baseMenuOrder)
  const [imageSrc, setImageSrc] = useState(`${baseUrl}images/avatar.png`);
  const divRef = useRef();
  const dispatch = useDispatch();
  const userDetail = useSelector((state) => state.auth.user);

  const logout = () => {
    dispatch(actions.logout());
  };
  const theme = themeState.computedTheme;

  const onMouseEnter = () => {
    setIsHover(true);
  };
  const onMouseLeave = () => {
    setIsHover(false);
  };

  useEffect(() => {
    // { name: stringFa.setting, id: "setting", isLink: true },

    if (userDetail && userDetail.image) {
      setImageSrc(`${baseUrl}images/${userDetail.image}.png`);
    }
    if (userDetail) {
      if (userDetail.is_fekrafzar) {
        let updatedMenuOrders = [...menuOrders]
        updatedMenuOrders.splice(updatedMenuOrders.length - 1, 0,
          { name: stringFa.setting, id: "setting", isLink: true })
        setMenuOrders(updatedMenuOrders)
      }else{
        setMenuOrders(baseMenuOrder)
      }
    }
  }, [userDetail]);

  const handleUserMenu = (id) => {
    switch (id) {
      case "change_theme":
        themeState.toggle();
        break;
      case "setting":
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
            width: "10rem"
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

import React from "react";
import "./BodyUserProfile.scss";
import { useTheme } from "../../../styles/ThemeProvider";
import { baseUrl } from "../../../constants/Config";
import { TiUserAdd } from "react-icons/ti";

const BodyUserProfile = () => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  return (
    <div className="user-profile-container">
      <div
        className="top-section-container"
        style={{ backgroundColor: theme.primary }}
      >
        <div
          className="user-profile-top user-container"
          style={{ color: theme.on_primary }}
        >
          <div className="profile-picture-container">
            <img
              className="profile-picture"
              src={`${baseUrl}images/avatar.png`}
              alt="user_image"
            />
            <div className="hover-wrapper">
              <TiUserAdd className="change-picture-icon" />
              <div className="change-picture-text">تغییر عکس پروفایل</div>
            </div>
          </div>
          <div className="user-name">فکرافزار</div>
          <div className="navigation">navigation</div>
        </div>
      </div>
      <div className="body-section">details</div>
    </div>
  );
};

export default BodyUserProfile;

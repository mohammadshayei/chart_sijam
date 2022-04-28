import { useEffect, useState } from "react";
import "./BodyUserProfile.scss";
import { useTheme } from "../../../styles/ThemeProvider";
import { baseUrl } from "../../../constants/Config";
import { TiUserAdd } from "react-icons/ti";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { stringFa } from "../../../assets/strings/stringFaCollection";
import { Link } from "react-router-dom";

const BodyUserProfile = () => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;
  const [imageSrc, setImageSrc] = useState(`${baseUrl}images/avatar.svg`);
  const [body, setBody] = useState(null)
  const [headerOrder, setHeaderOrder] = useState(
    {
      personal: {
        id: 1,
        title: stringFa.personal_information,
        selected: true
      },
      pass: {
        id: 2,
        title: stringFa.password,
        selected: false
      },
      other: {
        id: 3,
        title: stringFa.other,
        selected: false
      }
    })

  const userDetail = useSelector((state) => state.auth.user);
  const location = useLocation()

  const onItemClickHandler = (e, key) => {
    const updatedHeaderOrder = { ...headerOrder }
    const updatedItem = updatedHeaderOrder[key];
    for (const item in updatedHeaderOrder) {
      updatedHeaderOrder[item].selected = false;
    }
    updatedItem.selected = true;
    updatedHeaderOrder[key] = updatedItem;
    setHeaderOrder(updatedHeaderOrder)
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const section = searchParams.get("s");
    switch (section) {
      case '1':
        setBody(<div>1</div>)
        break;
      case '2':
        setBody(<div>2</div>)
        break;
      case '3':
        setBody(<div>3</div>)
        break;

      default:
      case '1':
        setBody(<div>1</div>)
        break;
    }
  }, [location])

  useEffect(() => {
    if (userDetail && userDetail.image) {
      setImageSrc(`${baseUrl}images/${userDetail.image}.png`);
    }
  }, [userDetail]);

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
              src={imageSrc}
              alt="user_image"
            />
            <div className="hover-wrapper">
              <TiUserAdd className="change-picture-icon" />
              <div className="change-picture-text">تغییر عکس پروفایل</div>
            </div>
          </div>
          <div className="user-name">{userDetail.username}</div>
          <div className="header-section">
            {
              Object.entries(headerOrder).map(([k, v], index) => {
                return (
                  <Link
                    className={`user-profile-header-item ${v.selected ? "selected-header-item" : ""}`}
                    key={k}
                    onClick={(e) => onItemClickHandler(e, k)}
                    to={{
                      pathname: `/view/user`,
                      search: `?menu_item&s=${index + 1}`,
                    }}
                    style={{
                      textDecoration: "none",
                      cursor: v.selected ? "default" : "pointer",
                      color: theme.on_primary,
                    }}
                  >
                    {v.title}
                  </Link>
                )
              })
            }
          </div>
        </div>
      </div>
      <div className="body-section">{body}</div>
    </div>
  );
};

export default BodyUserProfile;

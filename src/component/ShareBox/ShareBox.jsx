import React, { useEffect, useRef, useState } from "react";
import "./ShareBox.scss";
import { stringFa } from "../../assets/strings/stringFaCollection";
import { useTheme } from "../../styles/ThemeProvider";
import StyledButton from "../UI/Button/StyledButton";
import { VscClose } from "react-icons/vsc";
import { baseUrl } from "../../constants/Config";
import Dropdown from "../UI/DropDown/DropDown";

const ShareBox = (props) => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;
  const [focus, setFocus] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [users, setUsers] = useState([]);
  const [getUsers, setGetUsers] = useState([
    { id: 0, avatar: `${baseUrl}images/avatar.png`, name: "فکرافزار" },
    { id: 1, avatar: `${baseUrl}images/avatar.png`, name: "حسنعلی" },
    { id: 2, avatar: `${baseUrl}images/avatar.png`, name: "1حسنعلی" },
    { id: 3, avatar: `${baseUrl}images/avatar.png`, name: "2حسنعلی" },
    { id: 4, avatar: `${baseUrl}images/avatar.png`, name: "3حسنعلی" },
    { id: 5, avatar: `${baseUrl}images/avatar.png`, name: "4حسنعلی" },
    { id: 6, avatar: `${baseUrl}images/avatar.png`, name: "5حسنعلی" },
    { id: 7, avatar: `${baseUrl}images/avatar.png`, name: "6حسنعلی" },
  ]);

  const ref = useRef();

  const addUser = (id) => {
    getUsers.forEach((user) => {
      if (user.id === id) {
        setUsers([...users, { id: id, avatar: user.avatar, name: user.name }]);
      }
    });
  };

  const onRemoveHandler = (id) => {
    let newArray = [...users];
    if (id !== -1) {
      newArray.splice(id, 1);
      setUsers(newArray);
    }
  };

  useEffect(() => {
    let newUsers = [...getUsers];
    users.forEach((user) => {
      newUsers = getUsers.filter((item) => item.id !== user.id);
    });
    setGetUsers(newUsers);
  }, [users]);

  return (
    <div className="container">
      <StyledButton
        ButtonStyle={{
          fontSize: "1.3rem",
          padding: "4px",
          marginLeft: "-1rem",
        }}
        onClick={() => props.setShowModal(false)}
      >
        <VscClose />
      </StyledButton>
      <div className="text">{stringFa.sharebox_title}</div>
      <input
        type="text"
        className="input-class"
        style={{
          background: themeState.isDark ? theme.surface_1dp : theme.surface,
          color: theme.on_background,
          borderColor: focus ? theme.primary : theme.border_color,
        }}
        dir="rtl"
        placeholder={stringFa.choose_user}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.target.value = "";
          }
        }}
        // onChange={(e) => onChangeHandler(e)}
        onFocus={() => {
          setDropDown(true);
          setFocus(true);
        }}
        onBlur={() => setFocus(false)}
      ></input>
      {dropDown && (
        <Dropdown
          divStyle={{
            top: "6rem",
            right: "2rem",
            left: "2rem",
          }}
          items={getUsers}
          onClick={addUser}
          setDropDown={setDropDown}
          divContainerRef={ref}
        />
      )}
      <div className="users-list-wrapper">
        {users.map((user) => (
          <div
            key={user.id}
            className="user"
            style={{ borderColor: theme.border_color }}
          >
            <div className="user-details">
              <img src={user.avatar} alt="user_image" className="avatar" />
              <div className="user-name">{user.name}</div>
            </div>
            <StyledButton
              ButtonStyle={{
                fontSize: "1rem",
                color: "rgb(140, 140, 140)",
              }}
              onClick={() => onRemoveHandler(user.id)}
            >
              <VscClose />
            </StyledButton>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShareBox;

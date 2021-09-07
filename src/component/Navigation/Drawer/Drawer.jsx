import React, { useState } from "react";
import "./Drawer.scss";
import Header from "./Header/Header";
import MenuItems from "./MenuItems/MenuItems";
import { useTheme } from "../../../styles/ThemeProvider";
import Button from "../../UI/Button/Button";
import { useSelector } from "react-redux";
import { stringFa } from "../../../assets/strings/stringFaCollection";
import StyledButton from "../../UI/Button/StyledButton";
import { FaPlusCircle } from "react-icons/fa";

const Drawer = React.memo((props) => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;
  const editMode = useSelector((state) => state.chart.editMode);
  const detail = useSelector((state) => state.detail);
  const [value, setValue] = useState("");
  const [focus, setFocus] = useState(false);
  const onChange = (e) => {
    setValue(e.targer.value);
  };
  const onFocusHandler = () => {
    setFocus(true);
  };
  const onBlurHandler = () => {
    setFocus(false);
  };
  const onKeyDown = (e) => {};
  const onAddHandler=()=>{
    // const distPath=
  }
  return (
    <div
      className={`DrawerContainer ${
        props.isMenuOpen ? "ShowDrawer" : "HideDrawer"
      }`}
      style={{
        backgroundColor: themeState.isDark ? theme.surface_12dp : theme.surface,
      }}
    >
      <Header onToggleMenu={props.onToggleMenu} />
      <MenuItems />
      {editMode && (
        <div className="add-box-container">
          <input
            type="text"
            className="input-creator"
            style={{
              background: themeState.isDark ? theme.surface_1dp : theme.surface,
              color: theme.on_background,
              borderColor: focus ? theme.primary : theme.border_color,
            }}
            dir="rtl"
            placeholder={`نام ${
              detail.company
                ? stringFa.softwares
                : detail.holding
                ? stringFa.companies
                : stringFa.holdings
            } جدید`}
            onKeyDown={onKeyDown}
            onChange={onChange}
            onFocus={onFocusHandler}
            onBlur={onBlurHandler}
          />
          <StyledButton
            // onClick={creatChartClickHandler}
            ButtonStyle={{ width: "80%", margin: "1rem 10%" }}
            hover={
              themeState.isDark ? theme.surface_12dp : theme.background_color
            }
          >
            <div className="button-text">
              {detail.company
                ? stringFa.add_software
                : detail.holding
                ? stringFa.add_company
                : stringFa.add_holding}
              <div className="button-icon" style={{ color: theme.primary }}>
                <FaPlusCircle />
              </div>
            </div>
          </StyledButton>
        </div>
      )}
    </div>
  );
});

export default Drawer;

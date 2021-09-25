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
import axios from "axios";
import { baseUrl } from "../../../constants/Config";
import ErrorDialog from "../../UI/Error/ErrorDialog";

const Drawer = React.memo((props) => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;
  const editMode = useSelector((state) => state.chart.editMode);
  const detail = useSelector((state) => state.detail);
  const [value, setValue] = useState("");
  const [focus, setFocus] = useState(false);
  const [error, setError] = useState(null);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const onFocusHandler = () => {
    setFocus(true);
  };
  const onBlurHandler = () => {
    setFocus(false);
  };
  const randomInteger = (min, max) => {
    return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
  };
  const onKeyDown = (e) => {};
  const onAddHandler = async () => {
    const state = detail.company
      ? "software"
      : detail.holding
      ? "company"
      : "holding";
    if (value.length < 2) {
      const persianState =
        state === "holding"
          ? "هولدینگ"
          : state === "company"
          ? "سازمان"
          : "نرم افزار";
      setError(
        <ErrorDialog onClose={setError}>{`نام ${persianState} جدید را بنوسید`}</ErrorDialog>
      );
      return;
    }
    const distUrl = `create_${state}`;
    let code = randomInteger(1000, 9999);
    let payload = {
      name: value,
      code,
    };
    if (state !== "software") {
      while (true) {
        const resultSearch = await axios.post(
          `${baseUrl}api/check_exist_${state}_code`,
          { code }
        );
        if (state === "company")
          payload = { ...payload, holding_code: detail.holding.code };
        if (!resultSearch.data.exist) break;
        code = randomInteger(1000, 9999);
      }
    } else {
      payload = { ...payload, company_code: detail.company.code };
    }
    const result = await axios.post(`${baseUrl}api/${distUrl}`, payload);
    console.log(result)
  };
  return (
    <div
      className={`DrawerContainer ${
        props.isMenuOpen ? "ShowDrawer" : "HideDrawer"
      }`}
      style={{
        backgroundColor: themeState.isDark ? theme.surface_12dp : theme.surface,
      }}
    >
      {error}
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
            onClick={onAddHandler}
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

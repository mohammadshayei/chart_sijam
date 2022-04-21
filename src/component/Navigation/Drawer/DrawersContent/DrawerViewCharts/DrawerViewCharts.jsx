import React, { useState } from "react";
import { stringFa } from "../../../../../assets/strings/stringFaCollection";
import StyledButton from "../../../../UI/Button/StyledButton";
import MenuItems from "./MenuItems/MenuItems";
import { FaPlusCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { baseUrl } from "../../../../../constants/Config";
import ErrorDialog from "../../../../UI/Error/ErrorDialog";
import { useTheme } from "../../../../../styles/ThemeProvider";
import './DrawerViewCharts.scss'
import CheckBox from "../../../../UI/CheckBox/CheckBox";
import * as detailActions from "../../../../../store/actions/detail";

const DrawerViewCharts = (props) => {
  const editMode = useSelector((state) => state.chart.editMode);
  const token = useSelector((state) => state.auth.token);
  const { selectedHolding } = useSelector(state => state.holdingDetail)

  const [focus, setFocus] = useState(false);
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState(false);

  const detail = useSelector((state) => state.detail);

  const themeState = useTheme();
  const theme = themeState.computedTheme;
  const dispatch = useDispatch();

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
  const onKeyDown = (e) => { };
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
        <ErrorDialog
          onClose={setError}
        >{`نام ${persianState} جدید را بنوسید`}</ErrorDialog>
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
          { code }, { headers: { 'auth-token': token } }
        );
        if (state === "company")
          payload = { ...payload, holding_code: detail.holding.code };
        if (!resultSearch.data.exist) break;
        code = randomInteger(1000, 9999);
      }
    } else {
      payload = { ...payload, company_code: detail.company.code };
    }
    const result = await axios.post(`${baseUrl}api/${distUrl}`, payload, { headers: { 'auth-token': token } });
    console.log(result);
  };
  const clearSelected = () => {
    dispatch(detailActions.clearSelected());
  };

  return (
    <div >
      {props.isMenuOpen &&
        <>
          <MenuItems checked={checked} />
          <div className="optional-show">
            <p style={{
              color: theme.on_background,
              fontSize: '.8rem'
            }}>
              {stringFa.show_bank_has_charts}
            </p>
            <CheckBox style={{ padding: 0 }} checked={checked} onChange={() => {
              clearSelected()
              setChecked(!checked)
            }} />
          </div>
        </>
      }
      {/* {selectedHolding && editMode && selectedHolding.structure && (
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
            placeholder={`نام ${detail.company
              ? stringFa.softwares
              : detail.holding
                ? stringFa.companies
                : stringFa.companies
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
                  : stringFa.add_company}
              <div className="button-icon" style={{ color: theme.primary }}>
                <FaPlusCircle />
              </div>
            </div>
          </StyledButton>
        </div>
      )} */}
    </div>
  );
};
export default React.memo(DrawerViewCharts);

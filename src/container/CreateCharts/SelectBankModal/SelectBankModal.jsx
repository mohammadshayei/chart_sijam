import React, { useState, useEffect, useRef } from "react";
import { stringFa } from "../../../assets/strings/stringFaCollection.js";
import { useTheme } from "../../../styles/ThemeProvider.js";
import "./SelectBankModal.scss";
import Button from "./../../../component/UI/Button/Button";
import axios from "axios";
import { baseUrl } from "./../../../constants/Config";
import { IoIosSearch, IoMdCloseCircle } from "react-icons/io";
import { GoVerified } from "react-icons/go";
import ErrorDialog from "../../../component/UI/Error/ErrorDialog.jsx";
import * as selectDatabaseActions from "../../../store/actions/addChart";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

const SelectBankModal = (props) => {
  const token = useSelector(state => state.auth.token)
  const themeState = useTheme();
  const theme = themeState.computedTheme;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [focus, setFocus] = useState(false);
  const [data, setData] = useState({ error: "", result: null });
  const [bankAddress, setBankAddress] = useState({
    holdings: {
      id: 0,
      name: `${stringFa.holdings}`,
      active: true,
      verified: false,
    },
    companies: {
      id: 0,
      name: `${stringFa.companies}`,
      active: false,
      verified: false,
    },
    softwares: {
      id: 0,
      name: `${stringFa.softwares}`,
      active: false,
      verified: false,
    },
    active_backup: {
      id: 0,
      name: `${stringFa.active_backup}`,
      active: false,
      verified: false,
    },
    banks: { id: 0, name: `${stringFa.banks}`, active: false, verified: false },
  });
  const [placeHolder, setPlaceHolder] = useState(null);
  const [isDone, setIsDone] = useState(false);
  const [searchResult, setSearchResult] = useState({ error: "", result: null });
  const ref = useRef();

  useOnClickOutside(ref, () => {
    props.isModalOpen(false);
  });

  const onFocusHandler = () => {
    setFocus(true);
  };
  const onBlurHandler = () => {
    setFocus(false);
  };

  const keyDownHandler = (e) => {
    if (e.key === "Escape") {
      props.isModalOpen(false);
    }
  };

  const dispatch = useDispatch();
  const selectChartDatabase = (data) => {
    dispatch(selectDatabaseActions.selectChartData(data));
  };

  const setId = (id) => {
    dispatch(selectDatabaseActions.setAddChartId(id));
  };

  const onChangeHandler = (event) => {
    let updatedResult = { ...searchResult };
    updatedResult.error = data.error;
    updatedResult.result = data.result.filter((item) => {
      return item.name.indexOf(event.target.value) >= 0;
    });
    setSearchResult(updatedResult);
  };

  useEffect(async () => {
    for (const item in bankAddress) {
      if (bankAddress[item].active)
        setPlaceHolder(`جستجوی ${bankAddress[item].name}`);
    }
    if (bankAddress.holdings.active) {
      try {
        const result = await axios.get(baseUrl + "api/get_holdings", { headers: { 'auth-token': token } });
        if (result.data.message.result.length === 0)
          result.data.message.error = `.${stringFa.holdings} وجود ندارد`;
        setData({
          error: result.data.message.error,
          result: result.data.message.result,
        });
        setSearchResult({
          error: result.data.message.error,
          result: result.data.message.result,
        });
        setLoading(false);
      } catch (error) {
        setError(
          <ErrorDialog onClose={setError}>{stringFa.error_message}</ErrorDialog>
        );
      }
    }
  }, [bankAddress]);

  const updateAddress = async (name, addressPartId) => {
    let updatedAddress = { ...bankAddress };
    let key = null;
    let nextKey;
    for (const item in updatedAddress) {
      if (key !== null) {
        nextKey = item;
        break;
      }
      if (updatedAddress[item].active) key = item;
    }
    for (const item in updatedAddress) {
      updatedAddress[item].active = false;
    }
    if (updatedAddress[key].name !== name) {
      updatedAddress[key].name = name;
      updatedAddress[key].id = addressPartId;
      key !== "banks"
        ? (updatedAddress[nextKey].active = true)
        : setIsDone(true);
      setBankAddress(updatedAddress);
    }
    updatedAddress[key].verified = true;
    if (key !== "banks") {
      let payload;
      if (nextKey === "active_backup" || nextKey === "banks")
        payload = { id: addressPartId };
      else payload = { code: addressPartId };
      setLoading(true);
      try {
        const result = await axios.post(
          `${baseUrl}api/get_${nextKey}`,
          payload, { headers: { 'auth-token': token } }
        );
        if (result.data.message.result.length === 0)
          result.data.message.error = `.${stringFa[nextKey]} وجود ندارد`;
        setData({
          error: result.data.message.error,
          result: result.data.message.result,
        });
        setSearchResult({
          error: result.data.message.error,
          result: result.data.message.result,
        });
        setLoading(false);
      } catch (error) {
        setError(
          <ErrorDialog onClose={setError}>{stringFa.error_message}</ErrorDialog>
        );
      }
    }
  };

  const clearAddress = async (key) => {
    let updatedClearAddress = { ...bankAddress };
    let start = false;
    let id;
    for (const itemKey in updatedClearAddress) {
      if (itemKey === key) start = true;
      if (!start) id = bankAddress[itemKey].id;
      if (start) {
        updatedClearAddress[itemKey].id = 0;
        updatedClearAddress[itemKey].name = `${stringFa[itemKey]}`;
        if (itemKey === key) updatedClearAddress[itemKey].active = true;
        else updatedClearAddress[itemKey].active = false;
        updatedClearAddress[itemKey].verified = false;
      }
    }

    setBankAddress(updatedClearAddress);
    setIsDone(false);
    if (key === "holdings") return;
    if (key !== "banks") {
      let payload;
      if (key === "banks" || key === "active_backup") payload = { id };
      else payload = { code: id };
      setLoading(true);
      try {
        const result = await axios.post(`${baseUrl}api/get_${key}`, payload, { headers: { 'auth-token': token } });
        if (result.data.message.result.length === 0)
          result.data.message.error = `.${stringFa[key]} وجود ندارد`;
        setData({
          error: result.data.message.error,
          result: result.data.message.result,
        });
        setSearchResult({
          error: result.data.message.error,
          result: result.data.message.result,
        });
        setLoading(false);
      } catch (error) {
        setError(
          <ErrorDialog onClose={setError}>{stringFa.error_message}</ErrorDialog>
        );
      }
    }
    
  };

  const submitHandler = async (id) => {
    const result = await axios.post(`${baseUrl}api/get_data`,
      { id }, { headers: { 'auth-token': token } });
    selectChartDatabase(result.data.result);
    setId(id);
    props.isModalOpen(false);
  };

  return (
    <div
      className="select-bank-modal-container"
      style={{
        backgroundColor: theme.background_color,
      }}
    >
      <div
        ref={ref}
        className="select-bank-modal-wrapper"
        style={{
          backgroundColor: themeState.isDark
            ? theme.surface_24dp
            : theme.surface,
          color: theme.on_surface,
          borderColor: theme.border_color,
        }}
        tabIndex="0"
        onKeyDown={(e) => keyDownHandler(e)}
      >
        {error}
        <div className="select-bank-modal-top">
          <div className="select-bank-title">
            <div className="title">{stringFa.select_database}</div>
            <div className="title description">
              {stringFa.select_database_description}
            </div>
          </div>
          <div className="select-bank-input-wrapper">
            <div className="select-bank-address">
              {Object.entries(bankAddress).map(([k, v]) => {
                return (
                  <div className="address-part" key={k}>
                    {k !== "banks" ? "  /  " : ""}
                    <div
                      className="address-item"
                      style={{
                        color: v.active
                          ? theme.on_background
                          : v.verified
                            ? theme.primary
                            : theme.on_background,
                        opacity: v.active ? 1 : v.verified ? 1 : 0.5,
                        fontStyle: v.verified ? "italic" : "",
                      }}
                    >
                      {v.verified && (
                        <div
                          className="clear-address"
                          onClick={() => clearAddress(k)}
                        >
                          <IoMdCloseCircle />
                        </div>
                      )}
                      {v.name}
                    </div>
                  </div>
                );
              })}
              {isDone && (
                <div
                  className="success-checkbox-icon"
                  style={{ color: theme.primary }}
                >
                  <GoVerified />
                </div>
              )}
            </div>
            {!isDone && (
              <input
                type="text"
                className="input-class"
                style={{
                  background: themeState.isDark
                    ? theme.surface_1dp
                    : theme.surface,
                  color: theme.on_background,
                  borderColor: focus ? theme.primary : theme.border_color,
                }}
                dir="rtl"
                placeholder={placeHolder}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.target.value = "";
                    updateAddress(
                      bankAddress.banks.active
                        ? searchResult.result[0].bank.groups_title
                        : searchResult.result[0].name,
                      bankAddress.softwares.active ||
                        bankAddress.active_backup.active
                        ? searchResult.result[0].id
                        : bankAddress.banks.active
                          ? searchResult.result[0].bank._id
                          : searchResult.result[0].code
                    );
                  }
                }}
                onChange={(e) => onChangeHandler(e)}
                onFocus={onFocusHandler}
                onBlur={onBlurHandler}
              ></input>
            )}
            {!isDone && (
              <div className="search-icon">
                <IoIosSearch />
              </div>
            )}
          </div>
          {loading ? (
            <div className="loading">
              <img
                opacity="0.7"
                height="60"
                width="60"
                alt="loading"
                src={process.env.PUBLIC_URL + "/logo-loading.gif"}
              />
            </div>
          ) : isDone ? (
            <div className="success"></div>
          ) : (
            <div className="select-bank-picker">
              <div className="select-bank-data">
                {searchResult.result &&
                  (searchResult.error === ""
                    ? Object.entries(searchResult.result).map(([k, v]) => {
                      return (
                        <div
                          key={k}
                          className="selection-item"
                          onClick={() =>
                            updateAddress(
                              bankAddress.banks.active
                                ? v.bank.groups_title
                                : v.name,
                              bankAddress.softwares.active ||
                                bankAddress.active_backup.active
                                ? v.id
                                : bankAddress.banks.active
                                  ? v.bank._id
                                  : v.code
                            )
                          }
                        >
                          {bankAddress.banks.active
                            ? v.bank.groups_title
                            : v.name}
                        </div>
                      );
                    })
                    : searchResult.error)}
              </div>
            </div>
          )}
        </div>
        <div className="select-bank-modal-footer">
          <Link
            onClick={(e) => !isDone && e.preventDefault()}
            style={{ textDecoration: "none" }}
            to={{
              pathname: `/create_chart`,
            }}
          >
            <Button
              ButtonStyle={{
                backgroundColor: isDone ? theme.primary : "lightslategray",
                cursor: isDone ? "pointer" : "default",
                color: theme.on_primary,
              }}
              disabled={isDone ? false : true}
              onClick={() => submitHandler(bankAddress.banks.id)}
            >
              {stringFa.done}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SelectBankModal;

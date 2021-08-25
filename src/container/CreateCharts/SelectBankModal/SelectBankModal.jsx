import React, { useState, useEffect, useRef } from "react";
import { stringFa } from "../../../assets/strings/stringFaCollection.js";
import { useTheme } from "../../../styles/ThemeProvider.js";
import "./SelectBankModal.scss";
import Button from "./../../../component/UI/Button/Button";
import axios from "axios";
import { baseUrl } from "./../../../constants/Config";
import { IoIosSearch } from "react-icons/io";
import ErrorDialog from "../../../component/UI/Error/ErrorDialog.jsx";

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
  const themeState = useTheme();
  const theme = themeState.computedTheme;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [focus, setFocus] = useState(false);
  const [data, setData] = useState(null);
  const [bankAddress, setBankAddress] = useState({
    holdings: { name: `${stringFa.holding}`, active: true, verified: false },
    companies: { name: `${stringFa.company}`, active: false, verified: false },
    softwares: { name: `${stringFa.software}`, active: false, verified: false },
    active_backup: {
      name: `${stringFa.active_backup}`,
      active: false,
      verified: false,
    },
    banks: { name: `${stringFa.database}`, active: false, verified: false },
  });
  const [placeHolder, setPlaceHolder] = useState(null);
  const [isDone, setIsDone] = useState(false);
  const ref = useRef();

  useOnClickOutside(ref, () => {
    props.isModalOpen(false);
  });

  useEffect(async () => {
    try {
      const result = await axios.get(baseUrl + "/get_holdings");
      setData(result.data.message.result);
      setLoading(false);
    } catch (error) {
      setError(
        <ErrorDialog onClose={setError}>{stringFa.error_message}</ErrorDialog>
      );
    }
  }, []);

  useEffect(() => {
    for (const item in bankAddress) {
      if (bankAddress[item].active)
        setPlaceHolder(`جستجوی ${bankAddress[item].name}`);
    }
  }, [bankAddress]);

  const onFocusHandler = () => {
    setFocus(true);
  };
  const onBlurHandler = () => {
    setFocus(false);
  };

  const updateAddress = async (event, name, value) => {
    if (event.key === "Enter" || event.type === "click") {
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
      if (event.type === "keydown")
        if (updatedAddress[key].name !== event.target.value) {
          updatedAddress[key].name = event.target.value;
          key !== "database"
            ? (updatedAddress[nextKey].active = true)
            : setIsDone(true);
          setBankAddress(updatedAddress);
          event.target.value = "";
        }
      if (event.type === "click")
        if (updatedAddress[key].name !== name) {
          updatedAddress[key].name = name;
          key !== "database"
            ? (updatedAddress[nextKey].active = true)
            : setIsDone(true);
          setBankAddress(updatedAddress);
          // event.target.value = "";
        }
      updatedAddress[key].verified = true;
      let payload;
      if (nextKey === "active_backup" || nextKey === "banks")
        payload = { id: value };
      else payload = { code: value };
      setLoading(true);
      console.log(payload);
      try {
        const result = await axios.post(`${baseUrl}/get_${nextKey}`, payload);
        setData(result.data.message.result);
        setLoading(false);
      } catch (error) {
        setError(
          <ErrorDialog onClose={setError}>{stringFa.error_message}</ErrorDialog>
        );
      }
    }
  };

  return (
    <div
      ref={ref}
      className="select-bank-modal-container"
      style={{
        backgroundColor: themeState.isDark ? theme.surface_24dp : theme.surface,
        color: theme.on_surface,
        borderColor: theme.border_color,
      }}
    >
      {error}
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
                      ? "green"
                      : theme.on_background,
                    opacity: v.active ? 1 : v.verified ? 1 : 0.5,
                  }}
                >
                  {v.name}
                </div>
              </div>
            );
          })}
        </div>
        <input
          type="text"
          className="input-class"
          style={{
            background: themeState.isDark ? theme.surface_1dp : theme.surface,
            color: theme.on_background,
            borderColor: focus ? theme.primary : theme.border_color,
          }}
          dir="rtl"
          placeholder={placeHolder}
          onKeyDown={(e) => updateAddress(e)}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
        ></input>
        <div className="search-icon">
          <IoIosSearch />
        </div>
      </div>
      {loading ? (
        <div className="loading">
          <img
            opacity="0.7"
            height="60"
            width="60"
            src={process.env.PUBLIC_URL + "/logo-loading.gif"}
            alt="logo"
          />
        </div>
      ) : (
        <div className="select-bank-picker">
          {data &&
            Object.entries(data).map(([k, v]) => {
              return (
                <div
                  key={k}
                  className="selection-item"
                  onClick={(e) =>
                    updateAddress(
                      e,
                      v.name,
                      bankAddress.softwares.active ||
                        bankAddress.active_backup.active
                        ? v.id
                        : v.code
                    )
                  }
                >
                  {bankAddress.banks.active ? v.bank.groups_title : v.name}
                </div>
              );
            })}
        </div>
      )}
      <div className="modal-footer">
        <Button
          ButtonStyle={{
            backgroundColor: isDone ? theme.primary : "gray",
            color: theme.on_primary,
          }}
          disabled={isDone ? false : true}
        >
          {stringFa.done}
        </Button>
      </div>
    </div>
  );
};

export default SelectBankModal;

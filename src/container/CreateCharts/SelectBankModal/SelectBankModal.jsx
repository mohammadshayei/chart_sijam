import React, { useState, useEffect, useRef } from "react";
import { stringFa } from "../../../assets/strings/stringFaCollection.js";
import { useTheme } from "../../../styles/ThemeProvider.js";
import "./SelectBankModal.scss";
import Button from "./../../../component/UI/Button/Button";
import axios from "axios";
import { baseUrl } from "./../../../constants/Config";

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
  const [data, setData] = useState(null);
  const [bankAddress, setBankAddress] = useState({
    holding: { name: `${stringFa.holding}`, active: true, verified: false },
    company: { name: `${stringFa.company}`, active: false, verified: false },
    software: { name: `${stringFa.software}`, active: false, verified: false },
    database: { name: `${stringFa.database}`, active: false, verified: false },
  });
  const [placeHolder, setPlaceHolder] = useState(null);
  const [isDone, setIsDone] = useState(false);
  const themeState = useTheme();
  const theme = themeState.computedTheme;
  const ref = useRef();

  useOnClickOutside(ref, () => {
    props.isModalOpen(false);
  });

  useEffect(async () => {
    const result = await axios.get(baseUrl + "/get_holdings");
    setData(result);
  }, [bankAddress]);

  useEffect(() => {
    for (const item in bankAddress) {
      if (bankAddress[item].active)
        setPlaceHolder(`جستجوی ${bankAddress[item].name}`);
    }
  }, [bankAddress]);

  const updateAddress =async (event, name, code) => {
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
      const payload={code}
      const result = await axios.post(baseUrl + "/get_companies",payload);
      setData(result);
    }
  };

  return (
    <div
      ref={ref}
      className="select-bank-modal-container"
      style={{
        backgroundColor: themeState.isDark ? theme.surface_1dp : theme.surface,
        color: theme.on_surface,
        borderColor: theme.border_color,
      }}
    >
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
                {k !== "database" ? "  /  " : ""}
                <div
                  className="address-item"
                  style={{
                    color: v.active
                      ? theme.primary
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
          className="input"
          dir="rtl"
          placeholder={placeHolder}
          onKeyDown={(e) => updateAddress(e)}
        ></input>
      </div>
      <div className="select-bank-picker">
        {data &&
          Object.entries(data.data.message.result).map(([k, v]) => {
            return (
              <div
                key={k}
                className="selection-item"
                onClick={(e) => updateAddress(e, v.name, v.code)}
              >
                {v.name}
              </div>
            );
          })}
      </div>
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

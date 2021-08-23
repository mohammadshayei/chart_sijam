import React, { useState, useEffect, useRef } from "react";
import { stringFa } from "../../../assets/strings/stringFaCollection.js";
import { useTheme } from "../../../styles/ThemeProvider.js";
import "./SelectBankModal.scss";
import Button from "./../../../component/UI/Button/Button";

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
  const [bankAddress, setBankAddress] = useState({
    holding: { name: `${stringFa.holding}`, active: true },
    company: { name: `${stringFa.company}`, active: false },
    software: { name: `${stringFa.software}`, active: false },
    database: { name: `${stringFa.database}`, active: false },
  });
  const [placeHolder, setPlaceHolder] = useState(null);

  const themeState = useTheme();
  const theme = themeState.computedTheme;
  const ref = useRef();

  useOnClickOutside(ref, () => {
    props.isModalOpen(false);
  });

  useEffect(() => {
    for (const item in bankAddress) {
      if (bankAddress[item].active)
        setPlaceHolder(`جستجوی ${bankAddress[item].name}`);
    }
  }, [bankAddress]);

  const clickHandler = (event, key) => {
    let updatedAddress = { ...bankAddress };
    let activated = bankAddress[key];
    for (const item in updatedAddress) {
      if (item !== key) updatedAddress[item].active = false;
    }
    activated.active = true;
    setBankAddress(updatedAddress);
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
              <div className="address-part">
                {k !== "database" ? "  /  " : ""}
                <div
                  className="address-item"
                  style={{
                    color: v.active ? theme.primary : theme.on_background,
                    opacity: v.active ? 1 : 0.5,
                  }}
                  onClick={(e) => clickHandler(e, k)}
                >
                  {v.name}
                </div>
              </div>
            );
          })}
        </div>
        <input className="input" dir="rtl" placeholder={placeHolder}></input>
      </div>
      <div className="select-bank-picker"></div>
      <div className="modal-footer">
        <Button
          ButtonStyle={{
            backgroundColor: theme.primary,
            color: theme.on_primary,
          }}
        >
          {stringFa.done}
        </Button>
      </div>
    </div>
  );
};

export default SelectBankModal;

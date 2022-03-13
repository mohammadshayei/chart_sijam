import React, { useState, useEffect } from "react";
import "./Bank.scss";
import { } from "react-redux";
import { ripple } from "../../../../../assets/config/ripple";
import { useTheme } from "../../../../../styles/ThemeProvider";

function Bank({ name, selected, parents, _id, onClick }) {
  const [style, setStyle] = useState(null);
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  // const selectBank = (bank) => {
  //   dispatch(detailActions.selectBank(bank));
  // };
  useEffect(() => {
    // console.log(1, selected)
    if (selected)
      setStyle({
        background: `linear-gradient(150deg,${theme.primary},${theme.secondary})`,
        color: theme.on_primary,
      });
    else {
      setStyle({
        background: "",
        color: theme.on_background,
      });
    }
  }, [_id, selected, themeState.isDark]);
  const onMouseEnter = () => {
    if (!selected) {
      setStyle({
        background: themeState.isDark
          ? theme.surface_1dp
          : theme.background_color,
        color: theme.on_background,
      });
    }
  };
  const onMouseLeave = () => {
    if (!selected) {
      setStyle({
        background: "",
        color: theme.on_background,
      });
    }
  };
  const onBankClickHandler = (e) => {
    ripple(e);
    onClick(_id, parents, selected)
  };
  return (
    <div
      className="BankContainer"
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      style={{ ...style }}
      onClick={onBankClickHandler}
    >
      <span style={{ fontSize: 12 }}>{name}</span>
    </div>
  );
};

export default Bank;

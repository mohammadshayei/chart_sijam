import React, { useState, useEffect } from "react";
import "./Bank.scss";
import { ripple } from "../../../../../assets/config/ripple";
import { useTheme } from "../../../../../styles/ThemeProvider";
import loading_icon from "../../../../../assets/images/btn_loading.gif"

function Bank({ name, selected, _id, onClick, parents = [], loading = '', mode = 'bank' }) {
  const [style, setStyle] = useState(null);
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  // const selectBank = (bank) => {
  //   dispatch(detailActions.selectBank(bank));
  // };
  useEffect(() => {
    // console.log(1, selected)
    if (selected || loading === _id)
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
  }, [_id, selected, themeState.isDark, loading]);
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
    if (mode === 'bank') {
      // ripple(e);
      onClick(_id, parents, selected)
    } else {
      onClick()
    }
  };
  return (
    <div
      className="bank-item-container"
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      style={{ ...style }}
      onClick={onBankClickHandler}
    >
      {
        loading === _id ?
          <div className="loading-spinner" style={{ minWidth: '5rem' }}>
            <img src={loading_icon} alt="" />
          </div> :
          <span style={{ fontSize: 12 }}>{name}</span>
      }
    </div>
  );
};

export default Bank;

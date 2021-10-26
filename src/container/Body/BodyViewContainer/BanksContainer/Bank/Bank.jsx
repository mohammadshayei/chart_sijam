import React, { useState, useEffect } from "react";
import "./Bank.scss";
import { useDispatch, useSelector } from "react-redux";
import * as detailActions from "../../../../../store/actions/detail";
import { ripple } from "../../../../../assets/config/ripple";
import { useTheme } from "../../../../../styles/ThemeProvider";

const Bank = React.memo(function Bank(props) {
  const [style, setStyle] = useState(null);
  const dispatch = useDispatch();
  const [clicked, setClicked] = useState(false);
  const detail = useSelector((state) => state.detail);
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  const selectBank = (bank) => {
    dispatch(detailActions.selectBank(bank));
  };
  useEffect(() => {
    if (detail.banks && detail.banks.find((bk) => bk._id === props.data._id)) {
      setClicked(true);
      setStyle({
        background: `linear-gradient(150deg,${theme.primary},${theme.secondary})`,
        color: theme.on_primary,
      });
    } else {
      setClicked(false);
      setStyle({
        background: "",
        color: theme.on_background,
      });
    }
  }, [detail.banks, props.data, themeState.isDark]);
  const onMouseEnter = () => {
    if (!clicked) {
      setStyle({
        background: themeState.isDark
          ? theme.surface_1dp
          : theme.background_color,
        color: theme.on_background,
      });
    }
  };
  const onMouseLeave = () => {
    if (!clicked) {
      setStyle({
        background: "",
        color: theme.on_background,
      });
    }
  };
  const onBankClickHandler = (e) => {
    ripple(e);
    selectBank(props.data);
  };
  return (
    <div
      className="BankContainer"
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      style={{ ...style }}
      onClick={onBankClickHandler}
    >
      <span style={{ fontSize: 12 }}>{props.data.groups_title}</span>
    </div>
  );
});

export default Bank;

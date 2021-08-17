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
    if (detail.banks && detail.banks.find((bk) => bk.id === props.data.id)) {
      setClicked(true);
      setStyle({
        background: `linear-gradient(150deg,${theme.clicked_darken_color},${theme.clicked_lighten_color})`,
        color: theme.text_clicked_menu_color,
      });
    } else {
      setClicked(false);
      setStyle({
        background: "",
        color: theme.text_color,
      });
    }
  }, [detail.banks, props.data]);
  const onMouseEnter = () => {
    if (!clicked) {
      setStyle({
        background: theme.holding_menu_item_color,
        color: theme.text_color,
      });
    }
  };
  const onMouseLeave = () => {
    if (!clicked) {
      setStyle({
        background: "",
        color: theme.text_color,
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
      <span style={{ fontSize: 12 }}>{props.data.name}</span>
    </div>
  );
});

export default Bank;

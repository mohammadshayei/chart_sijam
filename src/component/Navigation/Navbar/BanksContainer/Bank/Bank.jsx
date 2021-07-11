import React, { useState, useEffect } from "react";
import { lightTheme } from "../../../../../styles/theme";
import "./Bank.scss";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../../store/actions/detail";
import { ripple } from "../../../../../assets/config/ripple";
const Bank = React.memo(function Bank(props) {
  const [style, setStyle] = useState(null);

  const [clicked, setClicked] = useState(false);

  const detail = useSelector((state) => state.detail);
  const dispatch = useDispatch();
  const selectBank = (bank) => {
    dispatch(actions.selectBank(bank));
  };
  useEffect(() => {
      if (detail.banks) {
      if (detail.banks.find(bk=>bk.id===props.data.id)) {
        setClicked(true);
        setStyle({
          background: `linear-gradient(150deg,${lightTheme.clicked_darken_color},${lightTheme.clicked_lighten_color})`,
          color: lightTheme.text_clicked_menu_color,
        });
      } else {
        setClicked(false);
        setStyle({
          background: "",
          color: lightTheme.text_color,
        });
      }
    }
  }, [detail.banks, props.data]);

  const onMouseEnter = () => {
    if (!clicked) {
      setStyle({
        background: lightTheme.holding_menu_item_color,
        color: lightTheme.text_color,
      });
    }
  };
  const onMouseLeave = () => {
    if (!clicked) {
      setStyle({
        background: "",
        color: lightTheme.text_color,
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

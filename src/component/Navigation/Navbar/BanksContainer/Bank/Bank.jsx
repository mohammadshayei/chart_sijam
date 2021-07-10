import React, { useState, useEffect } from "react";
import { lightTheme } from "../../../../../styles/theme";
import "./Bank.scss";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../../store/actions/bank";
import { ripple } from "../../../../../assets/config/ripple";
const Bank = React.memo(function Bank(props) {
  const [style, setStyle] = useState(null);
  const [isHover, setIsHover] = useState(false);

  const [clicked, setClicked] = useState(false);

  const bank = useSelector((state) => state.bank);
  const dispatch = useDispatch();
  const selectBank = (bank) => {
    dispatch(actions.selectBank(bank));
  };
  useEffect(() => {
    if (bank.bank) {
      if (bank.bank.id === props.data.id) {
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
  }, [bank.bank, props.data]);

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
    // if (props.data)
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

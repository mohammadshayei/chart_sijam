import React, { useState, useEffect } from "react";
import { lightTheme } from "../../../../../styles/theme";
import "./Bank.scss";
import { useDispatch, useSelector } from "react-redux";
import * as banksActions from "../../../../../store/actions/banksData";
import * as detailActions from "../../../../../store/actions/detail";
import { ripple } from "../../../../../assets/config/ripple";
const Bank = React.memo(function Bank(props) {
  const [style, setStyle] = useState(null);
  const dispatch = useDispatch();
  const [clicked, setClicked] = useState(false);
  const detail = useSelector((state) => state.detail);
  const banksData = useSelector((state) => state.banks);
  const setChartsData = (banks) => {
    dispatch(banksActions.setBankData(banks));
  };
  const selectBank = (bank) => {
    dispatch(detailActions.selectBank(bank));
  };
  useEffect(() => {
    if (detail.banks && detail.banks.find((bk) => bk.id === props.data.id)) {
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
  }, [detail.banks, props.data]);
  useEffect(() => {
    // if (banksData.banks) {
    //   let bks = banksData.banks.filter((item) => {
    //     // console.log(item)
    //     return detail.banks.find(
    //       (detailsBank) => detailsBank.id === item.bankId
    //     );
    //   });
    //   setChartsData(bks)
    // }
  }, [detail.banks]);
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

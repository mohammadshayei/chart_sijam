import React, { useState, useEffect } from "react";
import "./BanksContainer.scss";
import { useDispatch, useSelector } from "react-redux";
import Bank from "./Bank/Bank";
import { useTheme } from "../../../../styles/ThemeProvider.js";
import { stringFa } from "../../../../assets/strings/stringFaCollection";
import * as detailActions from "../../../../store/actions/detail";

const BanksContainer = () => {
  const { selectedBanks, banks } = useSelector((state) => state.detail);
  const dispatch = useDispatch();

  const themeState = useTheme();
  const theme = themeState.computedTheme;

  const changeBankItemStatus = (_id, status) => {
    dispatch(detailActions.changeBankItemStatus({ _id, status }));
  };

  const changeSelectedMenuItems = (payload) => {
    dispatch(detailActions.changeSelectedMenuItems(payload));
  };


  const onBankItemClickHandler = (_id, parents, selected) => {
    changeBankItemStatus(_id, !selected)
    let payload;
    if (!selected) {
      payload = { key: "selectedBanks", value: _id, parents, mode: 'add' }
      changeSelectedMenuItems(payload)
      payload = { key: "selectedActiveBackups", value: parents[2], mode: 'sub' }
      changeSelectedMenuItems(payload)
    }
    else {
      payload = { key: "selectedBanks", value: _id, mode: 'sub' }
      changeSelectedMenuItems(payload)
      let existCount = selectedBanks.filter(item => item.parents[2] === parents[2])
      if (existCount.length <= 1) {
        payload = { key: "selectedActiveBackups", parents: [parents[0], parents[1]], value: parents[2], mode: 'add' }
        changeSelectedMenuItems(payload)
      }
    }
  }


  return (
    <div
      className="BanksContainer"
      style={{
        borderColor: theme.border_color,

      }}
    >
      {banks &&
        banks.map((item, index) => (
          <Bank key={item._id} {...item} onClick={onBankItemClickHandler} />
        ))}
      {
        banks.length === 0 && <p style={{ fontSize: '13px' }}>{stringFa.no_exist_banks}</p>
      }
      {/* {!data && [1, 2, 3, 4].map((n) => <SkeletonBank key={n} />)} */}
    </div>
  );
};

export default BanksContainer;

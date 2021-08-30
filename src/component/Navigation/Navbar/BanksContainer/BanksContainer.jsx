import React, { useState, useEffect } from "react";
import "./BanksContainer.scss";
import { useSelector } from "react-redux";
import Bank from "./Bank/Bank";
import { useTheme } from "../../../../styles/ThemeProvider.js";
import axios from "axios";
import { baseUrl } from "../../../../constants/Config";

const BanksContainer = () => {
  const [data, setData] = useState(null);
  const detail = useSelector((state) => state.detail);
  useEffect(async () => {
    if (detail.activeBackup) {
      const result = await axios.post(`${baseUrl}/get_banks`, {
        id: detail.activeBackup.id,
      });
      if (result.data.success) {
        setData(result.data.message.result);
      }
    }else{
      setData(null)
    }
  }, [detail.activeBackup]);
  const themeState = useTheme();
  const theme = themeState.computedTheme;
  return (
    <div className="BanksContainer" style={{ borderColor: theme.border_color }}>
      {data && data.map((slide, index) => <Bank key={slide.bank._id} data={slide.bank} />)}
    </div>
  );
};

export default BanksContainer;

import React from "react";
import "./BanksContainer.scss";
import { useSelector } from "react-redux";
import Bank from "./Bank/Bank";
import { useTheme } from "../../../../styles/ThemeProvider.js";

const BanksContainer = () => {
  const detail = useSelector((state) => state.detail);
  const themeState = useTheme();
  const theme = themeState.computedTheme;
  return (
    <div className="BanksContainer" style={{ borderColor: theme.border_color }}>
      {detail.software
        ? detail.software.banks.map((slide, index) => (
            <Bank key={slide.id} data={slide} />
          ))
        : null}
    </div>
  );
};

export default BanksContainer;

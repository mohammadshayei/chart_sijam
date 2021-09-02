import React from "react";
import { useTheme } from "../../styles/ThemeProvider";
import SkeletonElement from "./SkeletonElement.jsx";

const SkeletonBank = () => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  return (
    <div
      className="skeleton-wrapper"
      style={{
        backgroundColor: themeState.isDark
          ? theme.surface_1dp
          : "rgb(240, 240, 240)",
        width: "140px",
        margin: "0 5px",
      }}
    >
      <div className="skeleton-bank">
        <SkeletonElement type="text" />
      </div>
    </div>
  );
};

export default SkeletonBank;

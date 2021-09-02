import React from "react";
import { useTheme } from "../../styles/ThemeProvider";
import SkeletonElement from "./SkeletonElement.jsx";

const SkeletonMenuItem = () => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  return (
    <div
      className="skeleton-wrapper"
      style={{
        backgroundColor: themeState.isDark
          ? theme.surface_1dp
          : "rgb(240, 240, 240)",
      }}
    >
      <div className="skeleton-menu-item">
        <div>
          <SkeletonElement type="text" />
        </div>
        <div>
          <SkeletonElement type="avatar" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonMenuItem;

import React from "react";
import { useTheme } from "../../styles/ThemeProvider";
import Shimmer from "./Shimmer";
import SkeletonElement from "./SkeletonElement.jsx";

const SkeletonTextItem = () => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  return (
    <div
      className="skeleton-wrapper"
      style={{
        backgroundColor: themeState.isDark
          ? theme.surface_1dp
          : "rgb(240, 240, 240)",
        height: "10px",
        width: "100%",
      }}
    >
      <div className="skeleton-text-item">
        <SkeletonElement type="text" />
        <Shimmer />
      </div>
    </div>
  );
};

export default SkeletonTextItem;

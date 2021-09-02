import React from "react";
import { useTheme } from "../../styles/ThemeProvider";
import SkeletonElement from "./SkeletonElement.jsx";

const SkeletonCard = ({ childKey }) => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  return (
    <div
      key={childKey}
      className="skeleton-wrapper"
      style={{
        backgroundColor: themeState.isDark
          ? theme.surface_1dp
          : "rgb(240, 240, 240)",
        height: "100%",
      }}
    >
      <div className="skeleton-card">
        <SkeletonElement type="text" />
        <SkeletonElement type="title" />
        <SkeletonElement type="thumbnail" />
      </div>
    </div>
  );
};

export default SkeletonCard;

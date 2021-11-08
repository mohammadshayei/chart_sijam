import React from "react";
import { useTheme } from "../../styles/ThemeProvider";
import SkeletonChart from "./SkeletonChart";
import SkeletonElement from "./SkeletonElement.jsx";

const SkeletonCard = ({ childKey }) => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  return (
    <div
      key={childKey}
      className="skeleton-wrapper"
      style={{
        backgroundColor: themeState.isDark ? theme.surface_1dp : theme.surface,
        height: "100%",
      }}
    >
      <div className="skeleton-card">
        <SkeletonElement type="title" delay="0.5s" />
        <SkeletonChart />
      </div>
    </div>
  );
};

export default SkeletonCard;

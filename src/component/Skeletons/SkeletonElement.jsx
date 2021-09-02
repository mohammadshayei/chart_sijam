import React from "react";
import "./Skeleton.scss";
import { useTheme } from "../../styles/ThemeProvider";

const SkeletonElement = ({ type }) => {
  const classes = `skeleton ${type}`;
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  return (
    <div
      className={classes}
      style={{
        backgroundColor: themeState.isDark
          ? theme.surface_4dp
          : "rgb(230, 230, 230)",
      }}
    ></div>
  );
};

export default SkeletonElement;

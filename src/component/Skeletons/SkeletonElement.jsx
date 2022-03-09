import React from "react";
import "./Skeleton.scss";
import { useTheme } from "../../styles/ThemeProvider";

const SkeletonElement = ({ type, style, delay }) => {
  const classes = `skeleton ${type}`;
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  return (
    <div
      className={classes}
      style={{
        ...style,
        backgroundColor: themeState.isDark
          ? theme.surface_4dp
          : "rgb(210, 210, 210)",
      }}
    >
      <div
        className="shimmer"
        style={{
          backgroundImage: themeState.isDark
            ? `linear-gradient(to right,rgba(255,255,255,0.01) 0%,rgba(0, 0, 0, 0.2) 20%,rgba(255,255,255,0.01) 40%,rgba(255,255,255,0.01) 100%  )`
            : `linear-gradient(to right,rgb(210, 210, 210) 0%,rgba(0, 0, 0, 0.15) 20%,rgb(210, 210, 210) 40%,rgb(210, 210, 210) 100%  )`,
          animationDelay: delay,
        }}
      ></div>
    </div>
  );
};

export default SkeletonElement;

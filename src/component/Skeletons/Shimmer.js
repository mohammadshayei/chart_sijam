import React from "react";
import { useTheme } from "../../styles/ThemeProvider";

const Shimmer = () => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  return (
    <div className="shimmer-wrapper">
      <div
        className="shimmer"
        style={{
          backgroundColor: themeState.isDark ? theme.background_color : "white",
          boxShadow: `0 0 15px 15px ${
            themeState.isDark ? theme.background_color : "white"
          }`,
          opacity: themeState.isDark ? "0.2" : "0.5",
        }}
      ></div>
    </div>
  );
};

export default Shimmer;

import React from "react";
import { useTheme } from "../../styles/ThemeProvider";
import SkeletonElement from "./SkeletonElement.jsx";

const SkeletonProfile = () => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  return (
    <div
      className="skeleton-wrapper"
      style={{
        backgroundColor: 'transparent',
        width: "140px",
        margin: "0 5px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <SkeletonElement
        style={{
          margin: ".2rem .2rem",
          width: "4rem",
          height: "2.5rem",
        }}
        type="avatar"
      />
      <SkeletonElement type="text" />
    </div>
  );
};

export default SkeletonProfile;

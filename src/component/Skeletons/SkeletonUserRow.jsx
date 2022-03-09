import React from "react";
import { useTheme } from "../../styles/ThemeProvider";
import SkeletonElement from "./SkeletonElement.jsx";

const SkeletonUserRow = (props) => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  return (
    <div
      className="skeleton-wrapper"
      style={{
        backgroundColor: "transparent",
        width: "30%",
        minWidth: "110px",
        margin: "1rem 5px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {props.index === 0 && <SkeletonElement
        style={{
          margin: ".2rem .2rem",
          width: "4rem",
          height: "2.5rem",
        }}
        type="avatar"
        delay="0.3s"
      />}
      <SkeletonElement type="text"
        style={{
          margin: ".2rem .2rem",
        }}
        delay="0.1s" />
    </div>
  );
};

export default SkeletonUserRow;

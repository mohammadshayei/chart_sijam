import React from "react";
import { useTheme } from "../../styles/ThemeProvider";
import SkeletonElement from "./SkeletonElement.jsx";

const SkeletonTreeView = () => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  return (
    <div
      className="skeleton-wrapper"
      style={{
        backgroundColor: "transparent",
      }}
    >
      <div className="skeleton-treeview" >
        <SkeletonElement type="text" style={{ width: "7rem" }} />
        <SkeletonElement type="text" style={{ width: "7rem", margin: "1.1rem 2rem" }} />
        <SkeletonElement type="text" style={{ width: "7rem", margin: "1.1rem 2rem" }} />
        <SkeletonElement type="text" style={{ width: "7rem", margin: "1.1rem 4rem" }} />
        <SkeletonElement type="text" style={{ width: "7rem", margin: "1.1rem 6rem" }} />
        <SkeletonElement type="text" style={{ width: "7rem", margin: "1.1rem 4rem" }} />
        <SkeletonElement type="text" style={{ width: "7rem", margin: "1.1rem 6rem" }} />
      </div>
    </div>
  );
};

export default SkeletonTreeView;

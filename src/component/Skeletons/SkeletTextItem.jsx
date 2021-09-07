import React from "react";
import { useTheme } from "../../styles/ThemeProvider";
import SkeletonElement from "./SkeletonElement.jsx";

const SkeletTextItem = () => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  return (
    <div className="skeleton-item-container" style={{margin:".4rem 0"}}>
      <SkeletonElement style={{ width: "3rem" }} type="text" />
    </div>
  );
};

export default SkeletTextItem;

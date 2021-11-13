import React from "react";
import { useTheme } from "../../styles/ThemeProvider";
import SkeletonElement from "./SkeletonElement.jsx";

const SkeletonChart = ({ childKey }) => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  return (
    <div key={childKey} className="skeleton-wrapper">
      <div className="skeleton-chart">
        <div className="legend">
          <SkeletonElement
            type="text"
            style={{
              width: "100px",
              margin: "0 40px 40px 0",
            }}
            delay="0.4s"
          />
          <SkeletonElement
            type="text"
            style={{
              width: "100px",
              marginTop: "0",
              marginBottom: "50px",
            }}
            delay="0.6s"
          />
        </div>
        <div className="bars">
          <SkeletonElement
            type="bar"
            style={{ height: "80px" }}
            delay="0.25s"
          />
          <SkeletonElement
            type="bar"
            style={{ height: "230px" }}
            delay="0.25s"
          />
          <SkeletonElement
            type="bar"
            style={{ height: "150px" }}
            delay="0.5s"
          />
          <SkeletonElement
            type="bar"
            style={{ height: "195px" }}
            delay="0.5s"
          />
          <SkeletonElement
            type="bar"
            style={{ height: "125px" }}
            delay="0.75s"
          />
        </div>
      </div>
    </div>
  );
};

export default SkeletonChart;

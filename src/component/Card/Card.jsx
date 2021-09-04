import React, { useState } from "react";
import "./Card.scss";
import TitleBlock from "../TitleBlock/TitleBlock";
import ChartBlock from "../ChartBlock";
import { useTheme } from "../../styles/ThemeProvider";
import { useSelector } from "react-redux";

const Card = React.memo((props) => {
  const chartsData = useSelector((state) => state.chart);
  const [isHover, setIsHover] = useState(false);
  const themeState = useTheme();
  const theme = themeState.computedTheme;
  const onMouseEnter = () => {
    setIsHover(true);
  };
  const onMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <div
      className="card card-container"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        backgroundColor: isHover
          ? themeState.isDark
            ? theme.surface_4dp
            : theme.surface
          : themeState.isDark
          ? theme.surface_1dp
          : theme.surface,
        border: chartsData.editMode
          ? isHover
            ? `1px solid ${theme.primary}`
            : `1px solid ${theme.border_color}`
          : `1px solid ${theme.border_color}`,
        cursor: "mouse",
        cursor: chartsData.editMode && "move",
      }}
    >
      <TitleBlock
        chartId={props.chartId}
        chartType={props.item.type}
        title={props.item.title}
      />
      <div className="card-body">
        <ChartBlock chartId={props.chartId} chartProps={props.item} />
      </div>
    </div>
  );
});

export default Card;

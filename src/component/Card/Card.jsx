import React, { useState } from "react";
import "./Card.scss";
import TitleBlock from "../TitleBlock/TitleBlock";
import ChartBlock from "../ChartBlock";
import { useTheme } from "../../styles/ThemeProvider";

const Card = React.memo((props) => {
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
      key={props.key}
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
        borderColor: theme.border_color,
      }}
    >
      <TitleBlock
        chartId={props.chartId}
        chartType={props.item.type}
        title={props.item.title}
      />
      <div className="card-body">
        <ChartBlock chartProps={props.item} />
      </div>
    </div>
  );
});

export default Card;

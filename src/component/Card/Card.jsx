import React, { useState, useEffect } from "react";
import "./Card.scss";
import TitleBlock from "../TitleBlock/TitleBlock";
import ChartBlock from "../ChartBlock";
import { useTheme } from "../../styles/ThemeProvider";
import { useSelector } from "react-redux";

const Card = React.memo((props) => {
  const chartsData = useSelector((state) => state.chart);
  const [isHover, setIsHover] = useState(false);
  const [lastBankUpdate, setLastBankUpdate] = useState(null);
  const themeState = useTheme();
  const theme = themeState.computedTheme;
  const onMouseEnter = () => {
    setIsHover(true);
  };
  const onMouseLeave = () => {
    setIsHover(false);
  };

  useEffect(() => {
    let weekday = new Date(props.item.lastBankUpdate).toLocaleString("fa-IR", {
      weekday: "long",
    });
    let day = new Date(props.item.lastBankUpdate).toLocaleString("fa-IR", {
      day: "numeric",
    });
    let month = new Date(props.item.lastBankUpdate).toLocaleString("fa-IR", {
      month: "long",
    });
    let year_Time = new Date(props.item.lastBankUpdate).toLocaleString(
      "fa-IR",
      {
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      }
    );
    const lastBankUpdate = `${weekday} - ${day} ${month} ${year_Time}`;
    setLastBankUpdate(lastBankUpdate);
  }, [props.item.lastBankUpdate]);

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
        parent={props.item.parent}
      />
      <div className="card-body">
        <ChartBlock chartId={props.chartId} chartProps={props.item} />
      </div>
      <div className="card-footer">{lastBankUpdate}</div>
    </div>
  );
});

export default Card;

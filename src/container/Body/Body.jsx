import React, { useState, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "./Body.scss";
import CardContainer from "./../CardContainer/CardContainer";

const ResponsiveGridLayout = WidthProvider(Responsive);

const Body = (props) => {
  const [charts, setCharts] = useState(null);

  useEffect(() => {
    let tempData = [];
    if (props.data) {
      props.data.forEach((item) => {
        tempData = [...tempData, ...item.charts];
      });
      setCharts(tempData);
    }
  }, [props.data]);

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={props.layouts}
      isDraggable
      isRearrangeable
      isResizable
      draggableHandle=".title-container"
      breakpoints={{ lg: 1280, md: 992, sm: 767, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
    >
      {charts
        ? charts.map((item, index) => <CardContainer key={item} item={item} />)
        : null}
    </ResponsiveGridLayout>
  );
};
export default Body;

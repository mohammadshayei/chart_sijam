import React, { useState, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "./Body.scss";
import CardContainer from "./../CardContainer/CardContainer";
import { useDispatch, useSelector } from "react-redux";
import * as chartActions from "../../store/actions/chart.js";

const ResponsiveGridLayout = WidthProvider(Responsive);

const Body = (props) => {
  // const [charts, setCharts] = useState(null);

  const chartsData = useSelector((state) => state.chart);

  const dispatch = useDispatch();
  const setChartsData = (chartsData) => {
    dispatch(chartActions.setChartsData(chartsData));
  };

  useEffect(() => {
    let tempData = [];
    if (props.data) {
      props.data.forEach((item) => {
        tempData = [...tempData, ...item.charts];
      });
    }
    let newChartsData = {};
    tempData.forEach((item) => {
      newChartsData = {
        ...newChartsData,
        [item.id]: {
          title: item.title,
          type: item.type,
          data: {
            backGroundColor: item.backGroundColor,
            borderColor: item.borderColor,
            borderWidth: item.borderWidth,
            borderRadius: item.borderRadius,
            database: item.database,
            option: item.option,
            id: item.id,
          },
        },
      };
    });
    setChartsData(newChartsData);
  }, [props.data]);

  return chartsData.layouts && chartsData.data ? (
    <ResponsiveGridLayout
      className="layout"
      layouts={chartsData.layouts}
      isDraggable
      isRearrangeable
      isResizable
      // draggableHandle=".grid-item"
      breakpoints={{ lg: 1280 }} /*, md: 992, sm: 767, xs: 480, xxs: 0  */
      cols={{ lg: 12 }} /*, md: 10, sm: 6, xs: 4, xxs: 2  */
      rowHeight={281}
      width={1200}
    >
      {chartsData.data
        ? Object.entries(chartsData.data).map(([k, v]) => (
            <CardContainer key={k} item={v} />
          ))
        : null}
    </ResponsiveGridLayout>
  ) : null;
};
export default Body;

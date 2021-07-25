import React, { useEffect } from "react";
import { Responsive as ResponsiveGridLayout } from "react-grid-layout";
import { withSize } from "react-sizeme";
import "./Body.scss";
import { useDispatch, useSelector } from "react-redux";
import * as chartActions from "../../store/actions/chart.js";
import Card from "./../../component/Card/Card";

const Body = (props) => {
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
            options: item.options,
            id: item.id,
          },
        },
      };
    });
    setChartsData(newChartsData);
  }, [props.data]);

  return chartsData.layouts && chartsData.data ? (
    <div className="body-container">
      <ResponsiveGridLayout
        className="layout"
        layouts={chartsData.layouts}
        isDraggable
        isRearrangeable
        isResizable
        autoSize
        isBounded
        // onBreakpointChange={console.log("BreakpointChanged !")}
        measureBeforeMount={true}
        // useCSSTransforms={true}
        margin={[30, 30]}
        width={props.size.width}
        breakpoints={{ lg: 1280, md: 992, sm: 767, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      >
        {Object.entries(chartsData.data).map(([k, v]) => (
          <div key={k} className="card-container">
            <Card key={k} item={v} />
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  ) : null;

};
export default withSize()(Body);

import React, { useEffect } from "react";
import { Responsive as ResponsiveGridLayout } from "react-grid-layout";
import { withSize } from "react-sizeme";
import "./Body.scss";
import { useDispatch, useSelector } from "react-redux";
import * as chartActions from "../../store/actions/chart.js";
import Card from "./../../component/Card/Card";
import { useTheme } from "../../styles/ThemeProvider";
import axios from "axios";
import { baseUrl } from "./../../constants/Config";

const Body = (props) => {
  const chartsData = useSelector((state) => state.chart);
  const detail = useSelector((state) => state.detail);
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  const dispatch = useDispatch();
  const setChartsData = (chartsData) => {
    dispatch(chartActions.setChartsData(chartsData));
  };

  useEffect(async () => {
    let result;
    if (detail.activeBackup) {
      result = await axios.post(`${baseUrl}/get_charts`, {
        type: "4",
        id: detail.activeBackup.id,
      });
    } else if (detail.software) {
      result = await axios.post(`${baseUrl}/get_charts`, {
        type: "3",
        id: detail.software.id,
      });
      console.log(result);
    } else if (detail.company) {
      result = await axios.post(`${baseUrl}/get_charts`, {
        type: "2",
        id: detail.company.id,
      });
    } else if (detail.holding) {
      result = await axios.post(`${baseUrl}/get_charts`, {
        type: "1",
        id: detail.holding.id,
      });
    }
    if (result) {
      let receivedData = result.data.message.result;
      let newChartsData = {};
      receivedData.forEach((item) => {
        newChartsData = {
          ...newChartsData,
          [item._id]: {
            title: item.title,
            type: item.type,
            data: item.data,
            options: item.options,
          },
        };
      });
      setChartsData(newChartsData);
    }
  }, [detail]);

  return chartsData.layouts && chartsData.data ? (
    <div
      className="body-container"
      style={{
        backgroundColor: theme.background_color,
        color: theme.on_background,
      }}
    >
      <ResponsiveGridLayout
        className="layout"
        layouts={chartsData.layouts}
        isDraggable
        isRearrangeable
        isResizable
        autoSize
        isBounded
        // onBreakpointChange={console.log({breakpoint})}
        measureBeforeMount={true}
        // useCSSTransforms={true}
        margin={[30, 30]}
        width={props.size.width}
        rowHeight={60}
        breakpoints={{ lg: 1280, md: 992, sm: 767, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        // onLayoutChange={onLayoutChange}
      >
        {Object.entries(chartsData.data).map(([k, v]) => (
          <div key={k}>
            <Card key={k} chartId={k} item={v} />
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  ) : null;
};
export default withSize()(Body);

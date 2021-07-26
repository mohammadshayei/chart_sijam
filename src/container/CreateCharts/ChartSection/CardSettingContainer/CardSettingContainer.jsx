import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./CardSettingContainer.scss";
import { lightTheme } from "../../../../styles/theme";
import EditTitle from "../../../../component/UI/EditTitle/EditTitle";
import SwapHorizRoundedIcon from "@material-ui/icons/SwapHorizRounded";
import SettingsRoundedIcon from "@material-ui/icons/SettingsRounded";
import UndoRoundedIcon from "@material-ui/icons/UndoRounded";
import SwapVertRoundedIcon from "@material-ui/icons/SwapVertRounded";
import ChartBlock from "./../../../../component/ChartBlock";
import * as chartActions from "../../../../store/actions/chart.js";

const CardSettingContainer = (props) => {
  const [chartData, setChartData] = useState(null);
  const dispatch = useDispatch();
  const setChartOptions = (chartOptions) => {
    dispatch(
      chartActions.setChartOptions({ chartId: props.data.id, chartOptions })
    );
  };

  useEffect(() => {
    if (
      (props.type === "Line" ||
        props.type === "Doughnut" ||
        props.type === "Pie" ||
        props.type === "PolarArea" ||
        props.type === "Bar" ||
        props.type === "Radar") &&
      props.data.database
    ) {
      setChartData({
        labels: props.data.database.labels,
        datasets: props.data.database.data.map((item, index) => {
          return {
            label: item.label,
            data: item.data,
            backgroundColor:
              props.data.database.data.length === 1
                ? props.data.backGroundColor
                : props.data.backGroundColor[index],
            borderColor:
              props.data.database.data.length === 1
                ? props.data.borderColor
                : props.data.borderColor[index],
            borderRadius: props.data.borderRadius,
            borderWidth: props.data.borderWidth,
          };
        }),
      });
    }
  }, [props.data]);

  const swapVertClickHandler = () => {
    setChartOptions({
      ...props.options,
      scales: {
        ...props.options.scales,
        y: {
          ...props.options.scales.y,
          reverse: !props.options.scales.y.reverse,
        },
      },
    });
  };
  const swapHorizClickHandler = () => {
    setChartOptions({
      ...props.options,
      scales: {
        ...props.options.scales,
        x: {
          ...props.options.scales.x,
          reverse: !props.options.scales.x.reverse,
        },
        y: {
          ...props.options.scales.y,
          position:
            props.options.scales.y.position === "left" ? "right" : "left",
        },
      },
    });
  };
  const editTitleClickHandler = (type) => {};

  return (
    <div className="CardSettingContainer">
      <div className="CartBodyLeftSection">
        <EditTitle
          type="titleX"
          options={props.options}
          setOptions={props.setOptions}
          style={{ marginBottom: "1.3rem", marginLeft: "5rem" }}
        />
      </div>
      <div className="CartBodyRightSection">
        <div className="CardSettingHeader">
          <div className="SettingVertical">
            <SettingsRoundedIcon
              style={{
                cursor: "pointer",
              }}
            />
          </div>
          <EditTitle type="title" data={props.data} />
          <div className="SettingBanksColor">
            <SettingsRoundedIcon
              style={{
                cursor: "pointer",
              }}
            />
          </div>
        </div>
        <div className="CardContent">
          <div className="CardContentTop">
            <div className="SwapVerticalContainer">
              <SwapVertRoundedIcon
                onClick={swapVertClickHandler}
                style={{
                  color: lightTheme.clicked_darken_color,
                  fontSize: "2.4rem",
                  cursor: "pointer",
                }}
              />
            </div>
            <div className="ChartShowContainer">
              <ChartBlock
                type={props.type}
                data={chartData}
                options={props.options}
              />
            </div>
          </div>
          <div className="CardContentBottom">
            <div className="SwapAxisContainer">
              <UndoRoundedIcon
                style={{
                  color: lightTheme.clicked_darken_color,
                  fontSize: "2rem",
                  cursor: "pointer",
                }}
              />
            </div>
            <div className="SwapHorizontalContainer">
              <SwapHorizRoundedIcon
                onClick={swapHorizClickHandler}
                style={{
                  fontSize: "2.4rem",
                  color: lightTheme.clicked_darken_color,
                  cursor: "pointer",
                }}
              />
              <EditTitle
                type="titleY"
                options={props.options}
                setOptions={props.setOptions}
              />
            </div>
            <div className="SettingHoriAxis">
              <SettingsRoundedIcon
                style={{
                  cursor: "pointer",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* <LineChart  data={props.data}/> */}
    </div>
  );
};

export default CardSettingContainer;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stringFa } from "../../../../assets/strings/stringFaCollection";
import * as addChartActions from "../../../../store/actions/addChart";
import { useTheme } from "../../../../styles/ThemeProvider";
import { baseUrl } from "./../../../../constants/Config";
import CheckBox from "../../../../component/UI/CheckBox/CheckBox";
import "./ChartSetting.scss";

const ChartSetting = () => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;
  const [themePalette, setThemePalette] = useState({
    noTheme: {
      backgroundImage:
        "linear-gradient(45deg, #67b7dc 0%,#67b7dc 50%,#c767dc 50%,#c767dc 100%)",
      borderColor: "#fff",
      active: true,
    },
    dataviz: {
      backgroundImage:
        "linear-gradient(45deg, #283250 0%,#283250 50%,#902c2d 50%,#902c2d 100%)",
      borderColor: "#fff",
      active: false,
    },
    dark: {
      backgroundImage:
        "linear-gradient(45deg, #67b7dc 0%,#67b7dc 50%,#c767dc 50%,#c767dc 100%)",
      borderColor: "#000",
      active: false,
    },
    frozen: {
      backgroundImage:
        "linear-gradient(45deg, #bec4f8 0%,#bec4f8 50%,#a5abee 50%,#a5abee 100%)",
      borderColor: "#fff",
      active: false,
    },
    moonrisekingdom: {
      backgroundImage:
        "linear-gradient(45deg, #3a1302 0%,#3a1302 50%,#c79f59 50%,#c79f59 100%)",
      borderColor: "#fff",
      active: false,
    },
    spiritedaway: {
      backgroundImage:
        "linear-gradient(45deg, #65738e 0%,#65738e 50%,#523b58 50%,#523b58 100%)",
      borderColor: "#fff",
      active: false,
    },
  });
  const [legend, setLegend] = useState({
    display: true,
    position: {
      top: { img: "images/legend-top.svg", selected: true },
      right: { img: "images/legend-right.svg", selected: false },
      bottom: { img: "images/legend-bottom.svg", selected: false },
      left: { img: "images/legend-left.svg", selected: false },
    },
    colorize: false,
  });
  const takenData = useSelector((state) => state.addChart);

  const dispatch = useDispatch();
  const setChartOptions = (chartOptions) => {
    dispatch(addChartActions.setChartOptions({ chartOptions }));
  };

  const paletteClickHandler = (key) => {
    let updatedThemePalette = { ...themePalette };
    for (const theme in updatedThemePalette) {
      if (theme === key) {
        updatedThemePalette[theme].active = true;
      } else {
        updatedThemePalette[theme].active = false;
      }
    }
    setThemePalette(updatedThemePalette);
  };

  const legendsClickHandler = (key) => {
    let updatedLegend = { ...legend };
    for (const k1 in updatedLegend) {
      if (k1 === "position") {
        for (const k2 in updatedLegend[k1]) {
          if (k2 === key) {
            updatedLegend[k1][k2].selected = true;
          } else updatedLegend[k1][k2].selected = false;
        }
      }
    }
    setLegend(updatedLegend);
  };

  const handleCheckBoxClick = (checked) => {
    let updatedLegend = { ...legend };
    updatedLegend.display = checked;
    setLegend(updatedLegend);
  };

  const handleCheckBoxColorClick = (checked) => {
    let updatedLegend = { ...legend };
    updatedLegend.colorize = checked;
    setLegend(updatedLegend);
  };

  useEffect(() => {
    let updatedThemePalette = { ...themePalette };
    let updatedLegend = { ...legend };
    if (
      takenData.chartData.data.options.theme &&
      takenData.chartData.data.options.theme !== ""
    ) {
      for (const theme in updatedThemePalette) {
        if (takenData.chartData.data.options.theme === theme) {
          updatedThemePalette[theme].active = true;
        } else updatedThemePalette[theme].active = false;
      }
    }
    setThemePalette(updatedThemePalette);
    if (takenData.chartData.data.options.legend) {
      updatedLegend.display = takenData.chartData.data.options.legend.display;
      updatedLegend.colorize = takenData.chartData.data.options.legend.colorize;
      for (const key in updatedLegend.position) {
        if (`${key}` === takenData.chartData.data.options.legend.position) {
          updatedLegend.position[key].selected = true;
        } else updatedLegend.position[key].selected = false;
      }
    }
    setLegend(updatedLegend);
  }, []);

  useEffect(() => {
    let chartOptions = { ...takenData.chartData.data.options };
    for (const theme in themePalette) {
      if (themePalette[theme].active) {
        chartOptions.theme = theme;
      }
    }
    setChartOptions(chartOptions);
  }, [themePalette]);

  useEffect(() => {
    let chartOptions = { ...takenData.chartData.data.options };
    if (legend) {
      chartOptions.legend.display = legend.display;
      for (const pos in legend.position) {
        if (legend.position[pos].selected) {
          chartOptions.legend.position = `${pos}`;
        }
      }
      chartOptions.legend.colorize = legend.colorize;
      setChartOptions(chartOptions);
    }
  }, [legend]);

  return (
    <div className="chart-setting-container">
      <ul className="setting-list">
        <li className="setting-item">
          <ul className="theme-switcher">
            <li className="list theme-text">:انتخاب تم</li>
            {Object.entries(themePalette).map(([k, v]) => {
              return (
                <li
                  key={k}
                  className="list"
                  style={{ border: v.active ? "2px solid #3b96ff" : "none" }}
                  onMouseEnter={() => {}}
                >
                  <a
                    className="dot"
                    style={{
                      backgroundImage: `${v.backgroundImage}`,
                      borderColor: `${v.borderColor}`,
                    }}
                    onClick={() => paletteClickHandler(k)}
                  ></a>
                </li>
              );
            })}
          </ul>
        </li>
        <li className="setting-item">
          <CheckBox
            checked={legend.display}
            onChange={(e) => handleCheckBoxClick(e.target.checked)}
          >
            {stringFa.legend}
          </CheckBox>
          {legend.display && (
            <div>
              <div className="legend-positions-container">
                {Object.entries(legend.position).map(([k, v]) => {
                  return (
                    <div
                      key={k}
                      style={{
                        border: v.selected
                          ? `2px solid ${theme.primary}`
                          : "none",
                      }}
                      className="legend-position"
                      onClick={() => legendsClickHandler(k)}
                    >
                      <img
                        className="legend-position-image"
                        src={`${baseUrl}${v.img}`}
                        alt=""
                      />
                    </div>
                  );
                })}
              </div>
              <CheckBox
                checked={legend.colorize}
                onChange={(e) => handleCheckBoxColorClick(e.target.checked)}
              >
                {stringFa.colorize}
              </CheckBox>
            </div>
          )}
        </li>
        <li className="setting-item">برچسب محورها</li>
        <li className="setting-item">ابزار راهنما</li>
      </ul>
    </div>
  );
};

export default ChartSetting;

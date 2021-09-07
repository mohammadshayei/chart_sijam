import React, { useState, useEffect } from "react";
import "./Gallery.scss";
import { useTheme } from "../../../../styles/ThemeProvider";
import { useSelector, useDispatch } from "react-redux";
import * as addChartActions from "../../../../store/actions/addChart";
import { baseUrl } from "./../../../../constants/Config";

const Gallery = (props) => {
  const takenData = useSelector((state) => state.addChart);
  const themeState = useTheme();
  const theme = themeState.computedTheme;
  const [groups, setGroups] = useState({
    Line: {
      title: "خطی",
      items: {
        line: {
          img: "images/v2-line-chart-color.svg",
          selected: false,
        },
        smooth: {
          img: "images/v2-smooth-line-chart-color.svg",
          selected: true,
        },
        area: {
          img: "images/v2-area-chart-color.svg",
          selected: false,
        },
        stackedArea: {
          img: "images/v2-stacked-area-chart-color.svg",
          selected: false,
        },
        fullStackedArea: {
          img: "images/v2-100p-stacked-area-chart-color.svg",
          selected: false,
        },
      },
    },
    Column: {
      title: "ستونی",
      items: {
        bar: {
          img: "images/v2-bar-chart-color.svg",
          selected: false,
        },
        stackedBar: {
          img: "images/v2-stacked-bar-chart-color.svg",
          selected: false,
        },
        horizontal: {
          img: "images/v2-horizontal-bar-chart-color.svg",
          selected: false,
        },
        horizontalStacked: {
          img: "images/v2-horizontal-stacked-chart-color.svg",
          selected: false,
        },
      },
    },
    Pie: {
      title: "دایره ای",
      items: {
        pie: {
          img: "images/v2-pie-chart-color.svg",
          selected: false,
        },
        donut: {
          img: "images/v2-donut-chart-color.svg",
          selected: false,
        },
      },
    },
    // Gauge: {
    //   title: "گیج",
    //   items: {
    //     gauge: {
    //       img: "https://raw.githubusercontent.com/antoinebeland/d3-simple-gauge/HEAD/doc/gauge.PNG",
    //       selected: false,
    //     },
    //   },
    // },
  });

  const dispatch = useDispatch();
  const setChartData = (chartData) => {
    dispatch(addChartActions.setChartData(chartData));
  };

  useEffect(() => {
    const updatedGroups = { ...groups };
    if (takenData.chartData.type) {
      for (const type in updatedGroups) {
        for (const style in updatedGroups[type].items) {
          updatedGroups[type].items[style].selected = false;
        }
        if (type === takenData.chartData.type) {
          switch (type) {
            case "Line": {
              if (takenData.chartData.data.options.series.tensionX < 1)
                updatedGroups[type].items["smooth"].selected = true;
              else updatedGroups[type].items["line"].selected = true;
              break;
            }
            case "Column": {
              if (takenData.chartData.data.options.series.stacked)
                updatedGroups[type].items["stackedBar"].selected = true;
              else updatedGroups[type].items["bar"].selected = true;
              break;
            }
            case "Pie": {
              updatedGroups[type].items["pie"].selected = true;
              break;
            }
            case "Pie": {
              updatedGroups[type].items["donut"].selected = true;
              break;
            }
            default:
              break;
          }
        }
      }
    }
  }, [takenData.chartData]);

  useEffect(() => {
    let chartData = { ...takenData.chartData };
    for (const group in groups) {
      for (const item in groups[group].items) {
        if (groups[group].items[item].selected) {
          switch (item) {
            case "smooth":
              chartData.type = "Line";
              chartData.data.options.series.tensionX = 0.77;
              break;
            case "line":
              chartData.type = "Line";
              chartData.data.options.series.tensionX = 1;
              break;
            case "stackedBar":
              chartData.type = "Column";
              chartData.data.options.series.stacked = true;
              break;
            case "bar":
              chartData.type = "Column";
              chartData.data.options.series.stacked = false;
              break;
            case "pie":
              chartData.type = "Pie";
              break;
            case "donut":
              chartData.type = "Doughnut";
              break;

            default:
              break;
          }
        }
      }
    }
    setChartData(chartData);
  }, [groups]);

  const onClickHandler = (e, grp, item) => {
    let updatedGroups = { ...groups };
    let clickedItem = grp.items[item];
    for (const group in updatedGroups) {
      for (const item in updatedGroups[group].items) {
        updatedGroups[group].items[item].selected = false;
      }
    }
    clickedItem.selected = true;
    setGroups(updatedGroups);
  };

  return (
    <div className="gallery-group-wrapper">
      {Object.entries(groups).map(([k, v]) => {
        return (
          <div key={k} className="gallery-group">
            <div className="gallery-group-title">
              <span style={{ color: theme.text_color, fontSize: 12 }}>
                {v.title}
              </span>
            </div>
            <div className="gallery-group-content">
              {Object.entries(v.items).map(([key, item]) => {
                return (
                  <div key={key} className="gallery-item-wrapper">
                    <div
                      style={{
                        borderColor: item.selected
                          ? theme.primary
                          : theme.border_color,
                      }}
                      className={`gallery-item`}
                      onClick={(e) => onClickHandler(e, v, key)}
                    >
                      <span className="gallery-item-text">
                        <img
                          className="gallery-item-image"
                          src={`${baseUrl}${item.img}`}
                          alt=""
                        />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Gallery;

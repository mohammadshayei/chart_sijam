import React, { useState } from "react";
import "./Gallery.scss";
import { useTheme } from "../../../../styles/ThemeProvider";

const Gallery = (props) => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;
  const [groups, setGroups] = useState({
    Line: {
      title: "خطی",
      items: {
        line: {
          img: "https://cdn7.monday.com/images/v2-line-chart-color.svg",
          selected: false,
        },
        smooth: {
          img: "https://cdn7.monday.com/images/v2-smooth-line-chart-color.svg",
          selected: true,
        },
        area: {
          img: "https://cdn7.monday.com/images/v2-area-chart-color.svg",
          selected: false,
        },
        stackedArea: {
          img: "https://cdn7.monday.com/images/v2-stacked-area-chart-color.svg",
          selected: false,
        },
        fullStackedArea: {
          img: "https://cdn7.monday.com/images/v2-100p-stacked-area-chart-color.svg",
          selected: false,
        },
      },
    },
    Column: {
      title: "ستونی",
      items: {
        bar: {
          img: "https://cdn7.monday.com/images/v2-bar-chart-color.svg",
          selected: false,
        },
        stackedBar: {
          img: "https://cdn7.monday.com/images/v2-stacked-bar-chart-color.svg",
          selected: false,
        },
        horizontal: {
          img: "https://cdn7.monday.com/images/v2-horizontal-bar-chart-color.svg",
          selected: false,
        },
        horizontalStacked: {
          img: "https://cdn7.monday.com/images/v2-horizontal-stacked-chart-color.svg",
          selected: false,
        },
      },
    },
    Pie: {
      title: "دایره ای",
      items: {
        pie: {
          img: "https://cdn7.monday.com/images/v2-pie-chart-color.svg",
          selected: false,
        },
        donut: {
          img: "https://cdn7.monday.com/images/v2-donut-chart-color.svg",
          selected: false,
        },
      },
    },
    Gauge: {
      title: "گیج",
      items: {
        gauge: {
          img: "https://raw.githubusercontent.com/antoinebeland/d3-simple-gauge/HEAD/doc/gauge.PNG",
          selected: false,
        },
      },
    },
  });

  // useEffect(() => {
  //   for (const item in groups) {
  //     if (item === props.type) {
  //       onClickHandler(groups[item], "smooth");
  //     }
  //   }
  // }, [props.type]);

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
                      className={`gallery-item ${item.selected && "selected"}`}
                      onClick={(e) => onClickHandler(e, v, key)}
                    >
                      <span className="gallery-item-text">
                        <img
                          className="gallery-item-image"
                          src={item.img}
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

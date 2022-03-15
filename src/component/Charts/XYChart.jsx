import React, { useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { useTheme } from "../../styles/ThemeProvider.js";
import am4themes_dataviz from "@amcharts/amcharts4/themes/dataviz";
// import am4themes_material from "@amcharts/amcharts4/themes/material";
// import am4themes_kelly from "@amcharts/amcharts4/themes/kelly";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import am4themes_frozen from "@amcharts/amcharts4/themes/frozen";
import am4themes_moonrisekingdom from "@amcharts/amcharts4/themes/moonrisekingdom";
import am4themes_spiritedaway from "@amcharts/amcharts4/themes/spiritedaway";
// import am4themes_microchart from "@amcharts/amcharts4/themes/microchart";

// am4core.useTheme(am4themes_microchart);
am4core.addLicense("ch-custom-attribution");
am4core.options.autoDispose = true;

const XYChart = React.memo((props) => {
  const themeState = useTheme();
  const { data, type, options } = props.chartProps;

  let xyChart;
  useEffect(() => {
    switch (options.theme) {
      case "dataviz":
        am4core.unuseAllThemes();
        am4core.useTheme(am4themes_dataviz);
        break;
      // case "material":
      //   am4core.useTheme(am4themes_material);
      //   break;
      // case "kelly":
      //   am4core.useTheme(am4themes_kelly);
      //   break;
      case "dark":
        am4core.unuseAllThemes();
        am4core.useTheme(am4themes_dark);
        break;
      case "frozen":
        am4core.unuseAllThemes();
        am4core.useTheme(am4themes_frozen);
        break;
      case "moonrisekingdom":
        am4core.unuseAllThemes();
        am4core.useTheme(am4themes_moonrisekingdom);
        break;
      case "spiritedaway":
        am4core.unuseAllThemes();
        am4core.useTheme(am4themes_spiritedaway);
        break;
      default:
        am4core.unuseAllThemes();
        break;
    }
    am4core.useTheme(am4themes_animated);
    themeState.isDark && am4core.useTheme(am4themes_dark);
    if (props.chartId) {
      if (type === "Radar") {
        xyChart = am4core.create(`${props.chartId}`, am4charts.RadarChart);
      } else {
        xyChart = am4core.create(`${props.chartId}`, am4charts.XYChart);
        xyChart.paddingBottom = -10;
        xyChart.paddingLeft = -10;
      }
      xyChart.responsive.enabled = true;
      xyChart.responsive.useDefault = true;
      let series;

      xyChart.data = data;

      if (type === "Line" || type === "Column" || type === "Radar") {
        xyChart.events.on("beforedatavalidated", function () {
          for (let i = 0; i < xyChart.data.length; i++) {
            xyChart.data[i].category = xyChart.data[i].category.replace(
              / \(.*/,
              ""
            );
          }
          if (options.axes.xAxes.repeatingCategories) {
            for (let i = 0; i < xyChart.data.length; i++) {
              xyChart.data[i].category += " (" + i + ")";
            }
          }
        });
        // Create axes
        var categoryAxis = xyChart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "category"; //dataField category
        categoryAxis.renderer.grid.template.location =
          options.axes.xAxes.gridTemplateLocation;
        categoryAxis.renderer.minGridDistance =
          options.axes.xAxes.minGridDistance;
        if (type === "Line" || type === "Column") {
          if (options.axes.xAxes.rotation) {
            categoryAxis.renderer.labels.template.rotation = 315; //charkheshe axes lables
            categoryAxis.renderer.labels.template.horizontalCenter = "right";
            categoryAxis.renderer.labels.template.verticalCenter = "right";
          }
          // categoryAxis.renderer.minHeight = 10;
        }
        categoryAxis.renderer.labels.template.adapter.add(
          "textOutput",
          function (text) {
            if (typeof text === 'string')
              return text.replace(/ \(.*/, "");
          }
        );

        var valueAxis = xyChart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.labels.fill = "#000";
        valueAxis.renderer.labels.fillOpacity = 0;
        // valueAxis.title.fontWeight = "bold";

        if (options.axes.yAxes.break.active) {
          let axisBreak = valueAxis.axisBreaks.create();
          axisBreak.startValue = options.axes.yAxes.break.start;
          axisBreak.endValue = options.axes.yAxes.break.end;
          axisBreak.breakSize = 0.005; //options.axes.yAxes.break.size;
          // fixed axis break
          // let d =
          //   (axisBreak.endValue - axisBreak.startValue) /
          //   (valueAxis.max - valueAxis.min);
          // axisBreak.breakSize = (0.05 * (1 - d)) / d; // 0.05 means that the break will take 5% of the total value axis height
          // make break expand on hover
          let hoverState = axisBreak.states.create("hover");
          hoverState.properties.breakSize = 1;
          hoverState.properties.opacity = 0.1;
          hoverState.transitionDuration = 1500;
          axisBreak.defaultState.transitionDuration = 1000;
        }

        // Create series
        function createSeries(field, name) {
          // valueAxis.title.text = name;
          if (type === "Line") {
            series = xyChart.series.push(new am4charts.LineSeries());
            // var series = xyChart.series.push(new am4charts.OHLCSeries());          //OHLC
            // var series = xyChart.series.push(new am4charts.StepLineSeries());      //stepLine
            series.dataFields.valueY = field;
            series.dataFields.categoryX = "category";
            series.name = name;
            // series.tooltipText = "{dateX}: [b]{valueY}[/]";
            series.strokeWidth = options.series.strokeWidth;
            // series.smoothing = options.series.smoothing;
            series.tensionX = options.series.tensionX;
            if (options.legend.colorize)
              series.legendSettings.labelText = "[{color}]{name}[/]";
            if (options.series.bullet.display) {
              var bullet = series.bullets.push(new am4charts.CircleBullet());
              bullet.circle.stroke = am4core.color(
                options.series.bullet.strokeColor
              );
              bullet.circle.strokeWidth = options.series.bullet.strokeWidth;
            }
          } else if (type === "Column") {
            // var series = xyChart.series.push(new am4charts.CandlestickSeries());
            series = xyChart.series.push(new am4charts.ColumnSeries());
            // var series = xyChart.series.push(new am4charts.ColumnSeries3D());
            // var series = xyChart.series.push(new am4charts.ConeSeries());
            // var series = xyChart.series.push(new am4charts.CurvedColumnSeries());
            series.dataFields.valueY = field;
            series.dataFields.categoryX = "category";
            series.name = name;
            if (options.legend.colorize)
              series.legendSettings.labelText = "[{color}]{name}[/]";
            series.stacked = options.series.stacked; //stack columns top of each other
          } else if (type === "Radar") {
            series = xyChart.series.push(new am4charts.RadarSeries());
            series.dataFields.valueY = field;
            series.dataFields.categoryX = "category";
            series.name = name;
            if (options.legend.colorize)
              series.legendSettings.labelText = "[{color}]{name}[/]";
            series.strokeWidth = options.series.strokeWidth;
          }
          return series;
        }
        for (const field in data[0]) {
          if (field !== "category")
            createSeries(field, options.fieldNames[field]); // name will get from user
        }
      } else if (type === "Bubble") {
        // Create Axis
        let valueAxisX = xyChart.xAxes.push(new am4charts.ValueAxis());
        valueAxisX.renderer.ticks.template.disabled = true;
        valueAxisX.renderer.axisFills.template.disabled = true;
        let valueAxisY = xyChart.yAxes.push(new am4charts.ValueAxis());
        valueAxisY.renderer.ticks.template.disabled = true;
        valueAxisY.renderer.axisFills.template.disabled = true;

        // Create series
        series = xyChart.series.push(new am4charts.LineSeries());
        series.dataFields.valueX = "x";
        series.dataFields.valueY = "y";
        series.dataFields.value = "value";
        series.strokeOpacity = 0;
        series.sequencedInterpolation = true;
        series.tooltip.pointerOrientation = "vertical";

        let bullet = series.bullets.push(new am4core.Circle());
        bullet.fill = am4core.color("#ff0000");
        bullet.propertyFields.fill = "color";
        bullet.strokeOpacity = 0;
        bullet.strokeWidth = 2;
        bullet.fillOpacity = 0.5;
        bullet.stroke = am4core.color("#ffffff");
        bullet.hiddenState.properties.opacity = 0;
        bullet.tooltipText = "[bold]:{title}[/]\nتعداد موتور: {value.value}";

        let outline = xyChart.plotContainer.createChild(am4core.Circle);
        outline.fillOpacity = 0;
        outline.strokeOpacity = 0.8;
        outline.stroke = am4core.color("#ff0000");
        outline.strokeWidth = 2;
        outline.hide(0);

        let blurFilter = new am4core.BlurFilter();
        outline.filters.push(blurFilter);

        bullet.events.on("over", function (event) {
          let target = event.target;
          outline.radius = target.pixelRadius + 2;
          outline.x = target.pixelX;
          outline.y = target.pixelY;
          outline.show();
        });

        bullet.events.on("out", function (event) {
          outline.hide();
        });

        let hoverState = bullet.states.create("hover");
        hoverState.properties.fillOpacity = 1;
        hoverState.properties.strokeOpacity = 1;

        series.heatRules.push({
          target: bullet,
          min: 10,
          max: 80,
          property: "radius",
        });

        bullet.adapter.add("tooltipY", function (tooltipY, target) {
          return -target.radius;
        });
      }

      if (options.xyCursor) {
        xyChart.cursor = new am4charts.XYCursor();
        xyChart.cursor.behavior = "zoomXY";
        // xyChart.cursor.snapToSeries = series;  // stick cursor to series bullet
        xyChart.scrollbarX = new am4core.Scrollbar();
        xyChart.scrollbarY = new am4core.Scrollbar();
      }

      if (options.legend.display) {
        xyChart.legend = new am4charts.Legend();
        xyChart.legend.position = options.legend.position;
        xyChart.legend.valueLabels.template.align = "right";
        xyChart.legend.valueLabels.template.textAlign = "end";
        xyChart.legend.reverseOrder = true; //rtl
        // xyChart.legend.itemContainers.template.reverseOrder = true; //rtl
        xyChart.legend.paddingTop = 0;
        xyChart.legend.paddingBottom = 0;
        xyChart.legend.scrollable = true;
      }

      /*
       * ========================================================
       *              Enabling responsive features
       * ========================================================
       */
      var state;
      xyChart.responsive.rules.push({
        relevant: function (target) {
          if (target.pixelWidth <= 546) {
            return true;
          }
          return false;
        },
        state: function (target, stateId) {
          if (type === "Line" || type === "Bubble" || type === "Column") {
            if (target instanceof am4charts.Chart) {
              state = target.states.create(stateId);
              state.properties.paddingLeft = 1;
              state.properties.paddingRight = 1;
              return state;
            }

            if (
              target instanceof am4charts.AxisLabel &&
              target.parent instanceof am4charts.AxisRendererX
            ) {
              state = target.states.create(stateId);
              state.properties.disabled = true;
              return state;
            }
          } else if (type === "Radar") {
            if (target instanceof am4charts.Chart) {
              state = target.states.create(stateId);
              state.properties.paddingTop = -20;
              state.properties.paddingRight = 1;
              state.properties.paddingBottom = -20;
              state.properties.paddingLeft = 1;
              return state;
            }

            if (target instanceof am4charts.AxisLabel) {
              state = target.states.create(stateId);
              state.properties.disabled = true;
              return state;
            }
          }
          return null;
        },
      });
      xyChart.responsive.rules.push({
        relevant: function (target) {
          if (target.pixelWidth <= 500) {
            return true;
          }
          return false;
        },
        state: function (target, stateId) {
          if (type === "Line" || type === "Bubble" || type === "Column") {
            if (target instanceof am4charts.Chart) {
              state = target.states.create(stateId);
              state.properties.paddingLeft = 1;
              state.properties.paddingRight = 1;
              return state;
            }

            if (target instanceof am4charts.AxisRendererY) {
              state = target.states.create(stateId);
              state.properties.inside = true;
              state.properties.maxLabelPosition = 0.99;
              return state;
            }

            if (
              target instanceof am4charts.AxisLabel &&
              target.parent instanceof am4charts.AxisRendererY
            ) {
              state = target.states.create(stateId);
              state.properties.dy = -15;
              state.properties.paddingTop = 3;
              state.properties.paddingRight = 5;
              state.properties.paddingBottom = 3;
              // state.properties.paddingLeft = 5;

              // Create a separate state for background
              target.setStateOnChildren = true;
              var bgstate = target.background.states.create(stateId);
              bgstate.properties.fill = am4core.color("#fff");
              bgstate.properties.fillOpacity = 0.7;

              return state;
            }

            if (
              target instanceof am4charts.AxisLabel &&
              target.parent instanceof am4charts.AxisRendererX
            ) {
              state = target.states.create(stateId);
              state.properties.dy = 0;
              state.properties.paddingTop = 0;
              state.properties.paddingRight = 5;
              state.properties.paddingBottom = 0;
              state.properties.paddingLeft = 5;

              return state;
            }
          } else if (type === "Radar") {
            if (target instanceof am4charts.Chart) {
              state = target.states.create(stateId);
              state.properties.paddingTop = -20;
              state.properties.paddingRight = 1;
              state.properties.paddingBottom = -20;
              state.properties.paddingLeft = 1;
              return state;
            }

            if (target instanceof am4charts.AxisLabel) {
              state = target.states.create(stateId);
              state.properties.disabled = true;
              return state;
            }

            if (target instanceof am4charts.Legend) {
              state = target.states.create(stateId);
              state.properties.disabled = false;
              return state;
            }
          }

          if (target instanceof am4core.Scrollbar) {
            state = target.states.create(stateId);
            state.properties.marginLeft = -10;
            return state;
          }

          if (target instanceof am4charts.Legend) {
            state = target.states.create(stateId);
            state.properties.disabled = true;
            return state;
          }

          return null;
        },
      });
      xyChart.responsive.rules.push({
        relevant: function (target) {
          if (target.pixelHeight <= 355) {
            return true;
          }
          return false;
        },
        state: function (target, stateId) {
          if (target instanceof am4core.Scrollbar) {
            state = target.states.create(stateId);
            state.properties.marginBottom = -10;
            return state;
          }

          if (target instanceof am4charts.Legend) {
            state = target.states.create(stateId);
            // state.properties.position = "right";
            // state.properties.paddingTop = -25;
            state.properties.disabled = true;
            return state;
          }

          return null;
        },
      });
      xyChart.responsive.rules.push({
        relevant: am4core.ResponsiveBreakpoints.heightS,
        state: function (target, stateId) {
          if (target instanceof am4charts.Chart) {
            state = target.states.create(stateId);
            state.properties.paddingBottom = 10;
            return state;
          }

          if (
            target instanceof am4charts.AxisLabel &&
            target.parent instanceof am4charts.AxisRendererX
          ) {
            state = target.states.create(stateId);
            state.properties.disabled = true;
            return state;
          }
          if (type === "Radar") {
            if (target instanceof am4charts.Chart) {
              state = target.states.create(stateId);
              state.properties.paddingTop = -20;
              state.properties.paddingRight = 1;
              state.properties.paddingBottom = -20;
              state.properties.paddingLeft = 1;
              return state;
            }
            if (target instanceof am4charts.AxisLabel) {
              state = target.states.create(stateId);
              state.properties.disabled = true;
              return state;
            }
          }
          return null;
        },
      });
    }
  }, [props.chartId, props.chartProps, themeState.isDark]);

  return (
    <div id={props.chartId} style={{ width: "100%", height: "100%" }}></div>
  );
});

const areEqual = (prevProps, nextProps) => {
  if (prevProps.chartProps && nextProps.chartProps) {
    if (prevProps.chartProps.data !== nextProps.chartProps.data) {
      return false;
    } else if (prevProps.chartProps.options !== nextProps.chartProps.options)
      return false;
    else if (prevProps.chartProps.type !== nextProps.chartProps.type)
      return false;
    else if (prevProps.chartProps.title !== nextProps.chartProps.title)
      return true;
  }
  return false;
};

export default React.memo(XYChart, areEqual);

// export default XYChart;

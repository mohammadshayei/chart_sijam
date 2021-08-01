import React, { useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
// import am4themes_material from "@amcharts/amcharts4/themes/material";
// import am4themes_microchart from "@amcharts/amcharts4/themes/microchart";

am4core.useTheme(am4themes_animated);
// am4core.useTheme(am4themes_material);
// am4core.useTheme(am4themes_microchart);
am4core.addLicense("ch-custom-attribution");

const XYChart = React.memo((props) => {
  const { data, type, options } = props.chartProps;
  let xyChart;
  useEffect(() => {
    if (props.chartId) {
      type === "Radar"
        ? (xyChart = am4core.create(`${props.chartId}`, am4charts.RadarChart))
        : (xyChart = am4core.create(`${props.chartId}`, am4charts.XYChart));
      let series;
      xyChart.data = data;
      if (type === "Line" || type === "Column" || type === "Radar") {
        // Create axes
        var categoryAxis = xyChart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "category"; //dataField category
        categoryAxis.renderer.grid.template.location =
          options.xAxes.gridTemplateLocation;
        categoryAxis.renderer.minGridDistance = options.xAxes.minGridDistance;

        var valueAxis = xyChart.yAxes.push(new am4charts.ValueAxis());

        // Create series
        function createSeries(field, name) {
          if (type === "Line") {
            series = xyChart.series.push(new am4charts.LineSeries());
            // var series = xyChart.series.push(new am4charts.OHLCSeries());          //OHLC
            // var series = xyChart.series.push(new am4charts.StepLineSeries());      //stepLine
            series.dataFields.valueY = field;
            series.dataFields.categoryX = "category";
            series.name = name;
            // series.tooltipText = "{dateX}: [b]{valueY}[/]";
            series.strokeWidth = options.series.strokeWidth;
            series.smoothing = options.series.smoothing;
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
            series.stacked = options.series.stacked; //stack columns top of each other
          } else if (type === "Radar") {
            series = xyChart.series.push(new am4charts.RadarSeries());
            series.dataFields.valueY = field;
            series.dataFields.categoryX = "category";
            series.name = name;
            series.strokeWidth = options.series.strokeWidth;
          }
          return series;
        }
        createSeries("field1", options.fieldNames.field1); // name will get from user
        createSeries("field2", options.fieldNames.field2);
        createSeries("field3", options.fieldNames.field3);
        createSeries("field4", options.fieldNames.field4);
        createSeries("field5", options.fieldNames.field5); // & ...
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
      }
    }
  }, [props.chartId, props.chartProps]);

  return (
    <div id={props.chartId} style={{ width: "100%", height: "100%" }}></div>
  );
});

export default XYChart;

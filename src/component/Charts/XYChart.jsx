import React, { useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_material from "@amcharts/amcharts4/themes/material";
import am4themes_microchart from "@amcharts/amcharts4/themes/microchart";

// am4core.useTheme(am4themes_animated);
// am4core.useTheme(am4themes_material);
// am4core.useTheme(am4themes_microchart);
am4core.addLicense("ch-custom-attribution");

const XYChart = (props) => {
  let xyChart;
  useEffect(() => {
    if (props.chartId) {
      props.xyType === "Radar"
        ? (xyChart = am4core.create(`${props.chartId}`, am4charts.RadarChart))
        : (xyChart = am4core.create(`${props.chartId}`, am4charts.XYChart));
      xyChart.data = props.data;
      // Create axes
      var categoryAxis = xyChart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "date";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 30;

      var valueAxis = xyChart.yAxes.push(new am4charts.ValueAxis());

      // Create series
      function createSeries(field, name) {
        if (props.xyType === "Line") {
          var series = xyChart.series.push(new am4charts.LineSeries());
          // var series = xyChart.series.push(new am4charts.OHLCSeries());          //OHLC
          // var series = xyChart.series.push(new am4charts.StepLineSeries());      //stepLine
          series.dataFields.valueY = field;
          series.dataFields.categoryX = "date";
          series.name = name;
          // series.tooltipText = "{dateX}: [b]{valueY}[/]";
          series.strokeWidth = 2;
          series.smoothing = "monotoneX";
          // var bullet = series.bullets.push(new am4charts.CircleBullet());
          // bullet.circle.stroke = am4core.color("#fff");
          // bullet.circle.strokeWidth =5;
        } else if (props.xyType === "Column") {
          // var series = xyChart.series.push(new am4charts.CandlestickSeries());
          var series = xyChart.series.push(new am4charts.ColumnSeries());
          // var series = xyChart.series.push(new am4charts.ColumnSeries3D());
          // var series = xyChart.series.push(new am4charts.ConeSeries());
          // var series = xyChart.series.push(new am4charts.CurvedColumnSeries());
          series.dataFields.valueY = field;
          series.dataFields.categoryX = "date";
          series.name = name;
          // series.stacked = true;      //stack columns top of each other
        } else if (props.xyType === "Radar") {
          var series = xyChart.series.push(new am4charts.RadarSeries());
          series.dataFields.valueY = field;
          series.dataFields.categoryX = "date";
          series.name = name;
          series.strokeWidth = 2;
        }
        return series;
      }
      createSeries("md110", "md110");
      createSeries("md550", "md550");
      createSeries("md275", "md275");
      createSeries("md200", "md200");
      createSeries("md35", "md35");

      xyChart.legend = new am4charts.Legend();
    }
  }, [props.chartId]);

  return (
    <div id={props.chartId} style={{ width: "100%", height: "100%" }}></div>
  );
};

export default XYChart;

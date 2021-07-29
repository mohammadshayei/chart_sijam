import React, { useState, useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
// import am4themes_animated from "@amcharts/amcharts4/themes/animated";
// import am4themes_material from "@amcharts/amcharts4/themes/material";
// import am4themes_microchart from "@amcharts/amcharts4/themes/microchart";

// am4core.useTheme(am4themes_animated);
// am4core.useTheme(am4themes_material);
// am4core.useTheme(am4themes_microchart);
am4core.addLicense("ch-custom-attribution");

const GaugeChart = (props) => {
  const [beforeValue, setBeforeValue] = useState(props.data.score);
  let chart;
  useEffect(() => {
    chart = am4core.create(`${props.chartId}`, am4charts.GaugeChart);
    chart.innerRadius = am4core.percent(82);
    // Create normal axis
    let axis = chart.xAxes.push(new am4charts.ValueAxis());
    axis.min = 0;
    axis.max = 500;
    axis.strictMinMax = true;
    axis.renderer.radius = am4core.percent(80);
    axis.renderer.inside = true;
    axis.renderer.line.strokeOpacity = 1;
    axis.renderer.ticks.template.disabled = false;
    axis.renderer.ticks.template.strokeOpacity = 1;
    axis.renderer.ticks.template.length = 10;
    axis.renderer.grid.template.disabled = true;
    axis.renderer.labels.template.radius = 40;

    //  Axis for ranges
    let colorSet = new am4core.ColorSet();

    let axis2 = chart.xAxes.push(new am4charts.ValueAxis());
    axis2.min = 0;
    axis2.max = 500;
    axis2.strictMinMax = true;
    axis2.renderer.labels.template.disabled = true;
    axis2.renderer.ticks.template.disabled = true;
    axis2.renderer.grid.template.disabled = true;

    //  Ranges
    let range0 = axis2.axisRanges.create();
    range0.value = 0;
    range0.endValue = 250;
    range0.axisFill.fillOpacity = 1;
    range0.axisFill.fill = colorSet.getIndex(0);

    let range1 = axis2.axisRanges.create();
    range1.value = 250;
    range1.endValue = 500;
    range1.axisFill.fillOpacity = 1;
    range1.axisFill.fill = colorSet.getIndex(2);

    let label = chart.radarContainer.createChild(am4core.Label);
    label.isMeasured = false;
    label.fontSize = 45;
    label.x = am4core.percent(100);
    label.y = am4core.percent(100);
    label.horizontalCenter = "middle";
    label.verticalCenter = "bottom";
    label.text = "0";

    // Hand
    let hand = chart.hands.push(new am4charts.ClockHand());
    hand.axis = axis2;
    hand.innerRadius = am4core.percent(50);
    hand.startWidth = 10;
    hand.pin.disabled = true;
    hand.value = beforeValue;
    setBeforeValue(props.data.score);

    hand.events.on("propertychanged", function (ev) {
      range0.endValue = ev.target.value;
      range1.value = ev.target.value;
      label.text = axis2.positionToValue(hand.currentPosition).toFixed(0);
      axis2.invalidate();
    });
    setInterval(function () {
      let value = props.data.score;
      let animation = new am4core.Animation(
        hand,
        {
          property: "value",
          to: value,
        },
        1000,
        am4core.ease.cubicOut
      ).start();
    }, 1000);
  }, [props.data]);

  return (
    <div id={props.chartId} style={{ width: "100%", height: "100%" }}></div>
  );
};

export default GaugeChart;

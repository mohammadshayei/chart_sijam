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

const PieChart = (props) => {
  let pieChart;
  useEffect(() => {
    pieChart = am4core.create(`${props.chartId}`, am4charts.PieChart);
    pieChart.data = props.data;
    // cut a hole in Pie chart
    pieChart.innerRadius = am4core.percent(50);
    // animate hole in pie when showing
    pieChart.hiddenState.properties.innerRadius = am4core.percent(50);
    pieChart.hiddenState.properties.radius = am4core.percent(100);
    // make a half circle
    pieChart.startAngle = 180;
    pieChart.endAngle = 360;
    pieChart.radius = am4core.percent(70); //something like padding
    // Add and configure Series
    let pieSeries = pieChart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "erja";
    pieSeries.dataFields.category = "motor";
    // ticks and labels
    pieSeries.alignLabels = false; //label ha amoodi align mihsan
    pieSeries.labels.template.bent = true; //chasbidan label ha be slice
    pieSeries.labels.template.radius = -20; // or: am4core.percent(-40); for get inside
    // pieSeries.labels.template.relativeRotation = 90; // degree of labels
    pieSeries.labels.template.padding(0, 0, 0, 0);
    pieSeries.labels.template.disabled = false; //label ha hide mishan
    pieSeries.labels.template.text = "{category}"; //also : "{value.percent.formatNumber('#.0')}%"
    pieSeries.labels.template.fill = am4core.color("#fff");
    pieSeries.ticks.template.disabled = true; //khat az slice ta label
    pieSeries.labels.template.paddingTop = 0;
    pieSeries.labels.template.paddingBottom = 0;
    pieSeries.labels.template.maxWidth = 130;
    pieSeries.labels.template.wrap = true;
    // pieSeries.hiddenState.properties.endAngle = -90; //animation
    pieSeries.labels.template.adapter.add("radius", function (radius, target) {
      if (target.dataItem.values.value.percent < 10) {
        target.fill = am4core.color("#000");
        return 10;
      }
      return radius;
    });
    pieSeries.labels.template.adapter.add("bent", function (bent, target) {
      if (target.dataItem.values.value.percent < 10) {
        target.fill = am4core.color("#000");
        return false;
      }
      return bent;
    });
    // tooltips and slices
    // pieSeries.slices.template.tooltipText = "";  //disables the tooltip
    pieSeries.slices.template.tooltipText = "{category}: {value.value}";
    pieSeries.slices.template.cornerRadius = 10;
    pieSeries.slices.template.innerCornerRadius = 7;
    // pieSeries.slices.template.draggable = true;
    pieSeries.slices.template.inert = true;
    // Add a legend
    pieChart.legend = new am4charts.Legend();
    pieChart.legend.position = "right";
    pieChart.legend.valueLabels.template.text = " : {value}";
    // sum labels inside doughnut
    var label = pieSeries.createChild(am4core.Label);
    label.text = "{values.value.sum}";
    label.horizontalCenter = "middle";
    label.verticalCenter = "middle";
    label.fontSize = 30;
    // base appearance
    let shadow = pieSeries.slices.template.filters.push(
      new am4core.DropShadowFilter()
    );
    shadow.opacity = 0;
    // hover appearance
    let hoverState = pieSeries.slices.template.states.getKey("hover");
    let hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter());
    hoverShadow.opacity = 0.7;
    hoverShadow.blur = 5;
  }, [props.chartId]);
  return (
    <div id={props.chartId} style={{ width: "100%", height: "100%" }}></div>
  );
};

export default PieChart;

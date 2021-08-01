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
am4core.options.autoDispose = true;

const PieChart = React.memo((props) => {
  const { data, type, options } = props.chartProps;
  let pieChart;
  useEffect(() => {
    pieChart = am4core.create(`${props.chartId}`, am4charts.PieChart);
    pieChart.data = data;
    if (type === "Doughnut") {
      // cut a hole in Pie chart
      pieChart.innerRadius = am4core.percent(options.innerRadius);
      // animate hole in pie when showing
      pieChart.hiddenState.properties.innerRadius = am4core.percent(
        options.innerRadius
      );
      pieChart.hiddenState.properties.radius = am4core.percent(100);
    }
    // make a half circle
    pieChart.startAngle = options.startAngle;
    pieChart.endAngle = options.endAngle;
    pieChart.radius = am4core.percent(options.radius); //something like padding
    // Add and configure Series
    let pieSeries = pieChart.series.push(new am4charts.PieSeries());
    pieSeries.hiddenState.transitionDuration = 5000;
    pieSeries.dataFields.value = "value";
    pieSeries.dataFields.category = "category";
    // ticks and labels
    pieSeries.alignLabels = options.series.alignLabels;
    pieSeries.labels.template.bent = options.series.labels.bent;
    pieSeries.labels.template.radius = options.series.labels.radius; // or: am4core.percent(-40); for get inside
    if (options.series.labels.radius < 0) {
      pieSeries.labels.template.adapter.add(
        "radius",
        function (radius, target) {
          //  keep labels out of chart
          if (target.dataItem.values.value.percent < 10) {
            target.fill = am4core.color("#000");
            return 10;
          }
          return radius;
        }
      );
    }
    if (options.series.labels.bent) {
      //  keep labels striate
      pieSeries.labels.template.adapter.add("bent", function (bent, target) {
        if (target.dataItem.values.value.percent < 10) {
          target.fill = am4core.color("#000");
          return false;
        }
        return bent;
      });
    }
    // pieSeries.labels.template.relativeRotation = 90; // degree of labels
    pieSeries.labels.template.padding(
      options.series.labels.padding,
      options.series.labels.padding,
      options.series.labels.padding,
      options.series.labels.padding
    );
    pieSeries.labels.template.disabled = options.series.labels.disabled; //label ha hide mishan
    pieSeries.labels.template.text = options.series.labels.text; //also : "{value.percent.formatNumber('#.0')}%"
    pieSeries.labels.template.fill = am4core.color(options.series.labels.color);
    pieSeries.ticks.template.disabled = true; //khat az slice ta label
    pieSeries.labels.template.maxWidth = options.series.labels.maxWidth;
    pieSeries.labels.template.wrap = options.series.labels.wrap;
    // pieSeries.hiddenState.properties.endAngle = -90; //animation
    // tooltips and slices
    options.slices.tooltip.display
      ? (pieSeries.slices.template.tooltipText = options.slices.tooltip.text)
      : (pieSeries.slices.template.tooltipText = "");
    pieSeries.slices.template.cornerRadius = options.slices.cornerRadius;
    pieSeries.slices.template.innerCornerRadius =
      options.slices.innerCornerRadius;
    pieSeries.slices.template.draggable = options.slices.draggable;
    pieSeries.slices.template.inert = true;
    // Add a legend
    if (options.legend.display) {
      pieChart.legend = new am4charts.Legend();
      pieChart.legend.position = options.legend.position;
      pieChart.legend.valueLabels.template.text =
        options.legend.valueLabelsText;
    }
    // sum labels inside doughnut
    if (options.insideLabel) {
      var label = pieSeries.createChild(am4core.Label);
      label.text = "{values.value.sum}";
      label.horizontalCenter = "middle";
      label.verticalCenter = "middle";
      label.fontSize = 30;
    }
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
  }, [props.chartId, props.chartProps]);
  return (
    <div id={props.chartId} style={{ width: "100%", height: "100%" }}></div>
  );
});

export default PieChart;

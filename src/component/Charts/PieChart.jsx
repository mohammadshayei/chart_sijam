import React, { useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import { useTheme } from "../../styles/ThemeProvider.js";
import am4themes_kelly from "@amcharts/amcharts4/themes/kelly";
// import am4themes_frozen from "@amcharts/amcharts4/themes/frozen";
// import am4themes_microchart from "@amcharts/amcharts4/themes/microchart";

am4core.useTheme(am4themes_animated);
// am4core.useTheme(am4themes_microchart);
am4core.addLicense("ch-custom-attribution");
am4core.options.autoDispose = true;

const PieChart = React.memo((props) => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;
  const { data, type, options } = props.chartProps;
  let pieChart;
  useEffect(() => {
    themeState.isDark
      ? am4core.useTheme(am4themes_dark)
      : am4core.useTheme(am4themes_kelly);
    pieChart = am4core.create(`${props.chartId}`, am4charts.PieChart);
    pieChart.rtl = true;
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
    pieChart.responsive.enabled = true;
    pieChart.responsive.useDefault = true;
    // make a half circle
    pieChart.startAngle = options.startAngle;
    pieChart.endAngle = options.endAngle;
    pieChart.radius = am4core.percent(options.radius); //something like padding
    // Add and configure Series
    let pieSeries = pieChart.series.push(new am4charts.PieSeries());
    pieSeries.hiddenState.transitionDuration = 5000;
    pieSeries.dataFields.value = "field1";
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
            target.fill = theme.on_surface;
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
          target.fill = theme.on_surface;
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
      pieChart.legend.valueLabels.template.align = "right";
      pieChart.legend.valueLabels.template.textAlign = "end";
      pieChart.legend.reverseOrder = true; //rtl
      pieChart.legend.itemContainers.template.reverseOrder = true; //rtl
      pieChart.legend.maxHeight = undefined;
      pieChart.legend.maxWidth = undefined;
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

    /*
     * ========================================================
     *              Enabling responsive features
     * ========================================================
     */

    pieChart.responsive.rules.push({
      relevant: am4core.ResponsiveBreakpoints.maybeXS,
      state: function (target, stateId) {
        if (target instanceof am4charts.PieSeries) {
          var state = target.states.create(stateId);

          var labelState = target.labels.template.states.create(stateId);
          labelState.properties.disabled = true;

          var tickState = target.ticks.template.states.create(stateId);
          tickState.properties.disabled = true;

          return state;
        }
        if (target instanceof am4charts.Legend) {
          var state = target.states.create(stateId);
          state.properties.disabled = true;
          return state;
        }

        return null;
      },
    });
    pieChart.responsive.rules.push({
      relevant: function (target) {
        if (target.pixelHeight <= 300) {
          return true;
        }
        return false;
      },
      state: function (target, stateId) {
        if (target instanceof am4charts.Legend) {
          var state = target.states.create(stateId);
          state.properties.position = "right";
          state.properties.paddingTop = 0;
          return state;
        }
        return null;
      },
    });
  }, [props.chartId, props.chartProps, themeState.isDark]);
  return (
    <div id={props.chartId} style={{ width: "100%", height: "100%" }}></div>
  );
});

const areEqual = (prevProps, nextProps) => {
  if (prevProps.chartProps && nextProps.chartProps) {
    if (prevProps.chartProps.data !== nextProps.chartProps.data) return false;
    else if (prevProps.chartProps.options !== nextProps.chartProps.options)
      return false;
    else if (prevProps.chartProps.type !== nextProps.chartProps.type)
      return false;
    else return true;
  }
  return false;
};

export default React.memo(PieChart, areEqual);

// export default PieChart;

import React, { useState, useEffect } from "react";
import XYChart from "./Charts/XYChart.jsx";
import PieChart from "./Charts/PieChart";
import GaugeChart from "./Charts/GaugeChart";

const ChartBlock = (props) => {
  const [chart, setChart] = useState(null);
  useEffect(() => {
    switch (props.chartProps.type) {
      case "Line":
      case "Column":
      case "Bubble":
      case "Radar":
        setChart(
          <XYChart chartId={props.chartId} chartProps={props.chartProps} />
        );
        break;
      case "Pie":
      case "Doughnut":
        setChart(
          <PieChart chartId={props.chartId} chartProps={props.chartProps} />
        );
        break;
      case "Gauge":
        setChart(
          <GaugeChart chartId={props.chartId} chartProps={props.chartProps} />
        );
        break;
      default:
        setChart(<div>mismatch type!</div>);
    }
  }, [props.chartProps]);

  return chart;
};

export default ChartBlock;

// case "TreeMap":
//   chart = am4core.create("chartdiv", am4charts.TreeMap);
//   break;
// case "SankeyDiagram":
//   chart = am4core.create("chartdiv", am4charts.SankeyDiagram);
//   break;
// case "ChordDiagram":
//   chart = am4core.create("chartdiv", am4charts.ChordDiagram);
//   break;
// case "SlicedChart":
//   chart = am4core.create("chartdiv", am4charts.SlicedChart);
//   break;
// case "Sunburst":
//   chart = am4core.create("chartdiv", am4plugins_sunburst.Sunburst);
//   break;
// case "ForceDirectedTree":
//   chart = am4core.create(
//     "chartdiv",
//     am4plugins_forceDirected.ForceDirectedTree
//   );
//   break;
// case "VennDiagram":
//   chart = am4core.create("chartdiv", am4plugins_venn.VennDiagram);
//   break;
// case "CurveChart":         //TimeLine
//   chart = am4core.create("chartdiv", am4plugins_timeline.CurveChart);
//   break;

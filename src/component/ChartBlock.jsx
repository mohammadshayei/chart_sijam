import React from "react";
import XYChart from "./Charts/XYChart.jsx";
import PieChart from "./Charts/PieChart";
import GaugeChart from "./Charts/GaugeChart";

const ChartBlock = (props) => {
  switch (props.type) {
    case "Line":
      return (
        <XYChart
          xyType={props.type}
          chartId={props.chartId}
          data={props.data}
        />
      );
    case "Column":
      return (
        <XYChart
          xyType={props.type}
          chartId={props.chartId}
          data={props.data}
        />
      );
    case "Radar":
      return (
        <XYChart
          xyType={props.type}
          chartId={props.chartId}
          data={props.data}
        />
      );
    case "Pie":
      return <PieChart chartId={props.chartId} data={props.data} />;
    case "Gauge":
      return <GaugeChart chartId={props.chartId} data={props.data} />;

    default:
      return <div>mismatch type!</div>;
  }
};

export default ChartBlock;

// case "TreeMap":
//   chart = am4core.create("chartdiv", am4charts.TreeMap);
//   break;
// case "SankeyDiagram":
//   chart = am4core.create("chartdiv", am4charts.SankeyDiagram);
//   break;
// case "Gauge":
//   chart = am4core.create("chartdiv", am4charts.GaugeChart);
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

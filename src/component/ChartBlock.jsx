import React, { useState, useEffect } from "react";
import XYChart from "./Charts/XYChart.jsx";
import PieChart from "./Charts/PieChart";
import GaugeChart from "./Charts/GaugeChart";
import { useSelector } from "react-redux";

const ChartBlock = (props) => {
  const [chart, setChart] = useState(null);
  const [data, setData] = useState(null);
  const chartData = useSelector((state) => state.addChart.chartData);
  useEffect(() => {
    if (chartData.data.data) {
      setData({
        title: chartData.title,
        type: chartData.type,
        data: chartData.data.data,
        options: chartData.data.options,
      });
    }
  }, [chartData]);

  useEffect(() => {
    if (data) {
      switch (data.type) {
        case "Line":
        case "Column":
        case "Bubble":
        case "Radar":
          setChart(<XYChart chartProps={data} />);
          break;
        case "Pie":
        case "Doughnut":
          setChart(<PieChart chartProps={data} />);
          break;
        case "Gauge":
          setChart(<GaugeChart chartProps={data} />);
          break;
        default:
          setChart(<div>mismatch type!</div>);
      }
    }
  }, [data]);

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

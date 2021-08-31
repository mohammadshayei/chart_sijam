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
        title: "کارایی",
        type: "Column",
        data: chartData.data.data,
        options: {
          fieldNames: {
            field1: "شرح سند",
          },
          legend: { display: true },
          xyCursor: false,
          xAxes: { minGridDistance: 30, gridTemplateLocation: 0 },
          series: {
            stacked: true,
            strokeWidth: 2,
            smoothing: "monotoneX",
            bullet: {
              display: true,
              strokeColor: "#fff",
              strokeWidth: 0,
            },
          },
        },
      });
    }
  }, [chartData]);

  useEffect(() => {
    if (data) {
      console.log(data.type);
      switch (data.type) {
        case "Line":
        case "Column":
        case "Bubble":
        case "Radar":
          setChart(<XYChart chartProps={data} />);
          break;
        case "Pie":
        case "Doughnut":
          setChart(<PieChart chartProps={props.chartProps} />);
          break;
        case "Gauge":
          setChart(<GaugeChart chartProps={props.chartProps} />);
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

import React, { useState, useEffect } from "react";
import XYChart from "./Charts/XYChart.jsx";
import PieChart from "./Charts/PieChart";
import GaugeChart from "./Charts/GaugeChart";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";

const ChartBlock = React.memo((props) => {
  const [chart, setChart] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const location = useLocation();

  const chartData = useSelector((state) => state.addChart.chartData);

  useEffect(() => {
    if (location.pathname === "/create_chart") {
      setLoading(".لطفا فیلد های مورد نظر را انتخاب کنید");
      if (chartData.data.data) {
        setData({
          title: chartData.title,
          type: chartData.type,
          data: chartData.data.data,
          options: chartData.data.options,
        });
      }
    } else {
      setLoading("Loading...");
      if (props.chartProps) {
        setData(props.chartProps);
      }
    }
  }, [chartData, props.chartProps]);

  useEffect(() => {
    if (data) {
      switch (data.type) {
        case "Line":
        case "Column":
        case "Bubble":
        case "Radar":
          setChart(<XYChart chartId={props.chartId} chartProps={data} />);
          break;
        case "Pie":
        case "Doughnut":
          setChart(<PieChart chartId={props.chartId} chartProps={data} />);
          break;
        case "Gauge":
          setChart(<GaugeChart chartId={props.chartId} chartProps={data} />);
          break;
        default:
          setChart(<div>mismatch type!</div>);
      }
    }
  }, [data]);

  return data && data.data.length > 0 ? (
    chart
  ) : (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      {loading}
    </div>
  );
});

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

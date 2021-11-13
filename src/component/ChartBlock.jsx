import React, { useState, useEffect } from "react";
import XYChart from "./Charts/XYChart.jsx";
import PieChart from "./Charts/PieChart";
import GaugeChart from "./Charts/GaugeChart";
import { useSelector } from "react-redux";
import SkeletonChart from "../component/Skeletons/SkeletonChart";

const ChartBlock = React.memo((props) => {
  const [chart, setChart] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);

  const chartData = useSelector((state) => state.addChart);

  useEffect(() => {
    if (props.chartId === "123456789") {
      setLoading(<SkeletonChart />);
      setTimeout(() => {
        setLoading(".لطفا فیلد های مورد نظر را انتخاب کنید");
        if (chartData.chartData.data.data) {
          setData({
            title: chartData.chartData.title,
            type: chartData.chartData.type,
            data: chartData.chartData.data.data,
            options: chartData.chartData.data.options,
          });
        }
      }, 1000);
    } else {
      setLoading(<SkeletonChart />);
      if (props.chartProps) {
        setData(props.chartProps);
      }
    }
  }, [chartData, props.chartProps, props.chartId]);

  useEffect(() => {
    if (data) {
      let newChart;
      switch (data.type) {
        case "Line":
        case "Column":
        case "Bubble":
        case "Radar":
          newChart = <XYChart chartId={props.chartId} chartProps={data} />;
          break;
        case "Pie":
        case "Doughnut":
          newChart = <PieChart chartId={props.chartId} chartProps={data} />;
          break;
        case "Gauge":
          newChart = <GaugeChart chartId={props.chartId} chartProps={data} />;
          break;
        default:
          newChart = <div>mismatch type!</div>;
      }
      setChart(newChart);
    }
  }, [data, props.chartId]);

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

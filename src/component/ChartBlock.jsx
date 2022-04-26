import React, { useState, useEffect } from "react";
import XYChart from "./Charts/XYChart.jsx";
import PieChart from "./Charts/PieChart";
import GaugeChart from "./Charts/GaugeChart";
import { useSelector } from "react-redux";
import SkeletonChart from "../component/Skeletons/SkeletonChart";
import NewChart from "./Charts/NewChart.jsx";

const ChartBlock = React.memo(({ chartId, type, options, data }) => {
  const [chart, setChart] = useState(null);
  const [sentData, setSentData] = useState(null);
  const [loading, setLoading] = useState(null);

  const chartData = useSelector((state) => state.addChart);

  let dependType = chartData?.chartData?.type,
    dependData = chartData?.chartData?.data?.data,
    dependOptions = chartData?.chartData?.data?.options;


  useEffect(() => {
    if (chartId === "123456789") {
      if (chartData.chartData.data.data.length > 0) {
        setLoading(<SkeletonChart />);
        setTimeout(() => {
          setSentData({
            type: chartData.chartData.type,
            data: chartData.chartData.data.data,
            options: chartData.chartData.data.options,
          });
        }, 100);
      }
      else
        setLoading(".لطفا فیلد های مورد نظر را انتخاب کنید");
    } else {
      setLoading(<SkeletonChart />);
      if (chartId) {
        setSentData({
          type,
          data,
          options,
        });
      }
    }
  }, [dependType, dependData, dependOptions, type, chartId]);

  useEffect(() => {
    if (sentData) {
      let newChart;
      switch (sentData.type) {
        case "Line":
        case "Column":
        case "Bubble":
        case "Pie":
        case "Radar":
          newChart = <NewChart chartId={chartId} chartProps={sentData} />;
          // newChart = <XYChart chartId={chartId} chartProps={sentData} />;
          break;
        // case "Pie":
        //   newChart = <PieChart chartId={chartId} chartProps={sentData} />;
        //   break;
        case "Gauge":
          newChart = <GaugeChart chartId={chartId} chartProps={sentData} />;
          break;
        default:
          newChart = <div>mismatch type!</div>;
      }
      setChart(newChart);
    }
  }, [sentData]);

  return sentData && sentData.data.length > 0 ? (
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

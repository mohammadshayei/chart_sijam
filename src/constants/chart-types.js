import {
  FcBarChart,
  FcLineChart,
  FcDoughnutChart,
  FcPieChart,
  FcRadarPlot,
  // FcScatterPlot,
} from "react-icons/fc";
import { IoSpeedometerOutline } from "react-icons/io5";
import { MdBubbleChart } from "react-icons/md";

export const chartTypes = [
  {
    name: "ستونی",
    id: "Column",
    icon: <FcBarChart />,
  },
  {
    name: "حبابی",
    id: "Bubble",
    icon: <MdBubbleChart />,
  },
  {
    name: "دونات",
    id: "Doughnut",
    icon: <FcDoughnutChart />,
  },
  {
    name: "خطی",
    id: "Line",
    icon: <FcLineChart />,
  },
  {
    name: "دایره ای",
    id: "Pie",
    icon: <FcPieChart />,
  },
  {
    name: "مساحت قطبی",
    id: "Radar",
    icon: <FcPieChart />,
  },
  {
    name: "راداری",
    id: "Radar",
    icon: <FcRadarPlot />,
  },
  {
    name: "گیج",
    id: "Gauge",
    icon: <IoSpeedometerOutline />,
  },
  // {

  //   name: "خط زمانی",
  //   id: "TimeLine",
  // icon:
  // },
];

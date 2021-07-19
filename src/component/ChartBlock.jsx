import React from "react";
import PropTypes from "prop-types";
import {
  Bar,
  Bubble,
  Doughnut,
  Line,
  Pie,
  PolarArea,
  Radar,
  Scatter,
  defaults,
} from "react-chartjs-2";

const ChartBlock = React.memo((props) => {
  switch (props.type) {
    case "Bar":
      return <Bar data={props.data} options={props.options} />;
    case "Bubble":
      return <Bubble data={props.data} options={props.options} />;
    case "Doughnut":
      return <Doughnut data={props.data} options={props.options} />;
    case "Line":
      return <Line data={props.data} options={props.options} />;
    case "Pie":
      return <Pie data={props.data} options={props.options} />;
    case "PolarArea":
      return <PolarArea data={props.data} options={props.options} />;
    case "Radar":
      return <Radar data={props.data} options={props.options} />;
    default:
      return null;
  }
});

ChartBlock.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  options: PropTypes.array.isRequired,
};

export default ChartBlock;

import React from "react";
import "./DetailChartBlock.scss";
import { WidthProvider } from "react-grid-layout";

import ChartBlock from "../ChartBlock.jsx";

const DetailChartBlock = React.memo((props) => {
  return (
    <div className="detail__card">
      <ChartBlock type={props.type} data={props.data} options={props.options} />
    </div>
  );
});

export default WidthProvider(DetailChartBlock);

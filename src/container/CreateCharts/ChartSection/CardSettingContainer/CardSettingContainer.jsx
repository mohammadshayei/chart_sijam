import React from "react";
import "./CardSettingContainer.scss";
import ChartBlock from "./../../../../component/ChartBlock";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

const CardSettingContainer = () => {
  const { id, isEdit, isFullscreen } = useSelector((state) => state.addChart);
  const { data } = useSelector((state) => state.chart);

  return (
    <div className="ChartShowContainer">
      {isFullscreen && !isEdit ?
        <ChartBlock
          chartId={uuidv4().replace(/\-/g, "")}
          type={data[id].type}
          options={data[id].options}
          data={data[id].data}
          mergedData={data[id].mergedData}
          loading={data[id].loading}
        /> :
        <ChartBlock chartId="123456789" />}
    </div>
  );
};

export default CardSettingContainer;

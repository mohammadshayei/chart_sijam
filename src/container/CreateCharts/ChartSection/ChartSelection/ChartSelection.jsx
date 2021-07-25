import React, { useState } from "react";
import { chartsType } from "../../../../constants/chart-types";
import ChartItem from "./ChartItem/ChartItem";
import "./ChartSelection.scss";
const ChartSelection = (props) => {
  const [selected, setSelected] = useState("");
  const onClickHandler = (id) => {
    setSelected(id);
  };
  return (
    <div className="ChartSelectionContainer">
      {chartsType.map((item) => {
        return (
          <ChartItem
            onClick={onClickHandler}
            selected={selected}
            key={item.id}
            data={item}
          />
        );
      })}
    </div>
  );
};

export default ChartSelection;

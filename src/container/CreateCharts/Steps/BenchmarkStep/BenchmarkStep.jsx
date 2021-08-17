import React, { useState } from "react";
import "./BenchmarkStep.scss";
import BenchmarkLine from "./BenchmarkLine.jsx";

const BenchmarkStep = () => {
  let onRemoveHandler;
  const [benchmarkLines, setBenchmarkLines] = useState([
    <BenchmarkLine propKey="0" onRemove={onRemoveHandler} index="0" />,
  ]);
  onRemoveHandler = (index) => {
    let newArray = [...benchmarkLines];
    if (index !== -1) {
      newArray.splice(index, 1);
      setBenchmarkLines(newArray);
    }
  };

  return (
    <div className="settings-field-container">
      <div className="settings-multiple-wrapper">
        <div className="settings-multiple-item-list">
          {benchmarkLines.map((item) => item)}
        </div>
        <div className="settings-multiple-item-footer">
          <button
            className="sijam-style-button"
            onClick={() =>
              setBenchmarkLines([
                ...benchmarkLines,
                <BenchmarkLine
                  propKey={benchmarkLines.length}
                  onRemove={onRemoveHandler}
                  index={benchmarkLines.length}
                />,
              ])
            }
          >
            اضافه کردن خط معیار +
          </button>
        </div>
      </div>
    </div>
  );
};

export default BenchmarkStep;

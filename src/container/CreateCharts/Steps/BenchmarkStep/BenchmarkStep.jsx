import React, { useState } from "react";
import "./BenchmarkStep.scss";
import BenchmarkLine from "./BenchmarkLine.jsx";
import { stringFa } from "../../../../assets/strings/stringFaCollection";
import { useTheme } from "../../../../styles/ThemeProvider";

const BenchmarkStep = () => {
  const [isHover, setIsHover] = useState(false);
  let onRemoveHandler;
  const [benchmarkLines, setBenchmarkLines] = useState([
    <BenchmarkLine propKey="0" onRemove={onRemoveHandler} index="0" />,
  ]);
  const onMouseEnter = () => {
    setIsHover(true);
  };
  const onMouseLeave = () => {
    setIsHover(false);
  };
  const themeState = useTheme();
  const theme = themeState.computedTheme;
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
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            style={{
              color: theme.on_background,
              backgroundColor: isHover
                ? theme.surface_1dp
                : theme.background_color,
            }}
          >
            {stringFa.add_benchmark_line}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BenchmarkStep;

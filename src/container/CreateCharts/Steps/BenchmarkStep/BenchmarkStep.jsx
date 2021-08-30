import React, { useState } from "react";
import "./BenchmarkStep.scss";
import BenchmarkLine from "./BenchmarkLine.jsx";
import { stringFa } from "../../../../assets/strings/stringFaCollection";
import StyledButton from "./../../../../component/UI/Button/StyledButton";
import { useTheme } from "../../../../styles/ThemeProvider.js";

const BenchmarkStep = () => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;
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
          <StyledButton
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
            hover={
              themeState.isDark ? theme.surface_1dp : theme.background_color
            }
          >
            {stringFa.add_benchmark_line}
          </StyledButton>
        </div>
      </div>
    </div>
  );
};

export default BenchmarkStep;

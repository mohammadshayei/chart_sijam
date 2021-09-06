import React, { useState } from "react";
import { stringFa } from "../../../../assets/strings/stringFaCollection.js";
import "./ToolsContainer.scss";
import { FaPlusCircle } from "react-icons/fa";
import { useTheme } from "../../../../styles/ThemeProvider";
import StyledButton from "./../../../UI/Button/StyledButton";
import { useSelector, useDispatch } from "react-redux";
import * as chartActions from "../../../../store/actions/chart.js";
import axios from "axios";
import { baseUrl } from "./../../../../constants/Config";

const ToolsContainer = (props) => {
  const [loading, setLoading] = useState(null);
  const chartsData = useSelector((state) => state.chart);
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  const dispatch = useDispatch();
  const updateChartData = (chartData) => {
    dispatch(chartActions.updateChartData(chartData));
  };

  const creatChartClickHandler = () => {
    props.isModalOpen(true);
  };

  const refreshClickHandler = async () => {
    setLoading(
      <div class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
    let result;
    for (const chartId in chartsData.data) {
      result = await axios.post(`${baseUrl}api/get_chart`, {
        id: chartId,
      });
      if (result) {
        updateChartData({
          chartId,
          chartData: result.data.message.result,
          lastUpdate: new Date(),
        });
      }
    }
    setLoading(null);
  };

  return (
    <div className="tools-container">
      {chartsData.editMode && (
        <StyledButton
          onClick={creatChartClickHandler}
          hover={
            themeState.isDark ? theme.surface_12dp : theme.background_color
          }
        >
          <div className="button-text">
            {stringFa.create_chart}
            <div className="button-icon" style={{ color: theme.primary }}>
              <FaPlusCircle />
            </div>
          </div>
        </StyledButton>
      )}
      {chartsData.editMode && (
        <div
          className="divider"
          style={{ borderColor: theme.border_color }}
        ></div>
      )}
      {loading ? (
        loading
      ) : (
        <StyledButton
          onClick={refreshClickHandler}
          hover={
            themeState.isDark ? theme.surface_12dp : theme.background_color
          }
        >
          <div className="button-text">{stringFa.refresh_charts}</div>
        </StyledButton>
      )}
    </div>
  );
};

export default ToolsContainer;

import React, { useState } from "react";
import { stringFa } from "../../../../../assets/strings/stringFaCollection.js";
import "./ToolsContainer.scss";
import { FaPlusCircle } from "react-icons/fa";
import { useTheme } from "../../../../../styles/ThemeProvider";
import StyledButton from "../../../../../component/UI/Button/StyledButton";
import { useSelector, useDispatch } from "react-redux";
import * as chartActions from "../../../../../store/actions/chart.js";
import axios from "axios";
import { baseUrl } from "../../../../../constants/Config";
import { getChartsDataWithSpecificFilter, getFilteredData } from "../../../../../api/home.js";
import ErrorDialog from "../../../../../component/UI/Error/ErrorDialog.jsx";

const ToolsContainer = (props) => {
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null)
  const chartsData = useSelector((state) => state.chart);
  const token = useSelector((state) => state.auth.token);

  const themeState = useTheme();
  const theme = themeState.computedTheme;

  const dispatch = useDispatch();
  const updateChartData = (chartData) => {
    dispatch(chartActions.updateChartData(chartData));
  };
  const changeLoading = (payload) => {
    dispatch(chartActions.changeLoading(payload));
  };
  const setChartsData = (chartsData) => {
    dispatch(chartActions.setChartsData(chartsData));
  };
  const creatChartClickHandler = () => {
    props.setIsModalOpen(true);
  };

  const refreshClickHandler = async () => {
    setLoading(
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
    let result;
    // let payload = {
    //   chartsInfo: Object.entries(chartsData.data).filter(item => !item.config.auto_update)
    // };
    let chartsId = []
    let chartsInfo = [];
    for (const chartId in chartsData.data) {
      if (!(chartsData.data[chartId].config.auto_update)) {
        chartsId.push(chartId)
        chartsInfo.push({
          chartId,
          filterId: chartsData.data[chartId].selectedFilterId
        })
      }
    }
    try {
      result = await getChartsDataWithSpecificFilter({ chartsInfo }, token)
      if (!result.success)
        setError(<ErrorDialog onClose={setError}>{result.error}</ErrorDialog>)

      let updatedCharts = { ...chartsData.data }
      result.data.forEach(item => {
        updatedCharts[item._id].data = item.data
      })
      setChartsData(updatedCharts)
    } catch (error) {
      console.log(error)
      setError(<ErrorDialog onClose={setError}>{stringFa.error_occured_try_again}</ErrorDialog>)
      setLoading(null);

    }
    console.log(chartsInfo)
    // for (const chartId in chartsData.data) {
    //   if (!(chartsData.data[chartId].config.auto_update)) {
    //     changeLoading({
    //       chartId: chartId,
    //       loading: true,
    //     })
    //     result = await getFilteredData({ chartId: chartId, filterId: chartsData.data[chartId].selectedFilterId }, token)
    //     if (result.success) {
    //       updateChartData({
    //         chartId,
    //         chartData: result.data,
    //         lastUpdate: new Date(),
    //       });
    //     }
    //   }
    // }
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
      {chartsData.editMode && props.chartCount !== 0 && (
        <div
          className="divider"
          style={{ borderColor: theme.border_color }}
        ></div>
      )}
      {
        props.chartCount !== 0 ?
          loading ? (
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
          ) : null
      }
    </div>
  );
};

export default ToolsContainer;

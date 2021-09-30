import React, { useState, useEffect, useRef } from "react";
import "./TitleBlock.scss";
import { useTheme } from "../../styles/ThemeProvider";
import * as chartActions from "../../store/actions/chart.js";
import * as addChartActions from "../../store/actions/addChart";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import StarBorderRoundedIcon from "@material-ui/icons/StarBorderRounded";
import DropDown from "./../UI/DropDown/DropDown";
import { stringFa } from "./../../assets/strings/stringFaCollection";
import { chartTypes } from "../../constants/chart-types";
import { useDispatch, useSelector } from "react-redux";
import { FcSettings, FcFullTrash } from "react-icons/fc";
import axios from "axios";
import { baseUrl } from "./../../constants/Config";
import ErrorDialog from "./../UI/Error/ErrorDialog";
import { Redirect } from "react-router";

function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

const TitleBlock = React.memo((props) => {
  const [dropDown, setDropDown] = useState(false);
  const [details, setDetails] = useState([]);
  const [isFav, setIsFav] = useState(false);
  const [error, setError] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const chartsData = useSelector((state) => state.chart);
  const detailsSelection = useSelector((state) => state.detail);

  const themeState = useTheme();
  const theme = themeState.computedTheme;
  const starStyles = {
    color: theme.star_color,
  };
  let deletedChart;

  const extraItems = [
    { name: stringFa.Edit, id: "setting", icon: <FcSettings /> },
    { name: stringFa.delete, id: "delete", icon: <FcFullTrash /> },
  ];

  const ref = useRef();

  const onStarClickHandler = (e) => {
    setIsFav(!isFav);
  };
  useOnClickOutside(ref, () => {
    setDropDown(false);
  });

  const dispatch = useDispatch();
  const setChartType = (chartType) => {
    dispatch(chartActions.setChartType(chartType));
  };
  const deleteChart = (chartId) => {
    dispatch(chartActions.deleteChart(chartId));
  };
  const setChart = (chartData) => {
    dispatch(chartActions.setChartData(chartData));
  };
  const setId = (id) => {
    dispatch(addChartActions.setAddChartId(id));
  };
  const selectChartDatabase = (data) => {
    dispatch(addChartActions.selectChartData(data));
  };
  const setChartData = (chartData) => {
    dispatch(addChartActions.setChartData(chartData));
  };
  const setIsNewChart = (isNewChart) => {
    dispatch(addChartActions.setIsNewChart(isNewChart));
  };

  const undoDeleteChartHandler = () => {
    setChart({ chartId: props.chartId, chartData: deletedChart[0] });
  };

  const settingMenuHandler = async (id) => {
    if (id === "setting") {
      const result = await axios.post(`${baseUrl}api/get_data`, {
        id: props.bankId,
      });
      let selectedChartData = chartsData.data[props.chartId];
      selectedChartData = {
        ...selectedChartData,
        title: selectedChartData.title,
        type: selectedChartData.type,
        config: {
          period: selectedChartData.config.period,
          autoUpdate: selectedChartData.config.autoUpdate,
        },
        data: {
          data: selectedChartData.data,
          options: selectedChartData.options,
        },
      };
      setId(props.chartId);
      selectChartDatabase(result.data.result);
      setChartData(selectedChartData);
      setIsNewChart(false);
      setRedirect(<Redirect to="/create_chart" />);
    } else if (id === "delete") {
      deletedChart = Object.keys(chartsData.data)
        .filter((key) => key === props.chartId)
        .map((key) => {
          return chartsData.data[key];
        });

      deleteChart({ chartId: props.chartId });

      setError(
        <ErrorDialog
          success={true}
          undoClick={undoDeleteChartHandler}
          onClose={setError}
        >
          {stringFa.delete_chart_success}
        </ErrorDialog>
      );
      setTimeout(async () => {
        // console.log(error);
        // if (error) {
        let result;
        try {
          result = await axios.post(`${baseUrl}api/delete_chart`, {
            id: props.chartId,
          });
          setError(null);
        } catch (error) {
          setError(
            <ErrorDialog onClose={setError}>
              {stringFa.error_delete_chart}
            </ErrorDialog>
          );
        }
        // }
      }, 3000);
    } else {
      chartTypes.forEach((type) => {
        if (id === type.id) {
          setChartType({ key: props.chartId, value: id, item: "type" });
        }
      });
    }
  };

  useEffect(() => {
    let tempDetails = [];
    if (detailsSelection.holding) {
      tempDetails.push(detailsSelection.holding.name);
    }
    if (detailsSelection.company) {
      tempDetails.push(detailsSelection.company.name);
    }
    if (detailsSelection.software) {
      tempDetails.push(detailsSelection.software.name);
    }
    if (detailsSelection.activeBackup) {
      tempDetails.push(detailsSelection.activeBackup.name);
    }
    setDetails(tempDetails);
  }, [detailsSelection]);

  return (
    <div className="title-container" style={{ color: theme.on_surface }}>
      {redirect}
      {error}
      <div className="card-source-name">
        <div className="setting-container">
          <div ref={ref}>
            {dropDown && (
              <DropDown
                items={chartTypes}
                extraItems={extraItems}
                onClick={settingMenuHandler}
                setDropDown={setDropDown}
              />
            )}
            {chartsData.editMode && (
              <SettingsOutlinedIcon
                className="card-setting"
                onClick={() => {
                  setDropDown(!dropDown);
                }}
                style={{ color: theme.on_surface }}
              />
            )}
          </div>
        </div>
        <p className="details">
          {props.parent ? props.parent.join(" - ") : ""}
        </p>
        <div className="star-container" onClick={onStarClickHandler}>
          {isFav ? (
            <StarRoundedIcon style={starStyles} />
          ) : (
            <StarBorderRoundedIcon style={starStyles} />
          )}
        </div>
      </div>
      <div className="card-title">
        <p>{props.title}</p>
      </div>
    </div>
  );
});

export default TitleBlock;

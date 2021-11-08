import React, { useState, useEffect, useRef } from "react";
import "./TitleBlock.scss";
import { useTheme } from "../../styles/ThemeProvider";
import * as chartActions from "../../store/actions/chart.js";
import * as addChartActions from "../../store/actions/addChart";
import DropDown from "./../UI/DropDown/DropDown";
import { stringFa } from "./../../assets/strings/stringFaCollection";
import { chartTypes } from "../../constants/chart-types";
import { useDispatch, useSelector } from "react-redux";
import { FcSettings, FcFullTrash } from "react-icons/fc";
import { MdDragHandle, MdMoreVert } from "react-icons/md";
import { BsArrowsFullscreen } from "react-icons/bs";
import axios from "axios";
import { baseUrl } from "./../../constants/Config";
import ErrorDialog from "./../UI/Error/ErrorDialog";
import { Redirect } from "react-router";
import StyledButton from "../UI/Button/StyledButton";

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
  const [error, setError] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const chartsData = useSelector((state) => state.chart);
  const token = useSelector((state) => state.auth.token);
  const detailsSelection = useSelector((state) => state.detail);

  const themeState = useTheme();
  const theme = themeState.computedTheme;
  let deletedChart;

  const extraItems = [
    {
      name: stringFa.full_screen,
      id: "fullScreen",
      icon: <BsArrowsFullscreen />,
    },
    { name: stringFa.Edit, id: "setting", icon: <FcSettings /> },
    { name: stringFa.delete, id: "delete", icon: <FcFullTrash /> },
  ];

  const ref = useRef();

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
  const setIsEdit = (isEdit) => {
    dispatch(addChartActions.setIsEdit(isEdit));
  };
  const fullscreenChart = (isFullscreen) => {
    dispatch(addChartActions.fullscreenChart(isFullscreen));
  };

  const undoDeleteChartHandler = () => {
    setChart({ chartId: props.chartId, chartData: deletedChart[0] });
  };

  const settingMenuHandler = async (id) => {
    if (id === "setting" || id === "fullScreen") {
      const result = await axios.post(
        `${baseUrl}api/get_data`,
        {
          id: props.bankId,
        },
        { headers: { "auth-token": token } }
      );
      let selectedChartData = chartsData.data[props.chartId];
      selectedChartData = {
        title: selectedChartData.title,
        type: selectedChartData.type,
        config: {
          period: selectedChartData.config.period,
          autoUpdate: selectedChartData.config.auto_update,
        },
        data: {
          data: selectedChartData.data,
          options: selectedChartData.options,
        },
      };
      setId(props.chartId);
      selectChartDatabase(result.data.result);
      setChartData(selectedChartData);
      if (id === "setting") setIsEdit(true);
      fullscreenChart({ isFullscreen: true });
      // setRedirect(<Redirect to="/create_chart" />);
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
          result = await axios.post(
            `${baseUrl}api/delete_chart`,
            {
              id: props.chartId,
            },
            { headers: { "auth-token": token } }
          );
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
        <div className="icons-container">
          <div ref={ref}>
            {dropDown && (
              <DropDown
                divStyle={{
                  top: "0.6rem",
                }}
                items={chartTypes}
                extraItems={extraItems}
                onClick={settingMenuHandler}
                setDropDown={setDropDown}
                divContainerRef={ref}
              />
            )}
            {chartsData.editMode && (
              <StyledButton
                onClick={() => {
                  setDropDown(!dropDown);
                }}
                hover={
                  themeState.isDark ? theme.surface_1dp : theme.background_color
                }
                ButtonStyle={{ padding: "0 0.3rem", height: "26px" }}
              >
                <MdMoreVert
                  style={{
                    color: theme.on_surface,
                    fontSize: "1.4rem",
                  }}
                />
              </StyledButton>
            )}
            {!chartsData.editMode && (
              <StyledButton
                onClick={() => settingMenuHandler("fullScreen")}
                hover={
                  themeState.isDark ? theme.surface_1dp : theme.background_color
                }
              >
                <BsArrowsFullscreen style={{ fontSize: "1rem" }} />
              </StyledButton>
            )}
          </div>
        </div>
        <p className="details">
          {props.parent ? props.parent.join(" - ") : ""}
        </p>
        <div className="right-icon-container">
          {chartsData.editMode && props.cardIsHover && (
            <div className="draggable-handle">
              <MdDragHandle
                style={{ color: theme.primary, fontSize: "1.8rem" }}
              />
            </div>
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

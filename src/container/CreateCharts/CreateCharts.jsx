import React, { useState, useEffect, useRef } from "react";
import "./CreateCharts.scss";
import ChartSection from "./ChartSection/ChartSection";
import Steps from "./Steps/Steps";
import { Redirect, useLocation } from "react-router";
import { stringFa } from "../../assets/strings/stringFaCollection";
import Button from "../../component/UI/Button/Button.jsx";
import { VscSplitVertical, VscClose } from "react-icons/vsc";
import { BsFullscreenExit } from "react-icons/bs";
import { useTheme } from "../../styles/ThemeProvider.js";
import * as addChartActions from "../../store/actions/addChart";
import * as chartActions from "../../store/actions/chart.js";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { baseUrl } from "./../../constants/Config";
import ErrorDialog from "../../component/UI/Error/ErrorDialog.jsx";
import StyledButton from "../../component/UI/Button/StyledButton";
import DropDown from "../../component/UI/DropDown/DropDown";
import { FcSettings, FcFullTrash } from "react-icons/fc";
import { IoEllipsisVertical, IoSettingsOutline } from "react-icons/io5";

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

const CreateCharts = (props) => {
  const takenData = useSelector((state) => state.addChart);
  const chartsData = useSelector((state) => state.chart);
  const token = useSelector((state) => state.auth.token);
  // const [id, setId] = useState("");
  const [input, setInput] = useState(false);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const location = useLocation();
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  const menuItems = [
    {
      name: stringFa.exit_full_screen,
      id: "noFullScreen",
      icon: <BsFullscreenExit />,
    },
    { name: stringFa.Edit, id: "setting", icon: <FcSettings /> },
    { name: stringFa.delete, id: "delete", icon: <FcFullTrash /> },
  ];
  let deletedChart;

  const ref = useRef();

  // useEffect(() => {
  //   const { chartId } = location.state;
  //   setId(chartId);
  // }, [location.state.chartId]);

  useOnClickOutside(ref, () => {
    setInput(false);
  });

  const dispatch = useDispatch();
  const setChartTitle = (chartTitle) => {
    dispatch(addChartActions.setChartTitle(chartTitle));
  };
  const setChartData = (chartData) => {
    dispatch(addChartActions.setChartData(chartData));
  };
  const fullscreenChart = (isFullscreen) => {
    dispatch(addChartActions.fullscreenChart(isFullscreen));
  };
  const deleteChart = (chartId) => {
    dispatch(chartActions.deleteChart(chartId));
  };
  const setIsEdit = (isEdit) => {
    dispatch(addChartActions.setIsEdit(isEdit));
  };
  const setChartsData = (chartsData) => {
    dispatch(chartActions.setChartsData(chartsData));
  };

  const setTitleHandler = (e) => {
    setError(null);
    if (e.type === "keydown") {
      if (e.key === "Enter") {
        setChartTitle({ title: e.target.value });
        setInput(false);
      }
    } else setChartTitle({ title: e.target.value });
  };

  const closeHandler = () => {
    let clearedChartData = takenData.chartData;
    clearedChartData = {
      ...clearedChartData,
      title: "",
      type: "Line",
      config: {
        period: "",
        autoUpdate: false,
      },
      data: {
        data: [],
        options: { ...clearedChartData.data.options, fieldNames: {} },
      },
    };
    setChartData(clearedChartData);
    if (location.pathname === "/create_chart")
      setRedirect(<Redirect to="/view" />);
  };

  const doneClickHandler = async () => {
    if (!takenData.chartData.title) {
      setInput(true);
      setError(
        <ErrorDialog onClose={setError}>عنوان تعیین نشده است</ErrorDialog>
      );
    }
    if (takenData.chartData.title) {
      let chartApi, payload;
      let updatedChartsData = chartsData.data;
      if (location.pathname === "/create_chart") {
        chartApi = "create_chart";
        payload = {
          title: takenData.chartData.title,
          type: takenData.chartData.type,
          data: takenData.chartData.data.data,
          options: takenData.chartData.data.options,
          bankId: takenData.id,
          config: {
            period: parseInt(takenData.chartData.config.period),
            auto_update: takenData.chartData.config.autoUpdate,
          },
        };
      } else {
        chartApi = "edit_chart";
        payload = {
          title: takenData.chartData.title,
          type: takenData.chartData.type,
          data: takenData.chartData.data.data,
          options: takenData.chartData.data.options,
          chartId: takenData.id,
          config: {
            period: parseInt(takenData.chartData.config.period),
            auto_update: takenData.chartData.config.autoUpdate,
          },
        };
      }
      try {
        const result = await axios.post(`${baseUrl}api/${chartApi}`, payload, {
          headers: { "auth-token": token },
        });
        if (!result.data.success) {
          setError(
            <ErrorDialog onClose={setError}>
              {result.data.message.error}
            </ErrorDialog>
          );
        } else {
          closeHandler();
          if (location.pathname !== "/create_chart") {
            updatedChartsData = {
              ...updatedChartsData,
              [takenData.id]: {
                title: takenData.chartData.title,
                type: takenData.chartData.type,
                data: takenData.chartData.data.data,
                options: takenData.chartData.data.options,
                config: {
                  ...updatedChartsData[takenData.id].config,
                  period: takenData.chartData.config.period,
                  auto_update: takenData.chartData.config.autoUpdate,
                },
                parent: updatedChartsData[takenData.id].parent,
                bankId: updatedChartsData[takenData.id].bankId,
                lastBankUpdate: updatedChartsData[takenData.id].lastBankUpdate,
              },
            };
            setChartsData(updatedChartsData);
          }
          setError(
            <ErrorDialog success={true} onClose={setError}>
              {stringFa.success_save}
            </ErrorDialog>
          );
        }
      } catch (error) {
        setError(
          <ErrorDialog onClose={setError}>{stringFa.error_message}</ErrorDialog>
        );
      }
    }
  };

  const settingMenuHandler = async (id) => {
    if (id === "noFullScreen") {
      fullscreenChart({ isFullscreen: false });
    } else if (id === "setting") {
      setIsEdit(true);
    } else if (id === "delete") {
      deletedChart = Object.keys(chartsData.data)
        .filter((key) => key === takenData.id)
        .map((key) => {
          return chartsData.data[key];
        });
      deleteChart({ chartId: takenData.id });
      fullscreenChart({ isFullscreen: false });
      setError(
        <ErrorDialog
          success={true}
          // undoClick={undoDeleteChartHandler}
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
              id: takenData.id,
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
    }
  };

  useEffect(() => {
    if (!takenData.isFullscreen) {
      if (takenData.isEdit) {
        doneClickHandler();
      }
      setIsEdit(false);
    }
  }, [takenData.isFullscreen]);

  return (
    <div
      className="create-charts-container"
      style={{
        backgroundColor: themeState.isDark
          ? theme.background_color
          : theme.surface,
        borderColor: theme.border_color,
        color: theme.on_background,
      }}
    >
      {redirect}
      {error}
      {!takenData.isFullscreen && (
        <div
          className="section-header-wrapper"
          style={{ borderColor: theme.border_color }}
        >
          <div className="header-buttons">
            <Button
              ButtonStyle={{
                backgroundColor: theme.primary,
                flex: "0 0 auto",
                fontWeight: 400,
                fontSize: "1rem",
                color: theme.on_primary,
                marginBottom: "1rem",
                marginRight: "0.5rem",
              }}
              onClick={doneClickHandler}
            >
              {stringFa.done}
            </Button>
            <Button
              ButtonStyle={{
                backgroundColor: "gray",
                flex: "0 0 auto",
                fontWeight: 400,
                fontSize: "0.9rem",
                color: theme.on_primary,
                marginBottom: "1rem",
              }}
              onClick={closeHandler}
            >
              {stringFa.cancel}
            </Button>
          </div>
          <div className="settings-title-and-description">
            <div className="settings-title">{stringFa.chart_setting}</div>
            <div className="settings-description">
              {stringFa.chart_setting_description}
            </div>
          </div>
        </div>
      )}
      {takenData.isFullscreen && (
        <div
          className="section-header-wrapper"
          style={{ borderColor: theme.border_color }}
        >
          <StyledButton
            ButtonStyle={{
              flex: "0 0 auto",
              fontSize: "1.4rem",
              marginBottom: "1rem",
              padding: "4px",
            }}
            hover={
              themeState.isDark ? theme.surface_1dp : theme.background_color
            }
            onClick={() => fullscreenChart({ isFullscreen: false })}
          >
            <VscClose />
          </StyledButton>
          {chartsData.editMode ? (
            <div ref={ref}>
              <StyledButton
                ButtonStyle={{
                  flex: "0 0 auto",
                  fontSize: "1rem",
                  marginBottom: "1rem",
                  backgroundColor: takenData.isEdit
                    ? themeState.isDark
                      ? theme.surface_24dp
                      : theme.background_color
                    : "transparent",
                }}
                hover={
                  themeState.isDark ? theme.surface_1dp : theme.background_color
                }
                onClick={() => setIsEdit(!takenData.isEdit)}
              >
                <IoSettingsOutline />
              </StyledButton>
              <StyledButton
                ButtonStyle={{
                  flex: "0 0 auto",
                  fontSize: "1rem",
                  marginBottom: "1rem",
                  marginLeft: "0.5rem",
                }}
                hover={
                  themeState.isDark ? theme.surface_1dp : theme.background_color
                }
                onClick={() => setDropDown(!dropDown)}
              >
                <IoEllipsisVertical />
              </StyledButton>
              {dropDown && (
                <DropDown
                  divStyle={{
                    top: "1.7rem",
                    right: "1rem",
                  }}
                  items={menuItems}
                  onClick={settingMenuHandler}
                  setDropDown={setDropDown}
                  divContainerRef={ref}
                />
              )}
            </div>
          ) : (
            <span style={{ marginBottom: "1rem", marginRight: "1rem" }}>
              {takenData.chartData.title
                ? takenData.chartData.title
                : stringFa.title}
            </span>
          )}
        </div>
      )}
      <div className="section-settings-wrapper">
        <div
          className="section-settings"
          style={{
            border: chartsData.editMode && `1px solid ${theme.border_color}`,
          }}
        >
          <div
            className="section-settings-header-wrapper"
            style={{
              borderBottom:
                chartsData.editMode && `1px solid ${theme.border_color}`,
            }}
          ></div>
          {chartsData.editMode && (
            <div className="section-settings-display-type-switcher-wrapper">
              <VscSplitVertical />
            </div>
          )}
          <div className="section-settings-content-component">
            {chartsData.editMode && (
              <div className="section-settings-content-header-container">
                <div className="base-section-settings-header-component">
                  <div
                    className={`base-section-settings-header ${
                      input && "renaming-section"
                    }`}
                  >
                    <div
                      className="editable-component"
                      ref={ref}
                      onClick={() => {
                        setInput(true);
                      }}
                    >
                      {input ? (
                        <input
                          className="editable-input"
                          dir="rtl"
                          placeholder={stringFa.title}
                          value={takenData.chartData.title}
                          onChange={setTitleHandler}
                          onKeyDown={setTitleHandler}
                          style={{ borderColor: error ? "red" : "" }}
                        />
                      ) : (
                        <div className="text-component" dir="rtl">
                          <span>
                            {takenData.chartData.title
                              ? takenData.chartData.title
                              : stringFa.title}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="section-chart-content-container">
              <ChartSection />
            </div>
            {/* <div className="table-component-container">
              <BankSection />
            </div> */}
          </div>
        </div>
        {takenData.isEdit && <Steps type={"Line"} />}
      </div>
    </div>
  );
};
export default CreateCharts;

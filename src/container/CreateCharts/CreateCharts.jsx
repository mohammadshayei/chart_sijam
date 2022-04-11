import React, { useState, useEffect, useRef } from "react";
import "./CreateCharts.scss";
import ChartSection from "./ChartSection/ChartSection";
import Steps from "./Steps/Steps";
import { useNavigate, useLocation } from "react-router-dom";
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
import BankSection from "./BankSection/BankSection";
import Hint from "../../component/UI/Hint/Hint";

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
  const selectedHolding = useSelector((state) => state.holdingDetail.selectedHolding);
  const { token, userId } = useSelector((state) => state.auth);
  // const [id, setId] = useState("");
  const [input, setInput] = useState(false);
  const [error, setError] = useState(null);
  const [dropDown, setDropDown] = useState(false);
  const [splitView, setSplitView] = useState("نمودار");
  const [hintShow, setHintShow] = useState({ split: false });
  const [hover, setHover] = useState({ split: false, title: false });

  const location = useLocation();
  const themeState = useTheme();
  const theme = themeState.computedTheme;
  const navigate = useNavigate()
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
    onMouseLeave("title")
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
  const updateEmptyRequireds = (emptyRequireds) => {
    dispatch(addChartActions.updateEmptyRequireds(emptyRequireds));
  };

  const setTitleHandler = (e) => {
    if (e.type === "keydown") {
      if (e.key === "Enter") {
        setChartTitle({ title: e.target.value });
        setInput(false);
        onMouseLeave("title")
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
      shareAll: false,
      editAll: false,
      viewAll: false,
      shareList: [],
      editList: [],
      viewList: [],
      data: {
        data: [],
        options: { ...clearedChartData.data.options, fieldNames: {} },
      },
    };
    setIsEdit(false)
    setChartData(clearedChartData);
    if (location.pathname === "/create_chart")
      navigate('/view')
  };

  const onMouseEnter = (type) => {
    let updatedHover = { ...hover };
    updatedHover[type] = true;
    setHover(updatedHover);
  };
  const onMouseLeave = (type) => {
    let updatedHover = { ...hover };
    updatedHover[type] = false;
    setHover(updatedHover);
  };
  useEffect(() => {
    for (const key in hover) {
      if (hover[key]) {
        const timer = setTimeout(() => {
          let updatedHintShow = { ...hintShow }
          updatedHintShow[key] = true;
          setHintShow(updatedHintShow);
        }, 200);
        return () => {
          let updatedHintShow = { ...hintShow }
          updatedHintShow[key] = false;
          setHintShow(updatedHintShow);
          return clearTimeout(timer);
        };
      }
    }
  }, [hover]);
  const splitViewHandler = () => {
    switch (splitView) {
      case "نمودار":
        setSplitView("تقسیم شده")
        break;
      case "تقسیم شده":
        setSplitView("نمودار")
        break;
      // case "جدول":
      //   setSplitView("نمودار")
      //   break;

      default:
        setSplitView("نمودار")
        break;
    }
  }

  const checkValidation = (dialog) => {
    let errorText, updatedStepErrors = []
    if (!takenData.chartData.title) {
      updatedStepErrors = [...updatedStepErrors, "input"]
      errorText = stringFa.title_is_empty
    };
    if (takenData.chartData.data.data.length === 0) {
      updatedStepErrors = [...updatedStepErrors, "xAxis", "category", "field1"]
      errorText = stringFa.field_not_chosen
    } else {
      if (!("category" in takenData.chartData.data.data[0])) {
        updatedStepErrors = [...updatedStepErrors, "category"]
        errorText = stringFa.field_not_chosen
      }
      if (!("field1" in takenData.chartData.data.data[0])) {
        updatedStepErrors = [...updatedStepErrors, "field1"]
        errorText = stringFa.field_not_chosen
      }
      if (errorText === stringFa.field_not_chosen)
        updatedStepErrors = [...updatedStepErrors, "xAxis"]
    }
    if (!takenData.chartData.editAll &&
      takenData.chartData.editList.length === 0) {
      updatedStepErrors = [...updatedStepErrors, "edit"]
      errorText = stringFa.permissions_not_defined
    }
    if (!takenData.chartData.viewAll &&
      takenData.chartData.viewList.length === 0) {
      updatedStepErrors = [...updatedStepErrors, "view"]
      errorText = stringFa.permissions_not_defined
    }
    if (!takenData.chartData.shareAll &&
      takenData.chartData.shareList.length === 0) {
      updatedStepErrors = [...updatedStepErrors, "share"]
      errorText = stringFa.permissions_not_defined
    }
    if (errorText === stringFa.permissions_not_defined) {
      updatedStepErrors = [...updatedStepErrors, "accessibility"]
    }
    if (updatedStepErrors.length > 0) {
      if (dialog) {
        setError(null)
        if (updatedStepErrors.length > 1)
          setError(
            <ErrorDialog onClose={setError}>{stringFa.fill_required_items}</ErrorDialog>
          )
        else
          setError(
            <ErrorDialog onClose={setError}>{errorText}</ErrorDialog>
          )
      }
      updateEmptyRequireds({ emptyRequireds: updatedStepErrors })
      return false
    }
    return true
  }

  const doneClickHandler = async () => {
    const valid = checkValidation(true);
    if (!valid)
      return
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
        holdingId: selectedHolding.holdingId,
        userId,
        shareAll: takenData.chartData.shareAll,
        editAll: takenData.chartData.editAll,
        viewAll: takenData.chartData.viewAll,
        shareList: takenData.chartData.shareAll ? [] : takenData.chartData.shareList,
        editList: takenData.chartData.editAll ? [] : takenData.chartData.editList,
        viewList: takenData.chartData.viewAll ? [] : takenData.chartData.viewList,
      };
    } else {
      chartApi = "edit_chart";
      payload = {
        chartId: takenData.id,
        title: takenData.chartData.title,
        type: takenData.chartData.type,
        data: takenData.chartData.data.data,
        options: takenData.chartData.data.options,
        config: {
          period: parseInt(takenData.chartData.config.period),
          auto_update: takenData.chartData.config.autoUpdate,
        },
        userId,
        shareAll: takenData.chartData.shareAll,
        editAll: takenData.chartData.editAll,
        viewAll: takenData.chartData.viewAll,
        shareList: takenData.chartData.shareAll ? [] : takenData.chartData.shareList,
        editList: takenData.chartData.editAll ? [] : takenData.chartData.editList,
        viewList: takenData.chartData.viewAll ? [] : takenData.chartData.viewList,
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

  useEffect(() => {
    if (takenData.emptyRequireds.length > 0)
      checkValidation(false)
  }, [takenData.chartData]);

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
          >
          </div>
          <div
            className="section-settings-display-type-switcher-wrapper"
            onMouseEnter={() => onMouseEnter("split")}
            onMouseLeave={() => onMouseLeave("split")}
            style={{ top: chartsData.editMode ? "1.5rem" : "-4.55rem", left: chartsData.editMode ? "1rem" : "2.5rem" }}
          >
            {hintShow.split && <Hint show={hintShow.split} hint={`نوع نمایش : ${splitView}`}
              tooltipStyle={{ left: chartsData.editMode ? "0" : "-180%", top: "0.5rem" }} arrowStyle={{ left: chartsData.editMode ? "15%" : "35%" }} />}
            <StyledButton
              ButtonStyle={{
                flex: "0 0 auto",
                fontSize: "1rem",
                marginBottom: "1rem",
                padding: "4px",
              }}
              hover={
                themeState.isDark ? theme.surface_1dp : theme.background_color
              }
              onClick={splitViewHandler}
            >
              <VscSplitVertical />
            </StyledButton>
          </div>
          <div className="section-settings-content-component">
            {chartsData.editMode && (
              <div className="section-settings-content-header-container">
                <div className="base-section-settings-header-component">
                  <div
                    className={`base-section-settings-header ${input && "renaming-section"
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
                          style={{
                            borderColor: takenData.emptyRequireds.length > 0 ?
                              takenData.emptyRequireds.includes("input") ?
                                theme.error :
                                theme.darken_border_color :
                              theme.darken_border_color
                          }}
                          dir="rtl"
                          placeholder={stringFa.title}
                          value={takenData.chartData.title}
                          onChange={setTitleHandler}
                          onKeyDown={setTitleHandler}
                          autoFocus
                        />
                      ) : (
                        <div className="text-component" dir="rtl"
                          onMouseEnter={() => onMouseEnter("title")}
                          onMouseLeave={() => onMouseLeave("title")}
                          style={{
                            border: takenData.emptyRequireds.length > 0 ?
                              takenData.emptyRequireds.includes("input") ?
                                `1px dashed ${theme.error}` :
                                hover.title ? `1px dashed ${theme.darken_border_color}` :
                                  "none" :
                              hover.title ? `1px dashed ${theme.darken_border_color}` :
                                "none"
                          }}>
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
            {(splitView === "نمودار" || splitView === "تقسیم شده") &&
              <div className="section-chart-content-container">
                <ChartSection />
              </div>}
            {(splitView === "جدول" || splitView === "تقسیم شده") &&
              <div className="table-component-container">
                <BankSection />
              </div>}
          </div>
        </div>
        {takenData.isFullscreen ?
          takenData.isEdit && <Steps type={"Line"} />
          :
          <Steps type={"Line"} />
        }
      </div>
    </div>
  );
};
export default CreateCharts;

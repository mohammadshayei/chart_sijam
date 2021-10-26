import React, { useContext, useState, useEffect, useRef } from "react";
import "./CreateCharts.scss";
import ChartSection from "./ChartSection/ChartSection";
import Steps from "./Steps/Steps";
import {  Redirect } from "react-router";
import { stringFa } from "../../assets/strings/stringFaCollection";
import Button from "../../component/UI/Button/Button.jsx";
import { VscSplitVertical } from "react-icons/vsc";
import { useTheme } from "../../styles/ThemeProvider.js";
import * as addChartActions from "../../store/actions/addChart";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { baseUrl } from "./../../constants/Config";
import ErrorDialog from "../../component/UI/Error/ErrorDialog.jsx";

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
  const token = useSelector((state) => state.auth.token);

  // const [id, setId] = useState("");
  const [input, setInput] = useState(false);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);
  const [redirect, setRedirect] = useState(false);
  // const location = useLocation();
  const themeState = useTheme();
  const theme = themeState.computedTheme;

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

  useEffect(() => {
    if (saved) {
      setRedirect(<Redirect to="/view" />);
    }
  }, [saved]);

  const setTitleHandler = (e) => {
    setError(null);
    if (e.type === "keydown") {
      if (e.key === "Enter") {
        setChartTitle({ title: e.target.value });
        setInput(false);
      }
    } else setChartTitle({ title: e.target.value });
  };

  const cancelClickHandler = () => {
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
      const payload = {
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
      try {
        const result = await axios.post(`${baseUrl}api/create_chart`,
          payload,
          { headers: { 'auth-token': token } });
        if (!result.data.success) {
          setError(
            <ErrorDialog onClose={setError}>
              {result.data.message.error}
            </ErrorDialog>
          );
        } else {
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
          setSaved(true);
        }
      } catch (error) {
        setError(
          <ErrorDialog onClose={setError}>{stringFa.error_message}</ErrorDialog>
        );
      }
    }
  };

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
            onClick={cancelClickHandler}
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
      <div className="section-settings-wrapper">
        <div
          className="section-settings"
          style={{ borderColor: theme.border_color }}
        >
          <div
            className="section-settings-header-wrapper"
            style={{ borderColor: theme.border_color }}
          ></div>
          <div className="section-settings-display-type-switcher-wrapper">
            <VscSplitVertical />
          </div>
          <div className="section-settings-content-component">
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
            <div className="section-chart-content-container">
              <ChartSection />
            </div>
            {/* <div className="table-component-container">
              <BankSection />
            </div> */}
          </div>
        </div>
        <Steps type={"Line"} />
      </div>
    </div>
  );
};
export default CreateCharts;

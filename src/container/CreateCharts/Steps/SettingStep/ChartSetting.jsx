import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stringFa } from "../../../../assets/strings/stringFaCollection";
import * as addChartActions from "../../../../store/actions/addChart";
import { useTheme } from "../../../../styles/ThemeProvider";
import { baseUrl } from "./../../../../constants/Config";
import CheckBox from "../../../../component/UI/CheckBox/CheckBox";
import loading from "../../../../assets/images/dualRingLoading.gif";
import { BiChevronDown } from "react-icons/bi";
import DropDown from "./../../../../component/UI/DropDown/DropDown";
import "./ChartSetting.scss";

const ChartSetting = () => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;
  const [themePalette, setThemePalette] = useState({
    noTheme: {
      backgroundImage:
        "linear-gradient(45deg, #67b7dc 0%,#67b7dc 50%,#c767dc 50%,#c767dc 100%)",
      borderColor: "#fff",
      active: true,
    },
    dataviz: {
      backgroundImage:
        "linear-gradient(45deg, #283250 0%,#283250 50%,#902c2d 50%,#902c2d 100%)",
      borderColor: "#fff",
      active: false,
    },
    dark: {
      backgroundImage:
        "linear-gradient(45deg, #67b7dc 0%,#67b7dc 50%,#c767dc 50%,#c767dc 100%)",
      borderColor: "#000",
      active: false,
    },
    frozen: {
      backgroundImage:
        "linear-gradient(45deg, #bec4f8 0%,#bec4f8 50%,#a5abee 50%,#a5abee 100%)",
      borderColor: "#fff",
      active: false,
    },
    moonrisekingdom: {
      backgroundImage:
        "linear-gradient(45deg, #3a1302 0%,#3a1302 50%,#c79f59 50%,#c79f59 100%)",
      borderColor: "#fff",
      active: false,
    },
    spiritedaway: {
      backgroundImage:
        "linear-gradient(45deg, #65738e 0%,#65738e 50%,#523b58 50%,#523b58 100%)",
      borderColor: "#fff",
      active: false,
    },
  });
  const [legend, setLegend] = useState({
    display: true,
    position: {
      top: { img: "images/legend-top.svg", selected: true },
      right: { img: "images/legend-right.svg", selected: false },
      bottom: { img: "images/legend-bottom.svg", selected: false },
      left: { img: "images/legend-left.svg", selected: false },
    },
    colorize: false,
  });
  const [rotate, setRotate] = useState(false);
  const [repeat, setRepeat] = useState(true);
  const [axisBreak, setAxisBreak] = useState({
    active: false,
    start: 0,
    end: 0,
    size: 0,
  });
  const [breakInputs, setBreakInputs] = useState({
    start: { value: 0, focus: false, loading: null },
    end: { value: 0, focus: false, loading: null },
  });
  const [dataLabels, setDataLabels] = useState({
    bent: false,
    radius: 10,
    disabled: false,
    text: "{category}",
  });
  const [selectedLabelsText, setSelectedLabelsText] =
    useState("?????? ???????? ??????????");
  const [labelsDropdown, setLabelsDropdown] = useState(false);
  const [insideLabel, setInsideLabel] = useState(false);
  const [initial, setInitial] = useState(true);

  const takenData = useSelector((state) => state.addChart);
  const labelsDropDownItems = [
    { name: "?????? ???????? ??????????", id: "category" },
    { name: "????????????", id: "value" },
    { name: "?????? ???????? : ????????", id: "catper" },
    { name: "?????? ???????? : ??????????", id: "catval" },
    { name: "?????? ???????? : ???????? ?? ??????????", id: "total" },
  ];

  const ref = useRef();

  const dispatch = useDispatch();
  const setChartOptions = (chartOptions) => {
    dispatch(addChartActions.setChartOptions({ chartOptions }));
  };

  const paletteClickHandler = (key) => {
    let updatedThemePalette = { ...themePalette };
    for (const theme in updatedThemePalette) {
      if (theme === key) {
        updatedThemePalette[theme].active = true;
      } else {
        updatedThemePalette[theme].active = false;
      }
    }
    setThemePalette(updatedThemePalette);
  };

  const legendsClickHandler = (key) => {
    let updatedLegend = { ...legend };
    for (const k1 in updatedLegend) {
      if (k1 === "position") {
        for (const k2 in updatedLegend[k1]) {
          if (k2 === key) {
            updatedLegend[k1][k2].selected = true;
          } else updatedLegend[k1][k2].selected = false;
        }
      }
    }
    setLegend(updatedLegend);
  };

  const displayCheckBoxClick = (checked) => {
    let updatedLegend = { ...legend };
    updatedLegend.display = checked;
    setLegend(updatedLegend);
  };

  const colorizeCheckBoxClick = (checked) => {
    let updatedLegend = { ...legend };
    updatedLegend.colorize = checked;
    setLegend(updatedLegend);
  };

  const axisBreakCheckBoxClick = (checked) => {
    let updatedAxisBreak = { ...axisBreak };
    updatedAxisBreak.active = checked;
    if (checked) updatedAxisBreak.size = 0.01;
    setAxisBreak(updatedAxisBreak);
  };

  const dataLabelsCheckBoxClick = (checked) => {
    let updatedDataLabels = { ...dataLabels };
    updatedDataLabels.disabled = checked;
    setDataLabels(updatedDataLabels);
  };

  const breakOnFocusHandler = (key) => {
    let updatedInputs = { ...breakInputs };
    updatedInputs[key].focus = true;
    setBreakInputs(updatedInputs);
  };
  const breakOnBlurHandler = (key) => {
    let updatedInputs = { ...breakInputs };
    updatedInputs[key].focus = false;
    setBreakInputs(updatedInputs);
  };
  const breakInputHandler = (evt) => {
    let updatedBreakInputs = { ...breakInputs };
    updatedBreakInputs[evt.target.id].value = evt.target.validity.valid
      ? parseInt(evt.target.value, 10)
      : updatedBreakInputs[evt.target.id].value;
    setBreakInputs(updatedBreakInputs);
  };
  const breakOnChangeHandler = (e) => {
    let updatedBreakInputs = { ...breakInputs };
    if (e.target.value === "") updatedBreakInputs[e.target.id].value = 0;
    updatedBreakInputs[e.target.id].loading = (
      <img src={loading} width="18px" height="18px" />
    );
    setBreakInputs(updatedBreakInputs);
    setTimeout(() => {
      let updatedAxisBreak = { ...axisBreak };
      updatedAxisBreak[e.target.id] = parseInt(e.target.value, 10);
      setAxisBreak(updatedAxisBreak);
      updatedBreakInputs[e.target.id].loading = null;
      setBreakInputs(updatedBreakInputs);
    }, 5000);
  };

  /* INITIAL SETTING */
  useEffect(() => {
    const chartOptions = { ...takenData.chartData.data.options };
    let updatedThemePalette = { ...themePalette };
    let updatedLegend = { ...legend };
    let updatedDataLabels = { ...dataLabels };
    if (chartOptions.theme) {
      for (const theme in updatedThemePalette) {
        if (chartOptions.theme === theme) {
          updatedThemePalette[theme].active = true;
        } else updatedThemePalette[theme].active = false;
      }
    }
    setThemePalette(updatedThemePalette);
    if (chartOptions.legend) {
      updatedLegend.display = chartOptions.legend.display;
      updatedLegend.colorize = chartOptions.legend.colorize;
      for (const key in updatedLegend.position) {
        if (`${key}` === chartOptions.legend.position) {
          updatedLegend.position[key].selected = true;
        } else updatedLegend.position[key].selected = false;
      }
    }
    setLegend(updatedLegend);
    if (chartOptions.axes.xAxes) {
      setRotate(chartOptions.axes.xAxes.rotation);
      setRepeat(chartOptions.axes.xAxes.repeatingCategories);
    }
    if (chartOptions.axes.yAxes) {
      let updatedBreakInputs = { ...breakInputs };
      updatedBreakInputs.start.value = chartOptions.axes.yAxes.break.start;
      updatedBreakInputs.end.value = chartOptions.axes.yAxes.break.end;
      setBreakInputs(updatedBreakInputs);
      setAxisBreak(chartOptions.axes.yAxes.break);
    }
    if (chartOptions.series.labels) {
      updatedDataLabels.disabled = chartOptions.series.labels.disabled;
      updatedDataLabels.text = chartOptions.series.labels.text;
      setDataLabels(updatedDataLabels);
    }
    switch (chartOptions.series.labels.text) {
      case "{category}":
        setSelectedLabelsText("?????? ???????? ??????????");
        break;
      case "{value}":
        setSelectedLabelsText("????????????");
        break;
      case "({value}) [bold]{valuePercentTotal.formatNumber('0.00')}%[/] : {category}":
        setSelectedLabelsText("?????? ???????? : ???????? ?? ??????????");
        break;
      case "[bold]{valuePercentTotal.formatNumber('0.00')}%[/] : {category}":
        setSelectedLabelsText("?????? ???????? : ????????");
        break;
      case "[bold]{value} : {category}":
        setSelectedLabelsText("?????? ???????? : ??????????");
        break;

      default:
        break;
    }
    if (chartOptions.insideLabel) setInsideLabel(chartOptions.insideLabel);
    setInitial(false);
  }, []);

  useEffect(() => {
    let chartOptions = { ...takenData.chartData.data.options };
    for (const theme in themePalette) {
      if (themePalette[theme].active) {
        chartOptions.theme = theme;
      }
    }
    setChartOptions(chartOptions);
  }, [themePalette]);

  useEffect(() => {
    let chartOptions = { ...takenData.chartData.data.options };
    if (legend) {
      chartOptions.legend.display = legend.display;
      for (const pos in legend.position) {
        if (legend.position[pos].selected) {
          chartOptions.legend.position = `${pos}`;
        }
      }
      chartOptions.legend.colorize = legend.colorize;
      setChartOptions(chartOptions);
    }
  }, [legend]);

  useEffect(() => {
    let chartOptions = { ...takenData.chartData.data.options };
    chartOptions.axes.xAxes.rotation = rotate;
    setChartOptions(chartOptions);
  }, [rotate]);

  useEffect(() => {
    let chartOptions = { ...takenData.chartData.data.options };
    chartOptions.axes.xAxes.repeatingCategories = repeat;
    setChartOptions(chartOptions);
  }, [repeat]);

  useEffect(() => {
    let chartOptions = { ...takenData.chartData.data.options };
    chartOptions.axes.yAxes.break = axisBreak;
    setChartOptions(chartOptions);
  }, [axisBreak]);

  useEffect(() => {
    if (!initial) {
      let updatedDataLabels = { ...dataLabels };
      switch (selectedLabelsText) {
        case "?????? ???????? ??????????":
          updatedDataLabels.text = "{category}";
          break;
        case "????????????":
          updatedDataLabels.text = "{value}";
          break;
        case "?????? ???????? : ???????? ?? ??????????":
          updatedDataLabels.text = "({value}) [bold]{valuePercentTotal.formatNumber('0.00')}%[/] : {category}";
          break;
        case "?????? ???????? : ????????":
          updatedDataLabels.text =
            "[bold]{valuePercentTotal.formatNumber('0.00')}%[/] : {category}";
          break;
        case "?????? ???????? : ??????????":
          updatedDataLabels.text = "[bold]{value}[/] : {category}";
          break;

        default:
          break;
      }
      setDataLabels(updatedDataLabels);
    }
  }, [selectedLabelsText]);

  useEffect(() => {
    let chartOptions = { ...takenData.chartData.data.options };
    chartOptions.series.labels.bent = dataLabels.bent;
    chartOptions.series.labels.radius = dataLabels.radius;
    chartOptions.series.labels.disabled = dataLabels.disabled;
    chartOptions.series.labels.text = dataLabels.text;
    setChartOptions(chartOptions);
  }, [dataLabels]);

  useEffect(() => {
    let chartOptions = { ...takenData.chartData.data.options };
    chartOptions.insideLabel = insideLabel;
    setChartOptions(chartOptions);
  }, [insideLabel]);

  return (
    <div className="chart-setting-container">
      <ul className="setting-list">
        <li className="setting-item">
          <ul className="theme-switcher">
            <li className="list theme-text">:???????????? ????</li>
            {Object.entries(themePalette).map(([k, v]) => {
              return (
                <li
                  key={k}
                  className="list"
                  style={{ border: v.active ? "2px solid #3b96ff" : "none" }}
                  onMouseEnter={() => { }}
                >
                  <a
                    className="dot"
                    style={{
                      backgroundImage: `${v.backgroundImage}`,
                      borderColor: `${v.borderColor}`,
                    }}
                    onClick={() => paletteClickHandler(k)}
                  ></a>
                </li>
              );
            })}
          </ul>
        </li>
        <li className="setting-item">
          <div
            className="line"
            style={{ backgroundColor: theme.border_color }}
          ></div>
          <div className="setting-part-container">
            {stringFa.legend}
            <CheckBox
              checked={legend.display}
              onChange={(e) => displayCheckBoxClick(e.target.checked)}
              style={{ padding: "1rem 1rem 0.5rem 0", fontSize: "0.85rem" }}
            >
              {stringFa.enabled}
            </CheckBox>
            {legend.display && (
              <div>
                <div className="legend-positions-container">
                  {Object.entries(legend.position).map(([k, v]) => {
                    return (
                      <div
                        key={k}
                        style={{
                          border: v.selected
                            ? `2px solid ${theme.primary}`
                            : "none",
                        }}
                        className="legend-position"
                        onClick={() => legendsClickHandler(k)}
                      >
                        <img
                          className="legend-position-image"
                          src={`${baseUrl}${v.img}`}
                          alt=""
                        />
                      </div>
                    );
                  })}
                  <CheckBox
                    checked={legend.colorize}
                    onChange={(e) => colorizeCheckBoxClick(e.target.checked)}
                    style={{ fontSize: "0.8rem", marginRight: "2rem" }}
                  >
                    {stringFa.colorize}
                  </CheckBox>
                </div>
              </div>
            )}
          </div>
        </li>
        {(takenData.chartData.type === "Column" ||
          takenData.chartData.type === "Line") && (
            <li className="setting-item">
              <div
                className="line"
                style={{ backgroundColor: theme.border_color }}
              ></div>
              <div className="setting-part-container">
                {stringFa.category_axis}
                <div className="category-axis-setting">
                  <CheckBox
                    checked={rotate}
                    onChange={(e) => setRotate(e.target.checked)}
                    style={{
                      padding: "1rem 1rem 0.5rem 0",
                      fontSize: "0.85rem",
                    }}
                  >
                    {stringFa.rotate_categories}
                  </CheckBox>
                  {/* <CheckBox
                    checked={repeat}
                    onChange={(e) => setRepeat(e.target.checked)}
                    style={{
                      padding: "1rem 1rem 0.5rem 0",
                      fontSize: "0.85rem",
                    }}
                  >
                    {stringFa.repeating_categories}
                  </CheckBox> */}
                </div>
              </div>
            </li>
          )}
        {(takenData.chartData.type === "Column" ||
          takenData.chartData.type === "Line") && (
            <li className="setting-item">
              <div
                className="line"
                style={{ backgroundColor: theme.border_color }}
              ></div>
              <div className="setting-part-container">
                {stringFa.value_axis}
                <CheckBox
                  checked={axisBreak.active}
                  onChange={(e) => axisBreakCheckBoxClick(e.target.checked)}
                  style={{
                    padding: "1rem 1rem 0.5rem 0",
                    fontSize: "0.85rem",
                  }}
                >
                  {stringFa.axis_break}
                </CheckBox>
                {/* {axisBreak.active && (
                <div className="value-axis-setting">
                  {Object.entries(breakInputs).map(([k, v]) => {
                    return (
                      <div key={k} className="value-axis-setting">
                        <div className="input-text">: {stringFa[k]}</div>
                        <input
                          className="input-class"
                          id={k}
                          style={{
                            background: themeState.isDark
                              ? theme.surface_1dp
                              : theme.surface,
                            color: theme.on_background,
                            borderColor: breakInputs[k].focus
                              ? theme.primary
                              : theme.border_color,
                          }}
                          type="text"
                          pattern="[0-9]*"
                          dir="rtl"
                          value={breakInputs[k].value}
                          onInput={(e) => breakInputHandler(e)}
                          onChange={(e) => breakOnChangeHandler(e)}
                          onFocus={() => breakOnFocusHandler(k)}
                          onBlur={() => breakOnBlurHandler(k)}
                        ></input>
                        {breakInputs[k].loading}
                      </div>
                    );
                  })}
                </div>
              )} */}
              </div>
            </li>
          )}
        {(takenData.chartData.type === "Pie") && (
          <li className="setting-item">
            <div
              className="line"
              style={{ backgroundColor: theme.border_color }}
            ></div>
            <div className="setting-part-container">
              {stringFa.data_labels}
              <CheckBox
                checked={dataLabels.disabled}
                onChange={(e) => dataLabelsCheckBoxClick(e.target.checked)}
                style={{
                  padding: "1rem 1rem 0.5rem 0",
                  fontSize: "0.85rem",
                }}
              >
                {stringFa.disabled}
              </CheckBox>
              {!dataLabels.disabled && (
                <div className="value-axis-setting">
                  : {stringFa.labels_text}
                  <div
                    className="setting-dropdown-component"
                    ref={ref}
                    style={{ padding: "0 1rem" }}
                  >
                    {labelsDropdown && (
                      <DropDown
                        divStyle={{
                          top: "1.1rem",
                          width: "13.2rem",
                        }}
                        items={labelsDropDownItems}
                        setSelected={setSelectedLabelsText}
                        setDropDown={setLabelsDropdown}
                        divContainerRef={ref}
                      />
                    )}
                    <div
                      className={`dropdown-wrapper ${labelsDropdown && "open"}`}
                      onClick={() => {
                        setLabelsDropdown(!labelsDropdown);
                      }}
                      style={{ borderColor: theme.border_color }}
                    >
                      <div className="dropdown-indicator">
                        <div
                          className={`dropdown-indicator-icon ${labelsDropdown && "rotate"
                            }`}
                        >
                          <BiChevronDown />
                        </div>
                      </div>
                      <div className="dropdown-title">
                        <span className="title-text">{selectedLabelsText}</span>
                      </div>
                    </div>
                  </div>
                  {takenData.chartData.data.options.isDoughnut && (
                    <div className="value-axis-setting">
                      <CheckBox
                        checked={insideLabel}
                        onChange={(e) => setInsideLabel(e.target.checked)}
                        style={{
                          padding: "1rem 1rem 0.5rem 0",
                          fontSize: "0.85rem",
                        }}
                      >
                        {stringFa.total_sum}
                      </CheckBox>
                    </div>
                  )}
                </div>
              )}
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};

export default ChartSetting;

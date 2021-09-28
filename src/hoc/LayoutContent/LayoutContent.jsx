import React, { useState, useEffect } from "react";
import "./LayoutContent.scss";
import Drawer from "../../component/Navigation/Drawer/Drawer";
import Body from "../../container/Body/Body";
import { useTheme } from "../../styles/ThemeProvider";
import Navbar from "../../component/Navigation/Navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import { stringFa } from "../../assets/strings/stringFaCollection";
import SelectBankModal from "../../container/CreateCharts/SelectBankModal/SelectBankModal.jsx";
import * as chartActions from "../../store/actions/chart.js";
import axios from "axios";
import { baseUrl } from "./../../constants/Config";
import ErrorDialog from "../../component/UI/Error/ErrorDialog.jsx";
const PERIOD_INTRAVEL = 60000;
const LayoutContent = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const onToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  const dispatch = useDispatch();

  const detail = useSelector((state) => state.detail);
  const chartsData = useSelector((state) => state.chart);

  const setChartsData = (chartsData) => {
    dispatch(chartActions.setChartsData(chartsData));
  };
  const updateChartData = (chartData) => {
    dispatch(chartActions.updateChartData(chartData));
  };
  const clearCharts = () => {
    dispatch(chartActions.clearCharts());
  };

  function getDifferenceInMinutes(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return Math.floor(diffInMs / (1000 * 60));
  }

  useEffect(async () => {
    clearCharts();
    let result;
    try {
      if (detail.activeBackup) {
        result = await axios.post(`${baseUrl}api/get_charts`, {
          type: "4",
          id: detail.activeBackup.id,
        });
      } else if (detail.software) {
        result = await axios.post(`${baseUrl}api/get_charts`, {
          type: "3",
          id: detail.software.id,
        });
      } else if (detail.company) {
        result = await axios.post(`${baseUrl}api/get_charts`, {
          type: "2",
          id: detail.company.id,
        });
      } else if (detail.holding) {
        result = await axios.post(`${baseUrl}api/get_charts`, {
          type: "1",
          id: detail.holding.id,
        });
      }
      setError(null);
    } catch (error) {
      setError(
        <ErrorDialog onClose={setError}>خطا در دریافت نمودارها</ErrorDialog>
      );
    }
    if (result) {
      let receivedData = result.data.message.result;
      let newChartsData = {};
      receivedData.forEach((item) => {
        newChartsData = {
          ...newChartsData,
          [item.chart._id]: {
            title: item.chart.title,
            type: item.chart.type,
            data: item.chart.data,
            options: item.chart.options,
            config: item.chart.config,
            parent: item.parent,
            lastBankUpdate: item.chart.data_updated_time,
          },
        };
      });
      setChartsData(newChartsData);
    }
  }, [detail.software, detail.holding, detail.company]);

  const timer = async () => {
    let result;
    for (const chartId in chartsData.data) {
      let lastUpdate = new Date(chartsData.data[chartId].config.last_update);
      let period = chartsData.data[chartId].config.period;
      let now = new Date(
        new Date(new Date()).setHours(new Date().getHours() + 1)
      );
      if (getDifferenceInMinutes(now, lastUpdate) > period) {
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
    }
  };
  const countProperties = (obj) => {
    var count = 0;
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) ++count;
    }
    return count;
  };
  useEffect(() => {
    const updateChart = setInterval(() => {
      timer();
    }, PERIOD_INTRAVEL);
    return () => {
      clearInterval(updateChart);
    };
  }, [chartsData]);

  return (
    <div
      className="LayoutContentContainer"
      style={{
        backgroundColor: theme.background_color,
        color: theme.on_background,
      }}
    >
      {error}
      {isModalOpen && (
        <div className="ModalOverlay" style={{ opacity: isModalOpen ? 1 : 0 }}>
          <SelectBankModal isModalOpen={setIsModalOpen} />
        </div>
      )}
      <div
        className={`LeftSectionContainer ${isMenuOpen ? "Reduce" : "extend"}`}
        style={{ width: isMenuOpen ? "87%" : "100%" }}
      >
        <div
          className="NavbarContainer"
          style={{
            backgroundColor: themeState.isDark
              ? theme.surface_4dp
              : theme.surface,
          }}
        >
          <Navbar
            onToggleMenu={onToggleMenu}
            isMenuOpen={isMenuOpen}
            isModalOpen={setIsModalOpen}
          />
        </div>
        <div
          className="BodyContainer"
          style={{
            backgroundImage: chartsData.editMode
              ? `radial-gradient(${
                  themeState.isDark ? theme.border_color : "#BBBBBB"
                } 2px, transparent 2px)`
              : theme.background_color,
            backgroundSize: chartsData.editMode ? "50px 50px" : "0",
          }}
        >
          {detail.software || detail.company || detail.holding ? (
            error ? (
              <Body />
            ) : countProperties(chartsData.data) !== 0 ? (
              <Body />
            ) : (
              <div className="BodyContent">
                <div
                  className="CreateChartContainer"
                  onClick={() => setIsModalOpen(true)}
                >
                  <AddRoundedIcon />
                  <p>{stringFa.create_chart}</p>
                </div>
                {stringFa.no_exist_charts}
              </div>
            )
          ) : (
            <div className="BodyContent">
              {stringFa.clicked_software_to_see_charts}
            </div>
          )}
        </div>
      </div>

      <Drawer onToggleMenu={onToggleMenu} isMenuOpen={isMenuOpen} />
    </div>
  );
};

export default LayoutContent;

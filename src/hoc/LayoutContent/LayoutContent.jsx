import React, { useState, useEffect } from "react";
import "./LayoutContent.scss";
import Drawer from "../../component/Navigation/Drawer/Drawer";
import Body from "../../container/Body/Body";
import { useTheme } from "../../styles/ThemeProvider";
import Navbar from "../../component/Navigation/Navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import { stringFa } from "../../assets/strings/stringFaCollection";
import { Link } from "react-router-dom";
import SelectBankModal from "../../container/CreateCharts/SelectBankModal/SelectBankModal.jsx";
import * as chartActions from "../../store/actions/chart.js";
import axios from "axios";
import { baseUrl } from "./../../constants/Config";
import ErrorDialog from "../../component/UI/Error/ErrorDialog.jsx";

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
  const clearCharts= () => {
    dispatch(chartActions.clearCharts());
  };

  useEffect(async () => {
    clearCharts()
    let result;
    try {
      if (detail.activeBackup) {
        result = await axios.post(`${baseUrl}/get_charts`, {
          type: "4",
          id: detail.activeBackup.id,
        });
      } else if (detail.software) {
        result = await axios.post(`${baseUrl}/get_charts`, {
          type: "3",
          id: detail.software.id,
        });
      } else if (detail.company) {
        result = await axios.post(`${baseUrl}/get_charts`, {
          type: "2",
          id: detail.company.id,
        });
      } else if (detail.holding) {
        result = await axios.post(`${baseUrl}/get_charts`, {
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
          [item._id]: {
            title: item.title,
            type: item.type,
            data: item.data,
            options: item.options,
          },
        };
      });
      setChartsData(newChartsData);
    }
  }, [detail.software, detail.holding, detail.company]);

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
            // alignItems: detail.software
            //   ? banksData.banks
            //     ? "flex-start"
            //     : "center"
            //   : "center",
            // justifyContent: detail.software
            //   ? banksData.banks
            //     ? ""
            //     : "center"
            //   : "center",
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
            ) : chartsData.data && chartsData.data !== {} ? (
              <Body />
            ) : (
              <div className="BodyContent">
                <Link
                  className="CreateChartContainer"
                  to={{
                    pathname: `/create_chart`,
                  }}
                  style={{ textDecoration: "none" }}
                >
                  <AddRoundedIcon />
                  <p>{stringFa.create_chart}</p>
                </Link>
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

import React, { useState, useEffect } from "react";
import "./LayoutContent.scss";
import Drawer from "../../component/Navigation/Drawer/Drawer";
import Body from "../../container/Body/Body";
import { data } from "../../assets/DummyData/data";
import { lightTheme } from "../../styles/theme";
import Navbar from "../../component/Navigation/Navbar/Navbar";
import { useSelector,useDispatch } from "react-redux";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import { stringFa } from "../../assets/strings/strignFa";
import * as bankActions from "../../store/actions/banksData";


const LayoutContent = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const onToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const dispatch = useDispatch();
  const banksData = useSelector((state) => state.banks);
  const detail = useSelector((state) => state.detail);
  const setChartsData = (banks) => {
    dispatch(bankActions.setBankData(banks));
  };
  
  useEffect(() => {
    if (detail.software) {
      let softwareData = data.find(
        (dt) => dt.softwareId === detail.software.id
      );
      if (softwareData) {
        setChartsData(softwareData.banks)
      } else {
        setChartsData()
      }
    } else if (detail.company) {
      let softwaresTemp = [];
      data.forEach((item) => {
        if (item.softwareId.substring(0, 6) === detail.company.id)
          softwaresTemp = [...softwaresTemp, ...item.banks];
      });
      setChartsData(softwaresTemp);
    } else if (detail.holding) {
      let softwaresTemp = [];
      data.forEach((item) => {
        if (item.softwareId.substring(0, 3) === detail.holding.id)
          softwaresTemp = [...softwaresTemp, ...item.banks];
      });
      setChartsData(softwaresTemp);
    }
  }, [detail.software, detail.holding, detail.company]);
  
  return (
    <div
      className="LayoutContentContainer"
      style={{ backgroundColor: lightTheme.background_color }}
    >
      <div
        className={`LeftSectionContaienr ${isMenuOpen ? "Reduce" : "extend"}`}
        style={{ width: isMenuOpen ? "87%" : "100%" }}
      >
        <div className="NavbarConainer">
          <Navbar onToggleMenu={onToggleMenu} isMenuOpen={isMenuOpen} />
        </div>
        <div
          className="BodyContainer"
          style={{
            alignItems: detail.software
              ? banksData.banks
                ? "flex-start"
                : "center"
              : "center",
            justifyContent: detail.software
              ? banksData.banks
                ? ""
                : "center"
              : "center",
          }}
        >
          {detail.software || detail.company || detail.holding ? (
            banksData.banks ? (
              <Body data={banksData.banks} />
            ) : (
              <div className="BodyContent">
                <div className="CreateChartContainer">
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

import React, { useState, useEffect } from "react";
import "./LayoutContent.scss";
import Drawer from "../../component/Navigation/Drawer/Drawer";
import Body from "../../container/Body/Body";
import { data } from "../../assets/DummyData/data";
import { lightTheme } from "../../styles/theme";
import Navbar from "../../component/Navigation/Navbar/Navbar";
import { useSelector } from "react-redux";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import { stringFa } from "../../assets/strings/strignFa";

const LayoutContent = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [softwareExistInData, setSoftwareExistInData] = useState(false);
  const onToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const detail = useSelector((state) => state.detail);

  useEffect(() => {
    if (detail.software) {
      setSoftwareExistInData(data.find((dt) => dt.softwareId === detail.software.id));
    }
  }, [detail.software, data]);

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
              ? softwareExistInData
                ? "flex-start"
                : "center"
              : "center",
            justifyContent: detail.software
              ? softwareExistInData
                ? ""
                : "center"
              : "center",
          }}
        >
          {detail.software? (
            softwareExistInData ? (
              <Body data={softwareExistInData.banks} />
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

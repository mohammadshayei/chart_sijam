import React, { useState, useEffect } from "react";
import "./LayoutContent.scss";
import Drawer from "../../component/Navigation/Drawer/Drawer";
import Body from "../../container/Body/Body";
import { data } from "../../assets/DummyData/data";
import { lightTheme } from "../../styles/theme";
import Navbar from "../../component/Navigation/Navbar/Navbar";
import { useSelector } from "react-redux";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import { green } from "@material-ui/core/colors";

const LayoutContent = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [bodyContent, setBodyContent] = useState(null);

  const onToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const software = useSelector((state) => state.software);

  useEffect(() => {
    data.forEach((item) => {
      if (software.id === item.bankId) {
        setBodyContent(<Body bankId={software.id} />);
      } else {
        setBodyContent(
          <div className="BodyContent">
            <div className="CreateChartContainer">
              <AddRoundedIcon />
              <p>ایجاد نمودار</p>
            </div>
            .نموداری وجود ندارد
          </div>
        );
      }
    });
  }, [software.id]);

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
        <div className="BodyContainer">{bodyContent}</div>
      </div>

      <Drawer onToggleMenu={onToggleMenu} isMenuOpen={isMenuOpen} />
    </div>
  );
};

export default LayoutContent;

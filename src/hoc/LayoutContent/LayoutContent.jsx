import React, { useState } from "react";
import "./LayoutContent.scss";
import Drawer from "../../component/Navigation/Drawer/Drawer";
import Body from "../../container/Body/Body";
import { lightTheme } from "../../styles/theme";
import Navbar from "../../component/Navigation/Navbar/Navbar";
const LayoutContent = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const onToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
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
        <div className="BodyContainer">
          <Body />
        </div>
      </div>

        <Drawer onToggleMenu={onToggleMenu} isMenuOpen={isMenuOpen} />

    </div>
  );
};

export default LayoutContent;

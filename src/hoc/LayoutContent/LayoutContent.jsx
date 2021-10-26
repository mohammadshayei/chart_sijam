import React, { useState, useEffect } from "react";
import "./LayoutContent.scss";
import Drawer from "../../component/Navigation/Drawer/Drawer";
import BodyViewContainer from "../../container/Body/BodyViewContainer/BodyViewContainer.jsx";
import { useTheme } from "../../styles/ThemeProvider";
import Navbar from "../../component/Navigation/Navbar/Navbar";
import { useLocation } from "react-router";
import BodySetting from "../../container/Body/BodySetting/BodySetting";

const LayoutContent = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [bodyComponent, setBodyComponent] = useState(null)
  const onToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const themeState = useTheme();
  const theme = themeState.computedTheme;
  const location = useLocation();

  useEffect(() => {

    switch (location.pathname) {
      case '/view':
        setBodyComponent(<BodyViewContainer />)
        break;
      case '/view/setting':
        setBodyComponent(<BodySetting />)
        break;
      default:
        setBodyComponent(<BodyViewContainer />)

        break;
    }
  }, [location.pathname])



  return (
    <div
      className="Layout-container"
      style={{
        backgroundColor: theme.background_color,
        color: theme.on_background,
      }}
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
        />
      </div>

      <div className='layout-content'>
        {bodyComponent}
        <Drawer onToggleMenu={onToggleMenu} isMenuOpen={isMenuOpen} />
      </div>
    </div>
  );
};
export default React.memo(LayoutContent);


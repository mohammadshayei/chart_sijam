import React, { useEffect, useState } from "react";
import "./Drawer.scss";
import Header from "./Header/Header";
import { useTheme } from "../../../styles/ThemeProvider";

import DrawerViewCharts from "./DrawersContent/DrawerViewCharts/DrawerViewCharts";
import { useLocation } from "react-router";
import DrawerSetting from "./DrawersContent/DrawerSetting/DrawerSetting";

const Drawer = React.memo((props) => {
  const [content, setContent] = useState(null);
  const themeState = useTheme();
  const theme = themeState.computedTheme;
  const [error, setError] = useState(null);

  const location = useLocation();
  useEffect(() => {
    switch (location.pathname) {
      case "/view":
        setContent(<DrawerViewCharts />);
        break;
      case "/view/setting":
        setContent(<DrawerSetting />);
        break;
      default:
        break;
    }
  }, [location.pathname]);
  return (
    <div
      className={`DrawerContainer ${
        props.isMenuOpen ? "ShowDrawer" : "HideDrawer"
      }`}
      style={{
        backgroundColor: themeState.isDark ? theme.surface_12dp : theme.surface,
      }}
    >
      {error}
      <Header onToggleMenu={props.onToggleMenu} />
      {content && content}
    </div>
  );
});

export default Drawer;

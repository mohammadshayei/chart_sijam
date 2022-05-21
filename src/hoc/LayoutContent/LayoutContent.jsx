import React, { useState, useEffect } from "react";
import "./LayoutContent.scss";
import Drawer from "../../component/Navigation/Drawer/Drawer";
import BodyViewContainer from "../../container/Body/BodyViewContainer/BodyViewContainer.jsx";
import { useTheme } from "../../styles/ThemeProvider";
import Navbar from "../../component/Navigation/Navbar/Navbar";
import { useLocation } from "react-router";
import BodySetting from "../../container/Body/BodySetting/BodySetting";
import { useSelector, useDispatch } from "react-redux";
import * as addChartActions from "../../store/actions/addChart";
import Modal from "../../component/UI/Modal/Modal";
import CreateCharts from "../../container/CreateCharts/CreateCharts";
import BodyUserProfile from "../../container/Body/BodyUserProfile/BodyUserProfile";

const LayoutContent = (props) => {
  const chartsData = useSelector((state) => state.addChart);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [bodyComponent, setBodyComponent] = useState(null);
  const [showDrawer, setShowDrawer] = useState(true);
  const onToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const themeState = useTheme();
  const theme = themeState.computedTheme;
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/view":
        setBodyComponent(<BodyViewContainer isMenuOpen={isMenuOpen} />);
        setShowDrawer(true);
        break;
      case "/view/setting":
        setBodyComponent(<BodySetting />);
        setShowDrawer(true);
        break;
      case "/view/user":
        setBodyComponent(<BodyUserProfile />);
        setShowDrawer(false);
        break;
      default:
        setBodyComponent(<BodyViewContainer isMenuOpen={isMenuOpen} />);
        setShowDrawer(true);
        break;
    }
  }, [location.pathname, isMenuOpen]);
  const dispatch = useDispatch();
  const fullscreenChart = (isFullscreen) => {
    dispatch(addChartActions.fullscreenChart(isFullscreen));
  };

  const outsideModalClick = () => {
    fullscreenChart({ isFullscreen: false });
  };

  return (
    <div
      className="Layout-container"
      style={{
        backgroundColor: theme.background_color,
        color: theme.on_background,
      }}
    >
      <Modal
        show={chartsData.isFullscreen}
        // modalClosed={outsideModalClick}
        style={{ padding: "0", width: "95%", height: "90%" }}
      >
        <CreateCharts />
      </Modal>
      <div
        className="NavbarContainer"
        style={{
          backgroundColor: themeState.isDark
            ? theme.surface_4dp
            : theme.surface,
        }}
      >
        <Navbar onToggleMenu={onToggleMenu} isMenuOpen={isMenuOpen} />
      </div>

      <div className="layout-content">
        {bodyComponent}
        {showDrawer && (
          <Drawer onToggleMenu={onToggleMenu} isMenuOpen={isMenuOpen} />
        )}
      </div>
    </div>
  );
};
export default React.memo(LayoutContent);

import React from "react";
import "./Drawer.scss";
import Header from "./Header/Header";
import MenuItems from "./MenuItems/MenuItems";
import { useTheme } from "../../../styles/ThemeProvider";

const Drawer = React.memo((props) => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  return (
    <div
      className={`DrawerContainer ${
        props.isMenuOpen ? "ShowDrawer" : "HideDrawer"
      }`}
      style={{
        backgroundColor: themeState.isDark ? theme.surface_12dp : theme.surface,
      }}
    >
      <Header onToggleMenu={props.onToggleMenu} />
      <MenuItems />
    </div>
  );
});

export default Drawer;

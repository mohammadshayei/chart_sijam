import React, {  } from "react";
import "./Drawer.scss";
import Header from "./Header/Header";
import MenuItems from "./MenuItems/MenuItems";
const Drawer = React.memo((props) => {
  return (
    <div className={`DrawerContainer ${props.isMenuOpen ? "ShowDrawer" : "HideDrawer"}`}>
      <Header onToggleMenu={props.onToggleMenu}  />
      <MenuItems />
    </div>
  );
});

export default Drawer;

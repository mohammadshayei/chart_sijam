import React from "react";
import classes from "./LayoutContent.module.scss";
import Drawer from "../../component/Navigation/Drawer/Drawer";
import Body from "../../container/Body/Body";
import Navbar from "../../component/Navigation/Navbar/Navbar";
const LayoutContent = (props) => {
  return (
    <div className={classes.LayoutContentContainer}>
      <div className={classes.LeftSectionContaienr}>
        <div className={classes.NavbarConainer}>
          <Navbar />
        </div>
        <div className={classes.BodyContainer}>
          <Body />
        </div>
      </div>
      <div className={classes.RightSectionContaienr}>
        <Drawer />
      </div>
    </div>
  );
};

export default LayoutContent;

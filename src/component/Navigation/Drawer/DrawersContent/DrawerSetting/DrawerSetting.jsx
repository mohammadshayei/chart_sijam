import React, { useState } from "react";
import { stringFa } from "../../../../../assets/strings/stringFaCollection";
import "./DrawerSetting.scss";
import { DrawerSettingItem } from "./DrawerSettingItem/DrawerSettingItem";
const DrawerSetting = () => {
  const [order, setOrder] = useState({
    customization: {
      isSelected: true,
      icon: "customization",
      title: stringFa.customization,
      onClick: () => {},
    },
    users: {
      isSelected: false,
      icon: "users",
      title: stringFa.users,
      onClick: () => {},
    },
    permissions: {
      isSelected: false,
      icon: "permissions",
      title: stringFa.permissions,
      onClick: () => {},
    },
  });

  const onMenuItemClick = (e, key) => {
    const updatedOrder = { ...order };
    const updatedItem = updatedOrder[key];
    if (!updatedItem.isSelected) {
      for (const itemKey in updatedOrder) {
        updatedOrder[itemKey].isSelected = false;
      }
      updatedItem.isSelected = true;
    }
    updatedOrder[key] = updatedItem;
    setOrder(updatedOrder);
  };
  return (
    <div className="MenuItemsContainer">
      {Object.entries(order).map(([k, v]) => {
        if (v.isSelected) {
        }
        return (
          <DrawerSettingItem
            key={k}
            isSelected={v.isSelected}
            icon={v.icon}
            title={v.title}
            onClick={(e) => {
              onMenuItemClick(e, k);
              v.onClick && v.onClick();
            }}
          />
        );
      })}
    </div>
  );
};

export default DrawerSetting;

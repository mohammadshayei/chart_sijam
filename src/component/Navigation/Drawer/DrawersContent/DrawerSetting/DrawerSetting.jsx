import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { stringFa } from "../../../../../assets/strings/stringFaCollection";
import { DrawerSettingItem } from "./DrawerSettingItem/DrawerSettingItem";
const DrawerSetting = () => {
  const baseAdminMenuOrders = {
    customization: {
      isSelected: true,
      icon: "customization",
      title: stringFa.customization,
      onClick: () => { },
    },
    users: {
      isSelected: false,
      icon: "users",
      title: stringFa.users,
      onClick: () => { },
    },
    permissions: {
      isSelected: false,
      icon: "permissions",
      title: stringFa.permissions,
      onClick: () => { },
    },
  }
  const [order, setOrder] = useState(baseAdminMenuOrders);
  const user = useSelector(state => state.auth.user)


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
  useEffect(() => {
    if (user) {
      if (user.is_fekrafzar) {
        setOrder(baseAdminMenuOrders)
      }
    }
  }, [user])
  return (
    <div className="MenuItemsContainer">
      {Object.entries(order).map(([k, v], index) => {
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
            index={index}
          />
        );
      })}
    </div>
  );
};

export default DrawerSetting;

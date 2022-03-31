import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { stringFa } from "../../../../../assets/strings/stringFaCollection";
import { DrawerSettingItem } from "./DrawerSettingItem/DrawerSettingItem";
const DrawerSetting = () => {
  const selectedHolding = useSelector((state) => state.holdingDetail.selectedHolding);
  const location = useLocation()

  const baseAdminMenuOrders = {
    customization: {
      isSelected: false,
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


  useEffect(() => {
    if (!selectedHolding) return;
    let updatedOrder = {}
    if (selectedHolding.customization) {
      updatedOrder = {
        ...updatedOrder, customization: {
          isSelected: false,
          icon: "customization",
          title: stringFa.customization,
          onClick: () => { },
        },
      }
    }
    if (selectedHolding.users) {
      updatedOrder = {
        ...updatedOrder,
        users: {
          isSelected: false,
          icon: "users",
          title: stringFa.users,
          onClick: () => { },
        },
      }
    }
    if (selectedHolding.permissions) {
      updatedOrder = {
        ...updatedOrder, permissions: {
          isSelected: false,
          icon: "permissions",
          title: stringFa.permissions,
          onClick: () => { },
        },
      }
    }
    setOrder(updatedOrder)
  }, [selectedHolding])

  useEffect(() => {
    if (!selectedHolding) return;
    const searchParams = new URLSearchParams(location.search);
    const menu_item = searchParams.get("menu_item");
    let updatedOrder = { ...order }
    switch (menu_item) {
      case '1':
        console.log('1')
        updatedOrder.customization.isSelected = true;
        updatedOrder.users.isSelected = false;
        updatedOrder.permissions.isSelected = false;
        break;
      case '2':
        console.log('2')
        updatedOrder.customization.isSelected = false;
        updatedOrder.users.isSelected = true;
        updatedOrder.permissions.isSelected = false;

        break;
      case '3':
        console.log('3')
        updatedOrder.customization.isSelected = false;
        updatedOrder.users.isSelected = false;
        updatedOrder.permissions.isSelected = true;
        break;
      default:
        console.log('4')
        updatedOrder.customization.isSelected = true;
        updatedOrder.users.isSelected = false;
        updatedOrder.permissions.isSelected = false;
        break;
    }
    setOrder(updatedOrder)
  }, [location, selectedHolding])

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
      {Object.entries(order).map(([k, v], index) => {
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

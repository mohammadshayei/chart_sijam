import React, { useState, useEffect } from "react";
import MenuItem from "../../../UI/MenuItem/MenuItem";
import "./MenuItems.scss";
import { useDispatch, useSelector } from "react-redux";
import { data } from "../../../../assets/dummy_data/TestData";
import * as actions from "../../../../store/actions/detail";

const MenuItems = () => {
  const [dataItems, setDataItems] = useState([]);
  const [unClicked, setUnClicked] = useState("");
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.detail);

  const selectSoftware = (software) => {
    dispatch(actions.selectSoftware(software));
  };
  const selectCompany = (company) => {
    dispatch(actions.selectCompany(company));
  };
  const selectHolding = (holding) => {
    dispatch(actions.selectHolding(holding));
  };
  const clearSoftware = () => {
    dispatch(actions.clearSoftware());
  };
  const clearCompany = () => {
    dispatch(actions.clearCompany());
  };
  const clearHolding = () => {
    dispatch(actions.clearHolding());
  };
  const clearBanks = () => {
    dispatch(actions.clearBanks());
  };
  const setMenuData = (inputData, arrType, index) => {
    let newData = dataItems;
    newData.splice(
      index + 1,
      0,
      ...inputData.map((item) => ({
        data: arrType ? item[arrType] : null,
        id: item.id,
        name: item.name,
        type: item.type,
      }))
    );
    setDataItems([...newData]);
  };
  const onMenuItemClickHandler = (id, type, inputData, index, name) => {
    setUnClicked('')
    clearBanks();
    let arrType;
    if (type === "holding") {
      arrType = "softwares";
    } else if (type === "company") {
      arrType = "banks";
    } else if (type === "software") {
    } else if (type === "banks") {
      arrType = "";
    }
    // let finded = clickedList.find((item) => item === `${type}${name}`);
    switch (type) {

      case "holding":
        if (detail.holding && detail.holding.id === id) {
          setUnClicked(id)
          clearHolding();
          clearSoftware();
          clearCompany();
          let newDataItmes = dataItems.filter((i) => i.type === "holding");
          setDataItems([...newDataItmes]);
        } else {
          selectHolding({
            id,
            name,
            companies: inputData,
            type,
          });
          setMenuData(inputData, arrType, index);
        }
        break;
      case "company":
        if (detail.company && detail.company.id === id) {
          setUnClicked(id)
          clearCompany();
          clearSoftware();
          let newDataItmes = dataItems;
          newDataItmes.splice(index + 1, inputData.length);
          setDataItems(newDataItmes);
        } else {
          selectCompany({
            id,
            name,
            softwares: inputData,
            type,
          });
          setMenuData(inputData, arrType, index);
        }
        break;
      case "software":
        selectSoftware({
          id,
          name,
          banks: inputData,
          type,
        });
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    setDataItems(
      data.map((item) => ({
        id: item.id,
        data: item.companies,
        name: item.name,
        type: item.type,
        parent: item.parent,
      }))
    );
  }, []);
  useEffect(() => {}, [dataItems]);
  return (
    <div className="MenuItemsContainer">
      {dataItems.length > 0
        ? dataItems.map((item, index) => (
            <MenuItem
              onClick={onMenuItemClickHandler}
              key={item.id}
              data={item.data}
              id={item.id}
              name={item.name}
              type={item.type}
              parent={item.parent}
              index={index}
              unClicked={unClicked}
            />
          ))
        : null}
    </div>
  );
};

export default MenuItems;

import React, { useState, useEffect, useCallback } from "react";
import MenuItem from "../../../UI/MenuItem/MenuItem";
import "./MenuItems.scss";
import { useDispatch } from "react-redux";
import { data } from "../../../../assets/dummy_data/TestData";
import * as actions from "../../../../store/actions/detail";

const MenuItems = () => {
  const [dataItems, setDataItems] = useState([]);
  const [clickedList, setClickedList] = useState([]);
  const [closedList, setClosedList] = useState([]);
  const dispatch = useDispatch();
  const selectSoftware = (software) => {
    dispatch(actions.selectSoftware(software));
  };
  const clearSoftware = () => {
    dispatch(actions.clearSoftware());
  };
  const clearBanks = () => {
    dispatch(actions.clearBanks());
  };
  const onMenuItemClickHandler = (id, type, inputData, index, name) => {
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
    let finded = clickedList.find((item) => item === `${type}${name}`);
    if (finded) {
      let newData = dataItems;
      newData.splice(index + 1, inputData.length);
      setDataItems([...newData]);
      if (type === "holding") {
        let newClickedList = clickedList.filter((i) => i !== `${type}${name}`);
        let newClosedList = closedList;
        setClickedList([...newClickedList]);
        setClosedList([...closedList, `${type}${name}`]);

        // this line have a bug and must to fix when we have more than 2 holdings
        let newDataItmes = dataItems.filter((i) => i.type === "holding");
        // setDataItems([...dataItems.filter((i) => i.parent !== name)]);
        setDataItems([...newDataItmes]);
        clearSoftware();
        inputData.forEach((dt) => {
          if (newClickedList.find((ncl) => ncl === `${dt.type}${dt.name}`)) {
            newClosedList.push(`${dt.type}${dt.name}`);
            newClickedList = newClickedList.filter(
              (i) => i !== `${dt.type}${dt.name}`
            );

            setClickedList([...newClickedList]);
          }
        });
        setClosedList([...newClickedList]);
      } else {
        setClickedList([...clickedList.filter((i) => i !== `${type}${name}`)]);
        setClosedList([...closedList, `${type}${name}`]);
      }

      return;
    }

    if (type === "software") {
      let p;
      for (let i = index; i >= 0; i--) {
        if (dataItems[i].type === "company") {
          p = dataItems[i].name;
          break;
        }
      }
      // selectSoftware(id, name, inputData, type, p);
      selectSoftware({
        id,
        name,
        banks: inputData,
        type,
        parent: p,
      });
    } else {
      let newData = dataItems;
      newData.splice(
        index + 1,
        0,
        ...inputData.map((item) => ({
          data: arrType ? item[arrType] : null,
          id: item.id,
          name: item.name,
          type: item.type,
          parent: name,
        }))
      );
      setDataItems([...newData]);
      setClickedList([...clickedList, `${type}${name}`]);
      setClosedList([...closedList.filter((i) => i !== `${type}${name}`)]);
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
              clickedList={clickedList}
              closedList={closedList}
            />
          ))
        : null}
    </div>
  );
};

export default MenuItems;

import React, { useState, useEffect } from "react";
import MenuItem from "../../../UI/MenuItem/MenuItem";
import "./MenuItems.scss";
import { v4 as uuidv4 } from "uuid";
import { data } from "../../../../assets/dummy_data/TestData";
const MenuItems = () => {
  const [ItemsComponent, setItemsComponent] = useState(null);
  const [dataItems, setDataItems] = useState(null);
  const [clickedList, setClickedList] = useState([]);

  const onMenuItemClickHandler = (type, inputData, index, name) => {
    let arrType;
    if (type === "holding") arrType = "softwares";
    else if (type === "company") arrType = "banks";
    else if (type === "banks") arrType = "";
    let finded = clickedList.find((item) => item === `${type}${name}`);
    if (finded) {
      let newData = dataItems;
      newData.splice(index + 1, inputData.length);
      setDataItems([...newData]);
      setClickedList([...clickedList.filter((i) => i !== `${type}${name}`)]);
      return;
    }
    if (type === "software") {
      setClickedList([...clickedList, `${type}${name}`]);
      console.log([...clickedList, `${type}${name}`])
    } else {
      let newData = dataItems;
      newData.splice(
        index + 1,
        0,
        ...inputData.map((item) => ({
          data: arrType ? item[arrType] : null,
          name: item.name,
          type: item.type,
        }))
      );
      setDataItems([...newData]);
      setClickedList([...clickedList, `${type}${name}`]);
    }
  };
  useEffect(() => {
    setDataItems(
      data.map((item) => ({
        data: item.companies,
        name: item.name,
        type: item.type,
      }))
    );
    setItemsComponent(
      data.map((item, index) => (
        <MenuItem
          onClick={onMenuItemClickHandler}
          key={`${uuidv4()}`}
          data={item.companies}
          name={item.name}
          type={item.type}
          index={index}
          clickedList={clickedList}
        />
      ))
    );
  }, []);
  useEffect(() => {
    if (dataItems) {
      setItemsComponent(
        dataItems.map((item, index) => (
          <MenuItem
            onClick={onMenuItemClickHandler}
            key={`${uuidv4()}`}
            data={item.data}
            name={item.name}
            type={item.type}
            index={index}
            clickedList={clickedList}
          />
        ))
      );
    }
  }, [dataItems]);
  return (
    <div className="MenuItemsContainer">
      {ItemsComponent ? ItemsComponent : null}
    </div>
  );
};

export default MenuItems;

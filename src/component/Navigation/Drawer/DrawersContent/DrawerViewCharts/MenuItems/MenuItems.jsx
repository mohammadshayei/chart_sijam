import React, { useState, useEffect } from "react";
import MenuItem from "../../../../../UI/MenuItem/MenuItem";
import "./MenuItems.scss";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../../../store/actions/detail";
import * as chartActions from "../../../../../../store/actions/chart";

import axios from "axios";
import { baseUrl } from "../../../../../../constants/Config";
import DropDown from "../../../../../UI/DropDown/DropDown";
import SkeletonMenuItem from "../../../../../Skeletons/skeletonMenuItem.jsx";
import ErrorDialog from "../../../../../UI/Error/ErrorDialog.jsx";
import SkeletonElement from "../../../../../Skeletons/SkeletonElement.jsx";
import SkeletTextItem from "../../../../../Skeletons/SkeletTextItem";

const MenuItems = () => {
  const [unClicked, setUnClicked] = useState("");
  const [clickedId, setClickedId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [rightClick, setRightClick] = useState(false);

  // const [items, setItems] = useState({ holdings: [] });
  const dispatch = useDispatch();
  const [activeBackups, setActiveBackups] = useState(null);
  const [isSoftwareClicked, setIsSoftwareClicked] = useState(false);
  const [popupStyle, setPopupStyle] = useState({});
  const [popupContentStyle, setPopupContentStyle] = useState({});
  const [error, setError] = useState(null);

  const detail = useSelector((state) => state.detail);
  const items = useSelector((state) => state.detail.items);
  const token = useSelector((state) => state.auth.token);

  const chartsLoading = useSelector((state) => state.chart.loading);

  const setLoading = (loading) => {
    dispatch(chartActions.setChartsLoading(loading));
  };
  const setItems = (items) => {
    dispatch(actions.setItems(items));
  };
  const selectActiveBackup = (activeBackup) => {
    dispatch(actions.selectActiveBackup(activeBackup));
  };
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
  const clearActiveBackup = () => {
    dispatch(actions.clearActiveBackup());
  };

  const onRightClickHandler = (e, id, type, parent) => {
    setPopupStyle({
      top: e.nativeEvent.clientY,
      left: e.nativeEvent.clientX,
      transform: "translate(-100%,-30%)",
      animation: "none",
    });
    setPopupContentStyle({
      padding: "0.5rem",
      minWidth: "10rem",
    });
    setRightClick(true);
    if (type === "software") {
      setIsSoftwareClicked(true);
      let updatedItems = { ...items };
      let updatedHoldings = [...updatedItems.holdings];
      let updatedHoldingIndex = updatedHoldings.findIndex(
        (holding) => holding.id === parent[0]
      );
      if (updatedHoldingIndex < 0) return;
      let updatedCompanies = [
        ...updatedHoldings[updatedHoldingIndex].companies,
      ];
      let updatedComapnyIndex = updatedCompanies.findIndex(
        (comapny) => comapny.id === parent[1]
      );
      if (updatedComapnyIndex < 0) return;
      let software = updatedHoldings[updatedHoldingIndex].companies[
        updatedComapnyIndex
      ].softwares.find((software) => software.id === id);
      selectSoftware(software);
    }
  };

  const onMenuItemClickHandler = async (id, type, parent) => {
    setUnClicked("");
    clearActiveBackup();
    clearBanks();
    if (type === "holding") {
      setIsSoftwareClicked(false);
      let updatedItems = { ...items };
      let updatedHoldings = [...updatedItems.holdings];
      const updatedHoldingIndex = updatedHoldings.findIndex(
        (holding) => holding.id === id
      );
      if (updatedHoldingIndex < 0) return;
      if (detail.holding && detail.holding.id === id) {
        setClickedId(null);
        setUnClicked(id);
        clearHolding();
        clearSoftware();
        clearCompany();
        updatedHoldings[updatedHoldingIndex].isActive = false;
      } else {
        setClickedId({ id, type });
        for (let index = 0; index < updatedHoldings.length; index++) {
          updatedHoldings[index].isActive = false;
        }
        selectHolding(updatedHoldings[updatedHoldingIndex]);
        updatedHoldings[updatedHoldingIndex].isActive = true;
        setLoading(true);
        const result = await axios.post(`${baseUrl}api/get_companies`,
          {
            code: updatedHoldings[updatedHoldingIndex].code,
          },
          { headers: { 'auth-token': token } }
        );
        setLoading(false);
        updatedHoldings[updatedHoldingIndex].companies =
          result.data.message.result;
      }
      updatedItems.holdings = updatedHoldings;
      setItems(updatedItems);
    } else if (type === "company") {
      setIsSoftwareClicked(false);

      let updatedItems = { ...items };
      let updatedHoldings = [...updatedItems.holdings];
      let updatedHoldingIndex = updatedHoldings.findIndex(
        (holding) => holding.id === parent[0]
      );
      if (updatedHoldingIndex < 0) return;
      let updatedCompanies = [
        ...updatedHoldings[updatedHoldingIndex].companies,
      ];
      let updatedComapnyIndex = updatedCompanies.findIndex(
        (comapny) => comapny.id === id
      );
      if (updatedComapnyIndex < 0) return;

      if (detail.company && detail.company.id === id) {
        setUnClicked(id);
        setClickedId(null);
        clearSoftware();
        clearCompany();
        updatedCompanies[updatedComapnyIndex].isActive = false;
      } else {
        setClickedId({ id, type });
        for (let index = 0; index < updatedCompanies.length; index++) {
          updatedCompanies[index].isActive = false;
        }
        selectCompany(updatedCompanies[updatedComapnyIndex]);
        updatedCompanies[updatedComapnyIndex].isActive = true;
        setLoading(true);
        const result = await axios.post(`${baseUrl}api/get_softwares`, {
          code: updatedCompanies[updatedComapnyIndex].code,
        }, { headers: { 'auth-token': token } });
        setLoading(false);
        updatedCompanies[updatedComapnyIndex].softwares =
          result.data.message.result;
      }
      updatedHoldings[updatedHoldingIndex].companies = updatedCompanies;
      updatedItems.holdings = updatedHoldings;
      setItems(updatedItems);
    } else if (type === "software") {
      setClickedId({ id, type });
      setIsSoftwareClicked(true);
      let updatedItems = { ...items };
      let updatedHoldings = [...updatedItems.holdings];
      let updatedHoldingIndex = updatedHoldings.findIndex(
        (holding) => holding.id === parent[0]
      );
      if (updatedHoldingIndex < 0) return;
      let updatedCompanies = [
        ...updatedHoldings[updatedHoldingIndex].companies,
      ];
      let updatedComapnyIndex = updatedCompanies.findIndex(
        (comapny) => comapny.id === parent[1]
      );
      if (updatedComapnyIndex < 0) return;
      let software = updatedHoldings[updatedHoldingIndex].companies[
        updatedComapnyIndex
      ].softwares.find((software) => software.id === id);
      selectSoftware(software);
      setLoading(true);
      const softwareReq = await axios.post(`${baseUrl}api/get_active_backup`, {
        id: software.id,
      }, { headers: { 'auth-token': token } });
      setLoading(false);
      const activeBackup = softwareReq.data.message.result[0];
      selectActiveBackup(activeBackup);
    }
  };

  useEffect(async () => {
    if (!isSoftwareClicked || !rightClick) return;
    if (detail.software) {
      setActiveBackups(null);
      let result;
      try {
        setLoading(true);
        result = await axios.post(`${baseUrl}api/get_active_backup`, {
          id: detail.software.id,
        }, { headers: { 'auth-token': token } });
        setLoading(false);
        if (result.data.success) {
          setActiveBackups(result.data.message.result);
        }
      } catch (error) {
        setError(
          <ErrorDialog onClose={setError}>خطا در دریافت اطلاعات</ErrorDialog>
        );
      }
    }
  }, [detail.software, isSoftwareClicked]);

  useEffect(async () => {
    if (!token) return
    setLoading(true);
    const result = await axios.get(`${baseUrl}api/get_holdings`, { headers: { 'auth-token': token } });
    setLoading(false);
    const holdings = result.data.message.result.map((item) => {
      return {
        ...item,
        companies: [],
        isActive: false,
      };
    });
    setItems({
      type: "holding",
      url: "get_holdings",
      holdings: [...holdings],
    });
  }, [token]);

  useEffect(() => {
    let updatedOrders = [];
    items.holdings.forEach((holding) => {
      updatedOrders.push({
        type: "holding",
        parent: [],
        content: holding,
      });
      if (holding.companies && holding.isActive) {
        holding.companies.forEach((company) => {
          updatedOrders.push({
            type: "company",
            parent: [holding.id],
            content: company,
          });
          if (company.softwares && company.isActive) {
            company.softwares.forEach((software) => {
              updatedOrders.push({
                type: "software",
                parent: [holding.id, company.id],
                content: software,
              });
            });
          }
        });
      }
    });
    setOrders(updatedOrders);
  }, [items]);
  useEffect(() => {
    if (clickedId && clickedId.type === "software") return;
    if (chartsLoading) {
      let newOrders = [...orders];
      orders.forEach((item, index) => {
        if (item.content.id === clickedId.id) {
          let addedItems = [
            {
              content: {},
              parent: [],
              type: "*****loading*****",
            },
            {
              content: {},
              parent: [],
              type: "*****loading*****",
            },
            {
              content: {},
              parent: [],
              type: "*****loading*****",
            },
          ];
          newOrders.splice(index + 1, 0, ...addedItems);
        }
      });
      setOrders(newOrders);
    } else {
      let newOrders = orders.filter(
        (item) => item.type !== "*****loading*****"
      );
      setOrders(newOrders);
    }
  }, [chartsLoading]);
  return (
    <div className="MenuItemsContainer">
      {error}
      {rightClick && (
        <DropDown
          divStyle={{ ...popupStyle }}
          contentStyle={{ ...popupContentStyle }}
          items={
            activeBackups
              ? activeBackups
              : [{ name: <SkeletonElement type="text" /> }]
          }
          onClick={() => { }}
          setDropDown={setRightClick}
        />
      )}
      {orders &&
        orders.map((item, index) => {
          if (item.type === "*****loading*****") {
            if (clickedId.type === "company")
              return <SkeletTextItem key={item.content.id} />;
            else return <SkeletonMenuItem key={item.content.id} />;
          } else
            return (
              <MenuItem
                onClick={onMenuItemClickHandler}
                key={item.content.id}
                id={item.content.id}
                name={item.content.name}
                type={item.type}
                parent={item.parent}
                index={index}
                unClicked={unClicked}
                onRightClickHandler={onRightClickHandler}
              />
            );
        })}
      {orders.length === 0 &&
        [1, 2, 3].map((n) => <SkeletonMenuItem key={n} />)}
    </div>
  );
};

export default React.memo(MenuItems);

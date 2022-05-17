import "./BanksContainer.scss";
import { useDispatch, useSelector } from "react-redux";
import Bank from "./Bank/Bank";
import { useTheme } from "../../../../styles/ThemeProvider.js";
import { stringFa } from "../../../../assets/strings/stringFaCollection";
import * as detailActions from "../../../../store/actions/detail";
import * as chartActions from "../../../../store/actions/chart";

import { useEffect, useState } from "react";
import { getChartsDataWithSameFilter, getChartsDataWithSpecificFilter } from "../../../../api/home";
import ErrorDialog from "../../../../component/UI/Error/ErrorDialog";

const BanksContainer = () => {
  const [filterList, setFilterList] = useState([])
  const [loading, setLoading] = useState('')
  const [error, setError] = useState(null)

  const { selectedBanks, banks, unityFilter } = useSelector((state) => state.detail);
  const { data } = useSelector((state) => state.chart);
  const { token } = useSelector((state) => state.auth);


  const dispatch = useDispatch();

  const themeState = useTheme();
  const theme = themeState.computedTheme;

  const changeBankItemStatus = (_id, status) => {
    dispatch(detailActions.changeBankItemStatus({ _id, status }));
  };

  const changeSelectedMenuItems = (payload) => {
    dispatch(detailActions.changeSelectedMenuItems(payload));
  };
  const setChartsData = (chartsData) => {
    dispatch(chartActions.setChartsData(chartsData));
  };

  const onBankItemClickHandler = (_id, parents, selected) => {
    changeBankItemStatus(_id, !selected)
    let payload;
    if (!selected) {
      payload = { key: "selectedBanks", value: _id, parents, mode: 'add' }
      changeSelectedMenuItems(payload)
      payload = { key: "selectedActiveBackups", value: parents[2], mode: 'sub' }
      changeSelectedMenuItems(payload)
    }
    else {
      payload = { key: "selectedBanks", value: _id, mode: 'sub' }
      changeSelectedMenuItems(payload)
      let existCount = selectedBanks.filter(item => item.parents[2] === parents[2])
      if (existCount.length <= 1) {
        payload = { key: "selectedActiveBackups", parents: [parents[0], parents[1]], value: parents[2], mode: 'add' }
        changeSelectedMenuItems(payload)
      }
    }
  }
  const onClickFilter = async (id) => {
    let filterName, selectedIndex;
    let updatedList = [...filterList]
    updatedList.forEach((item, index) => {
      if (item._id === id) {
        filterName = updatedList[index].name
        updatedList[index].selected = !updatedList[index].selected
        selectedIndex = index;
      }
      else
        updatedList[index].selected = false
    })
    setLoading(id)
    let result;
    setError(null)
    try {
      if (updatedList[selectedIndex].selected) {
        let payload = { chartsId: [...Object.entries(data).map(([k, _]) => k)], filterName }
        result = await getChartsDataWithSameFilter(payload, token)
        if (!result.success)
          setError(<ErrorDialog onClose={setError}>{result.error}</ErrorDialog>)
        let updatedCharts = { ...data }
        result.data.forEach(item => {
          updatedCharts[item._id].data = item.data
          updatedCharts[item._id].selectedFilterId = updatedCharts[item._id].dataInfo.filters.find(item => item.filter.name === filterName)?._id
        })
        setChartsData(updatedCharts)
      }

      setLoading('')
      setFilterList(updatedList)
    } catch (error) {
      setLoading('')
      setFilterList(updatedList)
      console.log(error)
      setError(<ErrorDialog onClose={setError}>{stringFa.error_occured_try_again}</ErrorDialog>)
    }



  }
  useEffect(() => {
    if (!data) return;
    let updatedFilterList = []
    Object.entries(data).forEach(([_, chart], chartIndex) => {
      if (chartIndex === 0) {
        updatedFilterList = chart.dataInfo.filters.map(item => { return { name: item.filter.name, _id: item._id, selected: false, exist: true } })
      } else {
        updatedFilterList = updatedFilterList.filter(item => item.exist).map(item => {
          return {
            ...item,
            exist: chart.dataInfo?.filters?.findIndex(i => i.filter.name === item.name) < 0 ? false : true
          }
        })
      }
    })
    setFilterList(updatedFilterList.filter(item => item.exist))
  }, [data])
  return (
    <div
      className="banks-container"
      style={{
        borderColor: theme.border_color,
        backgroundColor: themeState.isDark
          ? theme.surface_12dp
          : theme.surface,
      }}
    >
      {error}
      {
        unityFilter ?
          <>
            {
              filterList?.map((item, index) => (
                <Bank key={item._id} {...item} onClick={() => onClickFilter(item._id)} mode='filter' loading={loading} />
              ))
            }
            {
              filterList.length === 0 && <p style={{ fontSize: '13px' }}>{stringFa.no_exist_unity_filter_list}</p>
            }
          </>
          :
          <>
            {
              banks?.map((item, index) => (
                <Bank key={item._id} {...item} onClick={onBankItemClickHandler} />
              ))
            }
            {
              banks.length === 0 && <p style={{ fontSize: '13px' }}>{stringFa.no_exist_banks}</p>
            }
          </>
      }

    </div>
  );
};

export default BanksContainer;

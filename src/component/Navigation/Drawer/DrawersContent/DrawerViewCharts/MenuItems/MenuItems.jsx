import React, { useState, useEffect } from "react";
import MenuItem from "../../../../../UI/MenuItem/MenuItem";
import "./MenuItems.scss";
import { useDispatch, useSelector } from "react-redux";
import * as detailActions from "../../../../../../store/actions/detail";


const MenuItems = () => {
  const [accessOrders, setAccessOrders] = useState([]);
  const [data, setData] = useState([]);

  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const holdingAccess = useSelector((state) => state.auth.holdingAccess);
  const { selectedSoftwares, selectedActiveBackups, selectedBanks } = useSelector((state) => state.detail);

  const setBanks = (banks, mode) => {
    dispatch(detailActions.setBanks(banks, mode));
  };
  const changeSelectedMenuItems = (payload) => {
    dispatch(detailActions.changeSelectedMenuItems(payload));
  };
  const removedChildSelectedMenuItems = (payload) => {
    dispatch(detailActions.removedChildSelectedMenuItems(payload));
  };


  //new method ******************************************\

  const onMenuClickHanlder = (_id, selected, parents) => {
    let updatedData = [...data]
    let payload = { key: '', value: "", parents: [] };
    //comapny selected
    if (parents.length === 0) {
      let findedCompanyIndex = updatedData.findIndex(cmp => cmp._id === _id)
      if (findedCompanyIndex < 0) return;
      updatedData[findedCompanyIndex].selected = !selected;
      if (!selected)
        payload = { key: "selectedCompanies", value: _id, parents: [], mode: 'add' }
      else {
        payload = { key: "selectedCompanies", value: _id, mode: 'sub' }
        updatedData[findedCompanyIndex].softwares = updatedData[findedCompanyIndex].softwares.map(sft => {
          return {
            ...sft,
            selected: false,
            active_backups: sft.active_backups.map(acb => {
              return {
                ...acb,
                selected: false
              }
            })
          }
        })
        removedChildSelectedMenuItems({ _id, level: 1 })
      }
      changeSelectedMenuItems(payload)
    }
    //software selcted
    else if (parents.length === 1) {
      let findedCompanyIndex = updatedData.findIndex(cmp => cmp._id === parents[0])
      if (findedCompanyIndex < 0) return;
      payload = { key: "selectedCompanies", value: parents[0], mode: 'sub' }
      changeSelectedMenuItems(payload)
      let findedSoftwareIndex = updatedData[findedCompanyIndex].softwares.findIndex(sft => sft._id === _id)
      if (findedSoftwareIndex < 0) return;
      updatedData[findedCompanyIndex].softwares[findedSoftwareIndex].selected = !selected;
      if (!selected) {
        payload = { key: "selectedSoftwares", parents: [parents[0]], value: _id, mode: 'add' }
        changeSelectedMenuItems(payload)
      }
      else {
        payload = { key: "selectedSoftwares", value: _id, mode: 'sub' }
        changeSelectedMenuItems(payload)
        let existCountSoftware = selectedSoftwares.filter(item => item.parents[0] === parents[0])
        let existCountActiveBackup = selectedActiveBackups.filter(item => item.parents[0] === parents[0] && item.parents[1] !== _id)
        let existCountBank = selectedBanks.filter(item => item.parents[0] === parents[0] && item.parents[1] !== _id)
        if ((existCountSoftware.length === 0 || existCountSoftware.length === 1 && existCountSoftware[0].value === _id) && existCountActiveBackup.length === 0 && existCountBank.length === 0) {
          payload = { key: "selectedCompanies", value: parents[0], parents: '', mode: 'add' }
          changeSelectedMenuItems(payload)
        }
        updatedData[findedCompanyIndex].softwares[findedSoftwareIndex].active_backups = updatedData[findedCompanyIndex].softwares[findedSoftwareIndex].active_backups.map(acb => {
          return {
            ...acb,
            selected: false,
          }
        })
        removedChildSelectedMenuItems({ _id, level: 2 })

      }
    }
    // active backup selected
    else if (parents.length === 2) {
      let findedCompanyIndex = updatedData.findIndex(cmp => cmp._id === parents[0])
      if (findedCompanyIndex < 0) return;
      let findedSoftwareIndex = updatedData[findedCompanyIndex].softwares.findIndex(sft => sft._id === parents[1])
      if (findedSoftwareIndex < 0) return;
      payload = { key: "selectedSoftwares", value: parents[1], mode: 'sub' }
      changeSelectedMenuItems(payload)
      let findedActiveBackupIndex = updatedData[findedCompanyIndex].softwares[findedSoftwareIndex].active_backups.findIndex(acb => acb._id === _id)
      if (findedActiveBackupIndex < 0) return;
      updatedData[findedCompanyIndex].softwares[findedSoftwareIndex].active_backups[findedActiveBackupIndex].selected = !selected;
      if (!selected) {
        payload = { key: "selectedActiveBackups", parents: [parents[0], parents[1]], value: _id, mode: 'add' }
        changeSelectedMenuItems(payload)
        setBanks(updatedData[findedCompanyIndex].softwares[findedSoftwareIndex].active_backups[findedActiveBackupIndex].banks, 'add')
      }
      else {
        payload = { key: "selectedActiveBackups", value: _id, mode: 'sub' }
        changeSelectedMenuItems(payload)

        let existCountActiveBackup = selectedActiveBackups.filter(item => item.parents[1] === parents[1])
        let existCountBank = selectedBanks.filter(item => item.parents[1] === parents[1] && item.parents[2] !== _id)
        if ((existCountActiveBackup.length === 0 || existCountActiveBackup.length === 1 && existCountActiveBackup[0].value === _id)&& existCountBank.length === 0) {
          payload = { key: "selectedSoftwares", value: parents[1], parents: [parents[0]], mode: 'add' }
          changeSelectedMenuItems(payload)
        }
        setBanks(updatedData[findedCompanyIndex].softwares[findedSoftwareIndex].active_backups[findedActiveBackupIndex].banks, 'sub')
        removedChildSelectedMenuItems({ _id, level: 3 })

      }
      // console.log(updatedData[findedCompanyIndex].softwares[findedSoftwareIndex].active_backups[findedActiveBackupIndex].banks)
    }
    setData(updatedData)
  }

  useEffect(() => {
    if (holdingAccess) {
      let data = holdingAccess.map(
        (cmp) => {
          let softwares = cmp.softwares
            .map((sft) => {
              return {
                ...sft,
                selected: false,
                parents: [cmp._id],
                active_backups: sft.active_backups
                  .map((acb) => {
                    return {
                      ...acb,
                      selected: false,
                      parents: [cmp._id, sft._id],
                      banks: acb.banks
                        .map((bnk) => {
                          return {
                            ...bnk,
                            selected: false,
                            parents: [cmp._id, sft._id, acb._id],
                            charts: bnk.charts
                          };
                        }),
                    };
                  }),
              };
            });
          return {
            ...cmp,
            selected: false,
            parents: [],
            softwares,
          };
        }
      );
      setData(data)
    }
  }, [holdingAccess])
  useEffect(() => {
    // if (!data || data.length === 0) return;
    if (!data) return;
    let updatedOrders = []
    data.forEach(cmp => {
      updatedOrders.push({
        _id: cmp._id,
        name: cmp.name,
        parents: cmp.parents,
        selected: cmp.selected,
      })
      if (cmp.selected)
        cmp.softwares.forEach(sft => {
          updatedOrders.push({
            _id: sft._id,
            name: sft.name,
            parents: sft.parents,
            selected: sft.selected,
          })
          if (sft.selected)
            sft.active_backups.forEach(acb => {
              updatedOrders.push({
                _id: acb._id,
                name: acb.name,
                parents: acb.parents,
                selected: acb.selected,
              })
            })
        })
    })
    setAccessOrders(updatedOrders)
  }, [data])
  return (
    <div className="MenuItemsContainer">
      {error}
      {
        accessOrders && accessOrders.map((info, index) => {
          return (
            <MenuItem
              onClick={onMenuClickHanlder}
              key={info._id}
              _id={info._id}
              name={info.name}
              parents={info.parents}
              selected={info.selected}
            />
          )
        })
      }
    </div>
  );
};

export default React.memo(MenuItems);

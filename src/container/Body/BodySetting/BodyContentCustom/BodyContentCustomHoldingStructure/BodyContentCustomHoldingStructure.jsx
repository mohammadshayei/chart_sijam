import { useLayoutEffect } from '@react-spring/shared';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNewItem, deleteItem } from '../../../../../api/admin';
import { stringFa } from '../../../../../assets/strings/stringFaCollection';
import ErrorDialog from '../../../../../component/UI/Error/ErrorDialog';
import Block from './Block/Block';
import './BodyContentCustomHoldingStructure.scss'
import * as authActions from "../../../../../store/actions/auth.js";

const BodyContentCustomHoldingStructure = () => {
  const [data, setData] = useState([]);
  const [body, setBody] = useState(null)
  const [loading, setLoading] = useState(false)
  const [removeLoading, setRemoveLoading] = useState(false)

  const [error, setError] = useState(null)

  const { selectedHolding } = useSelector((state) => state.holdingDetail);
  const { holdingAccess, token, state } = useSelector((state) => state.auth);

  const dispatch = useDispatch();


  const changeStructure = (payload) => {
    dispatch(authActions.changeStructure(payload));
  };


  const onChangeItem = (_id, parents, key, value) => {
    // key ===( edited ||opened||  hovered)
    let updatedData = [...data]
    if (state === 1) {
      //company item opened
      let findedCompanyIndex = updatedData.findIndex(cmp => cmp._id === (parents.length === 0 ? _id : parents[0]))
      if (findedCompanyIndex < 0) {
        return;
      }
      if (parents.length === 0) {
        updatedData[findedCompanyIndex][key] = !value;
        if (!value && (key === 'edited' || key === 'opened'))
          updatedData = updatedData.map(cmp => {
            return {
              ...cmp,
              [key]: _id === cmp._id ? true : false
            }
          })
        if (value && key === 'opened') updatedData = updatedData.map(cmp => {
          return {
            ...cmp,
            softwares: cmp.softwares.map(sft => {
              return {
                ...sft,
                opened: false,
                active_backups: sft.active_backups.map(acb => {
                  return {
                    ...acb,
                    opened: false,
                  }
                })
              }
            })
          }
        })
      }
      //software item opened
      let findedSoftwareIndex = updatedData[findedCompanyIndex].softwares.findIndex(sft => sft._id === (parents.length === 1 ? _id : parents[1]))
      if (findedSoftwareIndex < 0) {
        setData(updatedData)
        return;
      }
      if (parents.length === 1) {
        updatedData[findedCompanyIndex].softwares[findedSoftwareIndex][key] = !value;
        if (!value && (key === 'edited' || key === 'opened'))
          updatedData[findedCompanyIndex].softwares = updatedData[findedCompanyIndex].softwares.map(sft => {
            return {
              ...sft,
              [key]: _id === sft._id ? true : false
            }
          })
        if (value && key === 'opened') updatedData[findedCompanyIndex].softwares = updatedData[findedCompanyIndex].softwares.map(sft => {
          return {
            ...sft,
            opened: false,
            active_backups: sft.active_backups.map(acb => {
              return {
                ...acb,
                opened: false,
              }
            })
          }
        })
      }
      //active back up opened
      let findedActiveBackupIndex = updatedData[findedCompanyIndex].softwares[findedSoftwareIndex].active_backups.findIndex(acb => acb._id === (parents.length === 2 ? _id : parents[2]))
      if (findedActiveBackupIndex < 0) {
        setData(updatedData)
        return;
      }
      if (parents.length === 2) {
        updatedData[findedCompanyIndex].softwares[findedSoftwareIndex].active_backups[findedActiveBackupIndex][key] = !value;
        if (!value && (key === 'edited' || key === 'opened'))
          updatedData[findedCompanyIndex].softwares[findedSoftwareIndex].active_backups = updatedData[findedCompanyIndex].softwares[findedSoftwareIndex].active_backups.map(acb => {
            return {
              ...acb,
              [key]: _id === acb._id ? true : false
            }
          })

      }
      //bank change
      let findedBankIndex = updatedData[findedCompanyIndex].softwares[findedSoftwareIndex].active_backups[findedActiveBackupIndex].banks.findIndex(bnk => bnk._id === (parents.length === 3 ? _id : parents[3]))
      if (findedBankIndex < 0) {
        setData(updatedData)
        return;
      }
      if (parents.length === 3) {
        updatedData[findedCompanyIndex].softwares[findedSoftwareIndex].active_backups[findedActiveBackupIndex].banks[findedBankIndex][key] = !value;
        if (!value && (key === 'edited'))
          updatedData[findedCompanyIndex].softwares[findedSoftwareIndex].active_backups[findedActiveBackupIndex].banks =
            updatedData[findedCompanyIndex].softwares[findedSoftwareIndex].active_backups[findedActiveBackupIndex].banks.map(bnk => {
              return {
                ...bnk,
                [key]: _id === bnk._id ? true : false
              }
            })

      }
    }
    // else if (state === 2) {
    //   //softawre item opened
    //   let findedSoftwareIndex = updatedData.findIndex(sft => sft._id === (parents.length === 0 ? _id : parents[0]))
    //   if (findedSoftwareIndex < 0) {
    //     setData(updatedData)
    //     return;
    //   }
    //   if (parents.length === 0) {
    //     updatedData[findedSoftwareIndex].opened = !opened;
    //     if (opened) {
    //       updatedData[findedSoftwareIndex].active_backups = updatedData[findedSoftwareIndex].active_backups.map(acb => {
    //         return {
    //           ...acb,
    //           opened: false,
    //           banks: acb.banks.map(bnk => {
    //             return {
    //               ...bnk,
    //               opened: false,
    //             }
    //           })
    //         }
    //       })
    //     }
    //   }
    //   //activebackup item opened
    //   let findedActiveBackupIndex = updatedData[findedSoftwareIndex].active_backups.findIndex(acb => acb._id === (parents.length === 1 ? _id : parents[1]))
    //   if (findedActiveBackupIndex < 0) {
    //     setData(updatedData)
    //     return;
    //   }
    //   if (parents.length === 1) {
    //     updatedData[findedSoftwareIndex].active_backups[findedActiveBackupIndex].opened = !opened;
    //     if (opened) {
    //       updatedData[findedSoftwareIndex].active_backups[findedActiveBackupIndex].banks = updatedData[findedSoftwareIndex].active_backups[findedActiveBackupIndex].banks.map(bnk => {
    //         return {
    //           ...bnk,
    //           opened: false,
    //         }
    //       })
    //     }
    //   }
    //   //banks item opened
    //   let findedBankIndex =
    //     updatedData[findedSoftwareIndex].active_backups[findedActiveBackupIndex].banks
    //       .findIndex(bnk => bnk._id === (parents.length === 2 ? _id : parents[2]))
    //   if (findedBankIndex < 0) {
    //     setData(updatedData)
    //     return;
    //   }
    //   if (parents.length === 2) {
    //     updatedData[findedSoftwareIndex].active_backups[findedActiveBackupIndex].banks[findedBankIndex].opened = !opened;
    //   }

    // }
    // else if (state === 3) {
    //   //activebackup item opened
    //   let findedActiveBackupIndex = updatedData.findIndex(acb => acb._id === (parents.length === 0 ? _id : parents[0]))
    //   if (findedActiveBackupIndex < 0) {
    //     setData(updatedData)
    //     return;
    //   }
    //   if (parents.length === 0) {
    //     updatedData[findedActiveBackupIndex].opened = !opened;
    //     if (opened) {
    //       updatedData[findedActiveBackupIndex].banks = updatedData[findedActiveBackupIndex].banks.map(bnk => {
    //         return {
    //           ...bnk,
    //           opened: false,
    //         }
    //       })
    //     }
    //   }
    //   //bank item opened
    //   let findedBankIndex = updatedData[findedActiveBackupIndex].banks.findIndex(bnk => bnk._id === (parents.length === 1 ? _id : parents[1]))
    //   if (findedBankIndex < 0) {
    //     setData(updatedData)
    //     return;
    //   }
    //   if (parents.length === 1) {
    //     updatedData[findedActiveBackupIndex].banks[findedBankIndex].opened = !opened;
    //   }

    // }
    // else if (state === 4) {
    //   //bank item opened
    //   let findedBankIndex = updatedData.findIndex(bnk => bnk._id === (parents.length === 0 ? _id : parents[0]))
    //   if (findedBankIndex < 0) {
    //     setData(updatedData)
    //     return;
    //   }
    //   if (parents.length === 0) {
    //     updatedData[findedBankIndex].opened = !opened;

    //   }
    // }

    setData(updatedData)

  }
  const hasChild = (info) => {
    if (info.parents.length === 0) {
      if (state === 1)
        return (info.softwares.length > 0)
      else if (state === 2)
        return (info.active_backups.length > 0)
      else return false
    }
    else if (info.parents.length === 1) {
      if (state === 1)
        return (info.active_backups.length > 0)
      else if (state === 2)
        return (info.banks.length > 0)
      else return false
    }
    else if (info.parents.length === 2) {
      if (state === 1)
        return (info.banks.length > 0)
      else return false
    }
    else return false;

  }

  const getType = (info) => {
    if (info.parents.length === 0) {
      if (state === 1)
        return 1
      else if (state === 2)
        return 2
      else return 3
    }
    else if (info.parents.length === 1) {
      if (state === 1)
        return 2
      else if (state === 2)
        return 3
    }
    else if (info.parents.length === 2) {
      if (state === 1)
        return 3
    }
    else return 0;

  }
  const addItem = async (title, name, code, parents) => {
    setError(null)
    let url = '', parentId = ''
    switch (title) {
      case stringFa.company:
        url = 'create_company'
        parentId = selectedHolding.holdingId
        break;
      case stringFa.softwares:
        url = 'create_software'
        parentId = parents[0]
        break;
      case stringFa.active_backup:
        url = 'create_active_backup'
        parentId = parents[1]
        break;
      default:
        break;
    }
    if (!url) return;
    let payload = { name, code, parentId }
    setLoading(true)
    try {
      const result = await createNewItem(payload, url, token)
      setError(
        <ErrorDialog success={result.success} onClose={setError}>{result.success ? result.data.message : result.error}</ErrorDialog>
      )
      if (result.success)
        changeStructure({ parents, value: parents.length === 1 ? result.data : result.data.data, mode: "add" })
      setLoading(false)

    } catch (error) {
      console.log(error)
      setLoading(false)
      setError(
        <ErrorDialog onClose={setError}>{stringFa.error_occured_try_again}</ErrorDialog>
      )
    }
  }
  const deleteItemHandler = async (title, id, parents) => {
    setError(null)
    let url = '';
    console.log(title, id)
    switch (title) {
      case stringFa.company:
        url = 'delete_company'
        break;
      case stringFa.softwares:
        url = 'delete_software'
        break;
      case stringFa.active_backup:
        url = 'delete_active_backup'
        break;
      case stringFa.banks:
        url = 'delete_bank'
        break;
      default:
        break;
    }
    if (!url) return;
    let payload = { id }
    setRemoveLoading(true)
    try {
      const result = await deleteItem(payload, url, token)
      setError(
        <ErrorDialog success={result.success} onClose={setError}>{result.success ? result.data.message : result.error}</ErrorDialog>
      )
      if (result.success)
        changeStructure({ parents, value: id, mode: "remove" })
      setRemoveLoading(false)

    } catch (error) {
      console.log(error)
      setRemoveLoading(false)
      setError(
        <ErrorDialog onClose={setError}>{stringFa.error_occured_try_again}</ErrorDialog>
      )
    }
  }

  useEffect(() => {
    if (holdingAccess) {
      let data = [];
      if (state === 1)
        data = holdingAccess.map(
          (cmp) => {
            return {
              ...cmp,
              opened: cmp.opened ? cmp.opened : false,
              edited: false,
              hoverd: false,
              parents: [],
              softwares: cmp.softwares
                .map((sft) => {
                  return {
                    ...sft,
                    opened: sft.opened ? sft.opened : false,
                    edited: false,
                    hoverd: false,
                    parents: [cmp._id],
                    active_backups: sft.active_backups
                      .map((acb) => {
                        return {
                          ...acb,
                          opened: acb.opened ? acb.opened : false,
                          edited: false,
                          hoverd: false,
                          parents: [cmp._id, sft._id],
                          banks: acb.banks.map(bnk => {
                            return {
                              ...bnk,
                              opened: false,
                              edited: false,
                              hoverd: false,
                              parents: [cmp._id, sft._id, acb._id],
                            }
                          })
                        };
                      }),
                  };
                }),
            };
          }
        );
      else if (state === 2)
        data = holdingAccess.map(
          (sft) => {
            return {
              ...sft,
              type: 'see',
              opened: false,
              parents: [],
              active_backups: sft.active_backups
                .map((acb) => {
                  return {
                    ...acb,
                    type: 'see',
                    opened: false,
                    parents: [sft._id],
                  };
                }),
            };
          }
        );
      else if (state === 3)
        data = holdingAccess.map(
          (acb) => {
            return {
              ...acb,
              type: 'see',
              opened: false,
              parents: [],
            };
          }
        );
      setData(data)
    }
  }, [holdingAccess])

  useLayoutEffect(() => {
    if (!data) return;
    let updatedBody = null;
    if (state === 1) {
      let updatedCopmanies, updatedSoftwers, updatedActiveBackup, updatedBank;
      updatedCopmanies = <Block
        hasChild={hasChild}
        onChange={onChangeItem}
        data={data}
        title={stringFa.company}
        addLoading={loading}
        addItem={addItem}
        deleteItem={deleteItemHandler}
        removeLoading={removeLoading}
        parents={[]}

      />
      let companySelected = data.find(item => item.opened)
      if (companySelected) {
        updatedSoftwers = <Block
          hasChild={hasChild}
          getType={getType}
          onChange={onChangeItem}
          data={companySelected.softwares}
          title={stringFa.softwares}
          addItem={addItem}
          addLoading={loading}
          deleteItem={deleteItemHandler}
          removeLoading={removeLoading}
          parents={[companySelected._id]}

        />
      }
      let softwareSelected = companySelected?.softwares.find(item => item.opened)
      if (softwareSelected) {
        updatedActiveBackup = <Block
          hasChild={hasChild}
          getType={getType}
          onChange={onChangeItem}
          data={softwareSelected.active_backups}
          title={stringFa.active_backup}
          addItem={addItem}
          addLoading={loading}
          deleteItem={deleteItemHandler}
          removeLoading={removeLoading}
          parents={[companySelected._id, softwareSelected._id]}


        />
      }
      let activeBackupSelected = softwareSelected?.active_backups.find(item => item.opened)
      if (activeBackupSelected) {
        updatedBank = <Block
          hasChild={hasChild}
          getType={getType}
          onChange={onChangeItem}
          data={activeBackupSelected.banks}
          title={stringFa.banks}
          addItem={addItem}
          addLoading={loading}
          deleteItem={deleteItemHandler}
          removeLoading={removeLoading}
          parents={[companySelected._id, softwareSelected._id, activeBackupSelected._id]}

        />
      }
      updatedBody = <>
        {updatedCopmanies}
        {updatedSoftwers}
        {updatedActiveBackup}
        {updatedBank}
      </>

    }
    setBody(updatedBody)
  }, [data])



  // useEffect(() => {
  //   if (!data) return;
  //   let updatedOrders = []
  //   if (state === 1) {
  //     data.forEach((cmp, cmpIndex) => {
  //       updatedOrders.push({
  //         ...cmp
  //       })
  //       if (cmp.opened)
  //         cmp.softwares.forEach((sft, sftIndex) => {
  //           updatedOrders.push({
  //             ...sft
  //           })
  //           if (sft.opened)
  //             sft.active_backups.forEach((acb, acbIndex) => {
  //               updatedOrders.push({
  //                 ...acb
  //               })
  //               if (sft.active_backups.length - 1 === acbIndex)
  //                 updatedOrders.push({
  //                   _id: `${acb._id}_add}`,
  //                   type: "add",
  //                   value: 3,
  //                   parent: sft._id,
  //                   parents: acb.parents
  //                 })

  //             })
  //           if (sftIndex === cmp.softwares.length - 1)
  //             updatedOrders.push({
  //               _id: `${sft._id}_add}`,
  //               type: "add",
  //               value: 2,
  //               parent: cmp._id,
  //               parents: sft.parents
  //             })
  //         })

  //       if (cmpIndex === holdingAccess.length - 1)
  //         updatedOrders.push({
  //           _id: `${cmp._id}_add}`,
  //           type: "add",
  //           value: 1,
  //           parent: selectedHolding.holdingId,
  //           parents: cmp.parents
  //         })
  //     })
  //   }
  //   else if (state === 2) {
  //     data.forEach(sft => {
  //       updatedOrders.push({
  //         ...sft
  //       })
  //       if (sft.opened)
  //         sft.active_backups.forEach(acb => {
  //           updatedOrders.push({
  //             ...acb
  //           })
  //           if (acb.opened)
  //             acb.banks.forEach(bnk => {
  //               updatedOrders.push({
  //                 ...bnk
  //               })
  //               if (bnk.opened)
  //                 bnk.charts.forEach(chrt => {
  //                   updatedOrders.push({
  //                     ...chrt
  //                   })
  //                 })
  //             })
  //         })
  //     })
  //   }
  //   else if (state === 3) {
  //     data.forEach(acb => {
  //       updatedOrders.push({
  //         ...acb
  //       })
  //       if (acb.opened)
  //         acb.banks.forEach(bnk => {
  //           updatedOrders.push({
  //             ...bnk
  //           })
  //           if (bnk.opened)
  //             bnk.charts.forEach(chrt => {
  //               updatedOrders.push({
  //                 ...chrt
  //               })
  //             })
  //         })
  //     })
  //   }
  //   else if (state === 4) {
  //     data.forEach(bnk => {
  //       updatedOrders.push({
  //         ...bnk
  //       })
  //       if (bnk.opened)
  //         bnk.charts.forEach(chrt => {
  //           updatedOrders.push({
  //             ...chrt
  //           })
  //         })
  //     })
  //   }
  //   else if (state === 5) {
  //     data.forEach(chrt => {
  //       updatedOrders.push({
  //         ...chrt
  //       })
  //     })
  //   }

  //   setOrders(updatedOrders)
  // }, [data])



  return (
    <div className='body-content-custom-holding-structure-container'>
      {error}
      {body}
      {/* <div className="items"> */}
      {/* {
          data && orders.map((info, index) => {
            return (
              info.type === 'see' ?
                <StructureItem
                  key={info._id}
                  name={info.name}
                  parents={info.parents}
                  opened={info.opened}
                  hasChild={() => hasChild(info)}
                  getType={() => getType(info)}
                  onClick={() => onClickItemHandler(info._id, info.parents, info.opened)}
                /> : <AddStructure key={info._id}  {...info} />
            )
          })
        } */}
      {/* </div> */}
    </div>
  )
}

export default BodyContentCustomHoldingStructure
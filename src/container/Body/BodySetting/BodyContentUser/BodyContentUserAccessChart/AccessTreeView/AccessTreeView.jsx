import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AccessItem from "./AccessItem/AccessItem";
import "./AccessTreeView.scss"
import Button from "../../../../../../component/UI/Button/Button";
import { stringFa } from "../../../../../../assets/strings/stringFaCollection";
import { grantAccessToEmployee } from "../../../../../../api/admin";
import ErrorDialog from "../../../../../../component/UI/Error/ErrorDialog";
const AccessTreeView = ({ userAccess, userId }) => {
    const [data, setData] = useState([]);
    const [dataInitiated, setDataInitiated] = useState(false);
    const [orders, setOrders] = useState([]);
    const { selectedHolding } = useSelector((state) => state.holdingDetail);
    const { holdingAccess, token } = useSelector((state) => state.auth);
    const [dataChanged, setDataChanged] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null);

    const onClickItemHandler = (_id, parents, opened) => {
        let updatedData = [...data]
        //company item opened
        let findedCompanyIndex = updatedData.findIndex(cmp => cmp._id === (parents.length === 0 ? _id : parents[0]))
        if (findedCompanyIndex < 0) {
            setData(updatedData)
            return;
        }
        if (parents.length === 0) {
            updatedData[findedCompanyIndex].opened = !opened;
            if (opened) {
                updatedData[findedCompanyIndex].softwares = updatedData[findedCompanyIndex].softwares.map(sft => {
                    return {
                        ...sft,
                        opened: false,
                        active_backups: sft.active_backups.map(acb => {
                            return {
                                ...acb,
                                opened: false,
                                banks: acb.banks.map(bnk => {
                                    return {
                                        ...bnk,
                                        opened: false,
                                    }
                                })
                            }
                        })
                    }
                })
            }
        }
        //software item opened
        let findedSoftwareIndex = updatedData[findedCompanyIndex].softwares.findIndex(sft => sft._id === (parents.length === 1 ? _id : parents[1]))
        if (findedSoftwareIndex < 0) {
            setData(updatedData)
            return;
        }
        if (parents.length === 1) {
            updatedData[findedCompanyIndex].softwares[findedSoftwareIndex].opened = !opened;
            if (opened) {
                updatedData[findedCompanyIndex].softwares[findedSoftwareIndex].active_backups = updatedData[findedCompanyIndex].softwares[findedSoftwareIndex].active_backups.map(acb => {
                    return {
                        ...acb,
                        opened: false,
                        banks: acb.banks.map(bnk => {
                            return {
                                ...bnk,
                                opened: false,
                            }
                        })
                    }
                }
                )
            }
        }
        //activebackup item opened
        let findedActiveBackupIndex =
            updatedData[findedCompanyIndex].softwares[findedSoftwareIndex].active_backups
                .findIndex(acb => acb._id === (parents.length === 2 ? _id : parents[2]))
        if (findedActiveBackupIndex < 0) {
            setData(updatedData)
            return;
        }
        if (parents.length === 2) {
            updatedData[findedCompanyIndex].softwares[findedSoftwareIndex].active_backups[findedActiveBackupIndex].opened = !opened;
            if (opened) {
                updatedData[findedCompanyIndex].softwares[findedSoftwareIndex].active_backups[findedActiveBackupIndex].banks =
                    updatedData[findedCompanyIndex].softwares[findedSoftwareIndex].active_backups[findedActiveBackupIndex].banks.map(bnk => {
                        return {
                            ...bnk,
                            opened: false,
                        }
                    }
                    )
            }
        }
        //bank item opened
        if (parents.length === 3) {
            let findedBankIndex = updatedData[findedCompanyIndex].softwares[findedSoftwareIndex].active_backups[findedActiveBackupIndex].banks.findIndex(bnk => bnk._id === _id)
            if (findedBankIndex < 0) {
                setData(updatedData)
                return;
            }
            updatedData[findedCompanyIndex].softwares[findedSoftwareIndex].active_backups[findedActiveBackupIndex].banks[findedBankIndex].opened = !opened;
        }
        setData(updatedData)

    }
    const onChange = (_id, parents, selected, nested = true) => {
        let updatedData = [...data]
        //company item selected
        let findedCompanyIndex = updatedData.findIndex(cmp => cmp._id === (parents.length === 0 ? _id : parents[0]))
        if (findedCompanyIndex < 0) { return };
        if (parents.length === 0) {
            updatedData[findedCompanyIndex].selected = !selected;
            if (nested)
                updatedData[findedCompanyIndex].softwares = updatedData[findedCompanyIndex].softwares.map(sft => {
                    return {
                        ...sft,
                        selected: !selected,
                        active_backups: sft.active_backups.map(acb => {
                            return {
                                ...acb,
                                selected: !selected,
                                banks: acb.banks.map(bnk => {
                                    return {
                                        ...bnk,
                                        selected: !selected,
                                        charts: bnk.charts.map(chrt => {
                                            return {
                                                ...chrt,
                                                selected: !selected
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
        }
        //software item selected
        let findedSoftwareIndex = updatedData[findedCompanyIndex].softwares.findIndex(sft => sft._id === (parents.length === 1 ? _id : parents[1]))
        if (findedSoftwareIndex < 0) {
            setData(updatedData)
            return
        };
        if (parents.length === 1) {
            updatedData[findedCompanyIndex].softwares[findedSoftwareIndex].selected = !selected;
            if (nested) updatedData[findedCompanyIndex].softwares[findedSoftwareIndex].active_backups = updatedData[findedCompanyIndex].softwares[findedSoftwareIndex].active_backups.map(acb => {
                return {
                    ...acb,
                    selected: !selected,
                    banks: acb.banks.map(bnk => {
                        return {
                            ...bnk,
                            selected: !selected,
                            charts: bnk.charts.map(chrt => {
                                return {
                                    ...chrt,
                                    selected: !selected
                                }
                            })

                        }
                    })
                }
            }
            )

            if (selected) onChange(parents[0], [], true, false)
            else
                onChange(parents[0], [], !(updatedData[findedCompanyIndex].softwares.findIndex(sft => !sft.selected) < 0), false);
        }
        //activebackup item selected
        let findedActiveBackupIndex =
            updatedData[findedCompanyIndex].softwares[findedSoftwareIndex].active_backups.findIndex
                (acb => acb._id === (parents.length === 2 ? _id : parents[2]))

        if (findedActiveBackupIndex < 0) {
            setData(updatedData)
            return
        };
        if (parents.length === 2) {
            updatedData[findedCompanyIndex].softwares[findedSoftwareIndex].active_backups[findedActiveBackupIndex].selected = !selected;
            if (nested) updatedData[findedCompanyIndex].softwares[findedSoftwareIndex].active_backups[findedActiveBackupIndex].banks =
                updatedData[findedCompanyIndex].softwares[findedSoftwareIndex].active_backups[findedActiveBackupIndex].banks.map(bnk => {
                    return {
                        ...bnk,
                        selected: !selected,
                        charts: bnk.charts.map(chrt => {
                            return {
                                ...chrt,
                                selected: !selected
                            }
                        })
                    }
                }
                )

            if (selected) onChange(parents[1], [parents[0]], true, false)
            else
                onChange(parents[1], [parents[0]], !updatedData[findedCompanyIndex].softwares[findedSoftwareIndex].active_backups.findIndex(acb => !acb.selected) < 0, false)
        }
        //bank item selected
        let findedBankIndex =
            updatedData[findedCompanyIndex].softwares[findedSoftwareIndex].active_backups[findedActiveBackupIndex].banks
                .findIndex(bnk => bnk._id === (parents.length === 3 ? _id : parents[3]))
        if (findedBankIndex < 0) {
            setData(updatedData)
            return
        }
        if (parents.length === 3) {
            updatedData[findedCompanyIndex].softwares[findedSoftwareIndex].active_backups[findedActiveBackupIndex].banks[findedBankIndex].selected = !selected;
            if (nested) updatedData[findedCompanyIndex].softwares[findedSoftwareIndex].active_backups[findedActiveBackupIndex].banks[findedBankIndex].charts =
                updatedData[findedCompanyIndex].softwares[findedSoftwareIndex].active_backups[findedActiveBackupIndex].banks[findedBankIndex].charts.map(chrt => {
                    return {
                        ...chrt,
                        selected: !selected,
                    }
                }
                )

            if (selected) onChange(parents[2], [parents[0], parents[1]], true, false);
            else
                onChange(parents[2], [parents[0], parents[1]],
                    !updatedData[findedCompanyIndex].softwares[findedSoftwareIndex].active_backups[findedActiveBackupIndex].banks.findIndex(bnk => !bnk.selected) < 0, false)
        }
        //chart item opened
        let findedChartIndex = updatedData[findedCompanyIndex].softwares[findedSoftwareIndex]
            .active_backups[findedActiveBackupIndex].banks[findedBankIndex].charts.findIndex(chrt => chrt._id === (parents.length === 4 ? _id : parents[4]))
        if (findedChartIndex < 0) {
            setData(updatedData)
            return
        };
        if (parents.length === 4) {
            updatedData[findedCompanyIndex].softwares[findedSoftwareIndex].active_backups[findedActiveBackupIndex].banks[findedBankIndex].charts[findedChartIndex].selected = !selected;

            if (selected) onChange(parents[3], [parents[0], parents[1], parents[2]], true, false);
            else
                onChange(parents[3], [parents[0], parents[1], parents[2]],
                    !updatedData[findedCompanyIndex].softwares[findedSoftwareIndex].active_backups[findedActiveBackupIndex].banks[findedBankIndex].charts.findIndex(chrt => !chrt.selected) < 0, false)
        }
        setData(updatedData)
    }

    const onSaveChangeHandler = async () => {
        let companies = [], softwares = [], activeBackups = [], banks = [], charts = [];
        data.forEach(cmp => {
            if (cmp.selected) companies = [...companies, cmp._id]
            else {
                cmp.softwares.forEach(sft => {
                    if (sft.selected) softwares = [...softwares, sft._id]
                    else {
                        sft.active_backups.forEach(acb => {
                            if (acb.selected) activeBackups = [...activeBackups, acb._id]
                            else {
                                acb.banks.forEach(bnk => {
                                    if (bnk.selected) banks = [...banks, bnk._id]
                                    else {
                                        bnk.charts.forEach(chrt => {
                                            if (chrt.selected) charts = [...charts, chrt._id]
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
        const payload = {
            holdingId: selectedHolding.holdingId,
            userId,
            fullAccess: false,
            companies,
            softwares,
            activeBackups,
            banks,
            charts
        }
        setLoading(true)
        try {
            const result = await grantAccessToEmployee(payload, token)
            if (result.success) {
                setError(
                    <ErrorDialog success={true} onClose={setError}>{result.data}</ErrorDialog>
                )
            } else {
                setError(
                    <ErrorDialog onClose={setError}>{result.error}</ErrorDialog>
                )
            }
        } catch (error) {
            setLoading(false)
            setError(
                <ErrorDialog onClose={setError}>{stringFa.error_occured_try_again}</ErrorDialog>
            )
        }
        setLoading(false)

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
                                opened: false,
                                parents: [cmp._id],
                                active_backups: sft.active_backups
                                    .map((acb) => {
                                        return {
                                            ...acb,
                                            selected: false,
                                            opened: false,
                                            parents: [cmp._id, sft._id],
                                            banks: acb.banks
                                                .map((bnk) => {
                                                    return {
                                                        ...bnk,
                                                        selected: false,
                                                        opened: false,
                                                        parents: [cmp._id, sft._id, acb._id],
                                                        charts: bnk.charts.map(chrt => {
                                                            return {
                                                                _id: chrt.chart._id,
                                                                name: chrt.chart.title,
                                                                selected: false,
                                                                opened: false,
                                                                parents: [cmp._id, sft._id, acb._id, bnk._id],
                                                            }
                                                        })
                                                    };
                                                }),
                                        };
                                    }),
                            };
                        });
                    return {
                        ...cmp,
                        selected: false,
                        opened: false,
                        parents: [],
                        softwares,
                    };
                }
            );
            setData(data)
            setDataInitiated(true)
        }
    }, [holdingAccess])

    useEffect(() => {
        setDataInitiated(true)
    }, [userAccess])

    useEffect(() => {
        if (dataInitiated && data.length > 0 && userAccess) {
            userAccess.comapnies.forEach(cmp => {
                onChange(cmp._id, [], false)
                cmp.softwares.forEach(sft => {
                    onChange(sft._id, [cmp._id], false)
                    sft.active_backups.forEach(acb => {
                        onChange(acb._id, [cmp._id, sft._id], false)
                        acb.banks.forEach(bnk => {
                            onChange(bnk._id, [cmp._id, sft._id, acb._id], false)
                            bnk.charts.forEach(chrt => {
                                onChange(chrt._id, [cmp._id, sft._id, acb._id, bnk._id], false)
                            })
                        })
                    })
                })
            })
            setDataInitiated(false)
        }
    }, [dataInitiated, data, userAccess])


    useEffect(() => {
        if (!data) return;
        let updatedOrders = []
        data.forEach(cmp => {
            updatedOrders.push({
                ...cmp
            })
            if (cmp.opened)
                cmp.softwares.forEach(sft => {
                    updatedOrders.push({
                        ...sft
                    })
                    if (sft.opened)
                        sft.active_backups.forEach(acb => {
                            updatedOrders.push({
                                ...acb
                            })
                            if (acb.opened)
                                acb.banks.forEach(bnk => {
                                    updatedOrders.push({
                                        ...bnk
                                    })
                                    if (bnk.opened)
                                        bnk.charts.forEach(chrt => {
                                            updatedOrders.push({
                                                ...chrt
                                            })
                                        })
                                })
                        })
                })
        })
        setOrders(updatedOrders)
    }, [data])
    return <div className="access-tree-view">
        {error}
        <div className="access-tree-view-items">
            {
                orders && orders.map((info, index) => {
                    return (
                        <AccessItem
                            key={info._id}
                            _id={info._id}
                            name={info.name}
                            parents={info.parents}
                            selected={info.selected}
                            opened={info.opened}
                            onChange={() => {
                                setDataChanged(true)
                                onChange(info._id, info.parents, info.selected)
                            }}
                            hasChild={() => {
                                if (info.parents.length === 0)
                                    return (info.softwares.length > 0)
                                else if (info.parents.length === 1)
                                    return (info.active_backups.length > 0)
                                else if (info.parents.length === 2)
                                    return (info.banks.length > 0)
                                else if (info.parents.length === 3)
                                    return (info.charts.length > 0)
                                else return false;
                            }}
                            onClick={() => onClickItemHandler(info._id, info.parents, info.opened)}
                        />
                    )
                })
            }
        </div>
        {
            dataChanged &&
            <div className="actions">
                <Button
                    // disabled={
                    //     (!(isValidPhone && resultCountry && phone.length !== 0) || loading)
                    // }
                    ButtonStyle={{
                        width: "15rem",
                        paddingTop: ".2rem",
                    }}
                    onClick={onSaveChangeHandler}
                    loading={loading}
                >
                    <p>{stringFa.save}</p>
                </Button>
            </div>
        }
    </div>;
};

export default AccessTreeView;

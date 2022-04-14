import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AccessItem from "./AccessItem/AccessItem";
import "./AccessTreeView.scss"
import Button from "../../../../../../component/UI/Button/Button";
import { stringFa } from "../../../../../../assets/strings/stringFaCollection";
import { grantAccessToEmployee } from "../../../../../../api/admin";
import ErrorDialog from "../../../../../../component/UI/Error/ErrorDialog";
const AccessTreeView = ({ userAccess, userId, userState }) => {
    const [data, setData] = useState([]);
    const [dataInitiated, setDataInitiated] = useState(false);
    const [orders, setOrders] = useState([]);
    const { selectedHolding } = useSelector((state) => state.holdingDetail);
    const { holdingAccess, token, state } = useSelector((state) => state.auth);
    const [dataChanged, setDataChanged] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null);


    const onClickItemHandler = (_id, parents, opened) => {
        let updatedData = [...data]

        if (state === 1) {
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
        }
        else if (state === 2) {
            //softawre item opened
            let findedSoftwareIndex = updatedData.findIndex(sft => sft._id === (parents.length === 0 ? _id : parents[0]))
            if (findedSoftwareIndex < 0) {
                setData(updatedData)
                return;
            }
            if (parents.length === 0) {
                updatedData[findedSoftwareIndex].opened = !opened;
                if (opened) {
                    updatedData[findedSoftwareIndex].active_backups = updatedData[findedSoftwareIndex].active_backups.map(acb => {
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
            }
            //activebackup item opened
            let findedActiveBackupIndex = updatedData[findedSoftwareIndex].active_backups.findIndex(acb => acb._id === (parents.length === 1 ? _id : parents[1]))
            if (findedActiveBackupIndex < 0) {
                setData(updatedData)
                return;
            }
            if (parents.length === 1) {
                updatedData[findedSoftwareIndex].active_backups[findedActiveBackupIndex].opened = !opened;
                if (opened) {
                    updatedData[findedSoftwareIndex].active_backups[findedActiveBackupIndex].banks = updatedData[findedSoftwareIndex].active_backups[findedActiveBackupIndex].banks.map(bnk => {
                        return {
                            ...bnk,
                            opened: false,
                        }
                    })
                }
            }
            //banks item opened
            let findedBankIndex =
                updatedData[findedSoftwareIndex].active_backups[findedActiveBackupIndex].banks
                    .findIndex(bnk => bnk._id === (parents.length === 2 ? _id : parents[2]))
            if (findedBankIndex < 0) {
                setData(updatedData)
                return;
            }
            if (parents.length === 2) {
                updatedData[findedSoftwareIndex].active_backups[findedActiveBackupIndex].banks[findedBankIndex].opened = !opened;
            }

        }
        else if (state === 3) {
            //activebackup item opened
            let findedActiveBackupIndex = updatedData.findIndex(acb => acb._id === (parents.length === 0 ? _id : parents[0]))
            if (findedActiveBackupIndex < 0) {
                setData(updatedData)
                return;
            }
            if (parents.length === 0) {
                updatedData[findedActiveBackupIndex].opened = !opened;
                if (opened) {
                    updatedData[findedActiveBackupIndex].banks = updatedData[findedActiveBackupIndex].banks.map(bnk => {
                        return {
                            ...bnk,
                            opened: false,
                        }
                    })
                }
            }
            //bank item opened
            let findedBankIndex = updatedData[findedActiveBackupIndex].banks.findIndex(bnk => bnk._id === (parents.length === 1 ? _id : parents[1]))
            if (findedBankIndex < 0) {
                setData(updatedData)
                return;
            }
            if (parents.length === 1) {
                updatedData[findedActiveBackupIndex].banks[findedBankIndex].opened = !opened;
            }

        }
        else if (state === 4) {
            //bank item opened
            let findedBankIndex = updatedData.findIndex(bnk => bnk._id === (parents.length === 0 ? _id : parents[0]))
            if (findedBankIndex < 0) {
                setData(updatedData)
                return;
            }
            if (parents.length === 0) {
                updatedData[findedBankIndex].opened = !opened;

            }
        }

        setData(updatedData)

    }
    const onChange = (_id, parents, selected, nested = true) => {
        let updatedData = [...data]
        if (state === 1) {
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
                    onChange(parents[1], [parents[0]], !(updatedData[findedCompanyIndex].softwares[findedSoftwareIndex].active_backups.findIndex(acb => !acb.selected) < 0), false)
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
                        !(updatedData[findedCompanyIndex].softwares[findedSoftwareIndex].active_backups[findedActiveBackupIndex].banks.findIndex(bnk => !bnk.selected) < 0), false)
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
                        !(updatedData[findedCompanyIndex].softwares[findedSoftwareIndex].active_backups[findedActiveBackupIndex].banks[findedBankIndex].charts.findIndex(chrt => !chrt.selected) < 0), false)
            }

        }
        else if (state === 2) {
            //software item selected
            let findedSoftwareIndex = updatedData.findIndex(sft => sft._id === (parents.length === 0 ? _id : parents[0]))
            if (findedSoftwareIndex < 0) { return };
            if (parents.length === 0) {
                updatedData[findedSoftwareIndex].selected = !selected;
                if (nested)
                    updatedData[findedSoftwareIndex].active_backups = updatedData[findedSoftwareIndex].active_backups.map(acb => {
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
            //active backup item selected
            let findedActiveBackupIndex = updatedData[findedSoftwareIndex].active_backups.findIndex(acb => acb._id === (parents.length === 1 ? _id : parents[1]))
            if (findedActiveBackupIndex < 0) {
                setData(updatedData)
                return
            };
            if (parents.length === 1) {
                updatedData[findedSoftwareIndex].active_backups[findedActiveBackupIndex].selected = !selected;
                if (nested) updatedData[findedSoftwareIndex].active_backups[findedActiveBackupIndex].banks = updatedData[findedSoftwareIndex].active_backups[findedActiveBackupIndex].banks.map(bnk => {
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
                if (selected) onChange(parents[0], [], true, false)
                else
                    onChange(parents[0], [], !(updatedData[findedSoftwareIndex].active_backups.findIndex(acb => !acb.selected) < 0), false);
            }
            //bank item selected
            let findedBankIndex =
                updatedData[findedSoftwareIndex].active_backups[findedActiveBackupIndex].banks.findIndex
                    (bnk => bnk._id === (parents.length === 2 ? _id : parents[2]))

            if (findedBankIndex < 0) {
                setData(updatedData)
                return
            };
            if (parents.length === 2) {
                updatedData[findedSoftwareIndex].active_backups[findedActiveBackupIndex].banks[findedBankIndex].selected = !selected;
                if (nested) updatedData[findedSoftwareIndex].active_backups[findedActiveBackupIndex].banks[findedBankIndex].charts =
                    updatedData[findedSoftwareIndex].active_backups[findedActiveBackupIndex].banks[findedBankIndex].charts.map(chrt => {
                        return {
                            ...chrt,
                            selected: !selected
                        }
                    }
                    )

                if (selected) onChange(parents[1], [parents[0]], true, false)
                else
                    onChange(parents[1], [parents[0]], !(updatedData[findedSoftwareIndex].active_backups[findedActiveBackupIndex].banks.findIndex(bnk => !bnk.selected) < 0), false)
            }
            //chart item selected
            let findedChartIndex =
                updatedData[findedSoftwareIndex].active_backups[findedActiveBackupIndex].banks[findedBankIndex].charts
                    .findIndex(chrt => chrt._id === (parents.length === 3 ? _id : parents[3]))
            if (findedChartIndex < 0) {
                setData(updatedData)
                return
            }
            if (parents.length === 3) {
                updatedData[findedSoftwareIndex].active_backups[findedActiveBackupIndex].banks[findedBankIndex].charts[findedChartIndex].selected = !selected;
                if (selected) onChange(parents[2], [parents[0], parents[1]], true, false);
                else
                    onChange(parents[2], [parents[0], parents[1]],
                        !(updatedData[findedSoftwareIndex].active_backups[findedActiveBackupIndex].banks[findedBankIndex].charts[findedChartIndex].findIndex(chrt => !chrt.selected) < 0), false)
            }

        }
        else if (state === 3) {
            //activebackup item selected
            let findedActiveBackupIndex = updatedData.findIndex(acb => acb._id === (parents.length === 0 ? _id : parents[0]))
            if (findedActiveBackupIndex < 0) { return };
            if (parents.length === 0) {
                updatedData[findedActiveBackupIndex].selected = !selected;
                if (nested)
                    updatedData[findedActiveBackupIndex].banks = updatedData[findedActiveBackupIndex].banks.map(bnk => {
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
            //bank item selected
            let findedBankIndex = updatedData[findedActiveBackupIndex].banks.findIndex(bnk => bnk._id === (parents.length === 1 ? _id : parents[1]))
            if (findedBankIndex < 0) {
                setData(updatedData)
                return
            };
            if (parents.length === 1) {
                updatedData[findedActiveBackupIndex].banks[findedBankIndex].selected = !selected;
                if (nested) updatedData[findedActiveBackupIndex].banks[findedBankIndex].charts = updatedData[findedActiveBackupIndex].banks[findedBankIndex].charts.map(chrt => {
                    return {
                        ...chrt,
                        selected: !selected
                    }
                })
                if (selected) onChange(parents[0], [], true, false)
                else
                    onChange(parents[0], [], !(updatedData[findedActiveBackupIndex].banks.findIndex(bnk => !bnk.selected) < 0), false);
            }
            //chart item selected
            let findedChartIndex =
                updatedData[findedActiveBackupIndex].banks[findedBankIndex].charts.findIndex
                    (chrt => chrt._id === (parents.length === 2 ? _id : parents[2]))

            if (findedChartIndex < 0) {
                setData(updatedData)
                return
            };
            if (parents.length === 2) {
                updatedData[findedActiveBackupIndex].banks[findedBankIndex].charts[findedChartIndex].selected = !selected;

                if (selected) onChange(parents[1], [parents[0]], true, false)
                else
                    onChange(parents[1], [parents[0]], !(updatedData[findedActiveBackupIndex].banks[findedBankIndex].charts.findIndex(chrt => !chrt.selected) < 0), false)
            }
        }
        else if (state === 4) {
            //bank item selected
            let findedBankIndex = updatedData.findIndex(bnk => bnk._id === (parents.length === 0 ? _id : parents[0]))
            if (findedBankIndex < 0) { return };
            if (parents.length === 0) {
                updatedData[findedBankIndex].selected = !selected;
                if (nested)
                    updatedData[findedBankIndex].charts = updatedData[findedBankIndex].charts.map(chrt => {
                        return {
                            ...chrt,
                            selected: !selected
                        }
                    })
            }
            //chart item selected
            let findedChartIndex = updatedData[findedBankIndex].charts.findIndex(chrt => chrt._id === (parents.length === 1 ? _id : parents[1]))
            if (findedChartIndex < 0) {
                setData(updatedData)
                return
            };
            if (parents.length === 1) {
                updatedData[findedBankIndex].charts[findedChartIndex].selected = !selected;
                if (selected) onChange(parents[0], [], true, false)
                else
                    onChange(parents[0], [], !(updatedData[findedBankIndex].charts.findIndex(chrt => !chrt.selected) < 0), false);
            }

        }
        else if (state === 5) {
            //bank item selected
            let findedChartIndex = updatedData.findIndex(chrt => chrt._id === _id)
            if (findedChartIndex < 0) { return };
            if (parents.length === 0) {
                updatedData[findedChartIndex].selected = !selected;
            }
        }

        setData(updatedData)
    }
    const onSaveChangeHandler = async () => {
        let companies = [], softwares = [], activeBackups = [], banks = [], charts = [];
        if (state === 1)
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

        else if (state === 2)
            data.forEach(sft => {
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
        else if (state === 3)
            data.forEach(acb => {
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
        else if (state === 4)
            data.forEach(bnk => {
                if (bnk.selected) banks = [...banks, bnk._id]
                else {
                    bnk.charts.forEach(chrt => {
                        if (chrt.selected) charts = [...charts, chrt._id]
                    })
                }
            })

        else if (state === 5)
            data.forEach(chrt => {
                if (chrt.selected) charts = [...charts, chrt._id]
            })
            // console.log(banks)
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

    const hasChild = (info) => {
        if (info.parents.length === 0) {
            if (state === 1)
                return (info.softwares.length > 0)
            else if (state === 2)
                return (info.active_backups.length > 0)
            else if (state === 3)
                return (info.banks.length > 0)
            else if (state === 4)
                return (info.charts.length > 0)
            else return false
        }
        else if (info.parents.length === 1) {
            if (state === 1)
                return (info.active_backups.length > 0)
            else if (state === 2)
                return (info.banks.length > 0)
            else if (state === 3)
                return (info.charts.length > 0)
            else return false
        }
        else if (info.parents.length === 2) {
            if (state === 1)
                return (info.banks.length > 0)
            else if (state === 2)
                return (info.charts.length > 0)
            else return false
        }
        else if (info.parents.length === 3) {
            if (state === 1)
                return (info.charts.length > 0)
        }
        else return false;

    }

    useEffect(() => {
        if (holdingAccess) {
            let data = [];
            if (state === 1)
                data = holdingAccess.map(
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
            else if (state === 2)
                data = holdingAccess.map(
                    (sft) => {
                        return {
                            ...sft,
                            selected: false,
                            opened: false,
                            parents: [],
                            active_backups: sft.active_backups
                                .map((acb) => {
                                    return {
                                        ...acb,
                                        selected: false,
                                        opened: false,
                                        parents: [sft._id],
                                        banks: acb.banks
                                            .map((bnk) => {
                                                return {
                                                    ...bnk,
                                                    selected: false,
                                                    opened: false,
                                                    parents: [sft._id, acb._id],
                                                    charts: bnk.charts.map(chrt => {
                                                        return {
                                                            _id: chrt.chart._id,
                                                            name: chrt.chart.title,
                                                            selected: false,
                                                            opened: false,
                                                            parents: [sft._id, acb._id, bnk._id],
                                                        }
                                                    })
                                                };
                                            }),
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
                            selected: false,
                            opened: false,
                            parents: [],
                            banks: acb.banks
                                .map((bnk) => {
                                    return {
                                        ...bnk,
                                        selected: false,
                                        opened: false,
                                        parents: [acb._id],
                                        charts: bnk.charts.map(chrt => {
                                            return {
                                                _id: chrt.chart._id,
                                                name: chrt.chart.title,
                                                selected: false,
                                                opened: false,
                                                parents: [acb._id, bnk._id],
                                            }
                                        })
                                    };
                                })
                        };
                    }
                );
            else if (state === 4)
                data = holdingAccess.map(
                    (bnk) => {
                        return {
                            ...bnk,
                            selected: false,
                            opened: false,
                            parents: [],
                            charts: bnk.charts.map(chrt => {
                                return {
                                    _id: chrt.chart._id,
                                    name: chrt.chart.title,
                                    selected: false,
                                    opened: false,
                                    parents: [bnk._id],
                                }
                            })
                        };
                    }
                );
            else if (state === 5)
                data = holdingAccess.map(
                    (chrt) => {
                        return {
                            _id: chrt.chart._id,
                            name: chrt.chart.title,
                            selected: false,
                            opened: false,
                            parents: [],
                        }
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
            if (state === 1)
                holdingAccess.forEach(cmp => {
                    if (userState === 1) {
                        let findedUserCompnayIndex = userAccess.findIndex(uCmp => uCmp._id === cmp._id)
                        if (findedUserCompnayIndex > -1)
                            onChange(cmp._id, [], false)
                        cmp.softwares.forEach(sft => {
                            let uSoftwareIndex = userAccess[findedUserCompnayIndex]?.softwares.findIndex(uSft => uSft._id === sft._id)
                            if (uSoftwareIndex > -1)
                                onChange(sft._id, [cmp._id], false)
                            sft.active_backups.forEach(acb => {
                                let uActiveBackupIndex = userAccess[findedUserCompnayIndex]?.softwares[uSoftwareIndex]?.active_backups.findIndex(uAcb => uAcb._id === acb._id)
                                if (uActiveBackupIndex > -1)
                                    onChange(acb._id, [cmp._id, sft._id], false)
                                acb.banks.forEach(bnk => {
                                    let uBankIndex = userAccess[findedUserCompnayIndex]?.softwares[uSoftwareIndex]?.active_backups[uActiveBackupIndex]?.banks.findIndex(uBnk => uBnk._id === bnk._id)
                                    if (uBankIndex > -1)
                                        onChange(bnk._id, [cmp._id, sft._id, acb._id], false)
                                    bnk.charts.forEach(chrt => {
                                        let uChartIndex = userAccess[findedUserCompnayIndex]?.softwares[uSoftwareIndex]?.active_backups[uActiveBackupIndex]?.banks[uBankIndex]
                                            ?.charts.findIndex(uChrt => uChrt._id === chrt._id)
                                        if (uChartIndex > -1)
                                            onChange(chrt._id, [cmp._id, sft._id, acb._id, bnk._id], false)
                                    })
                                })
                            })
                        })
                    }
                    else if (userState === 2) {
                        cmp.softwares.forEach(sft => {
                            let uSoftwareIndex = userAccess.findIndex(uSft => uSft._id === sft._id)
                            if (uSoftwareIndex > -1)
                                onChange(sft._id, [cmp._id], false)
                            sft.active_backups.forEach(acb => {
                                let uActiveBackupIndex = userAccess[uSoftwareIndex]?.active_backups.findIndex(uAcb => uAcb._id === acb._id)
                                if (uActiveBackupIndex > -1)
                                    onChange(acb._id, [cmp._id, sft._id], false)
                                acb.banks.forEach(bnk => {
                                    let uBankIndex = userAccess[uSoftwareIndex]?.active_backups[uActiveBackupIndex]?.banks.findIndex(uBnk => uBnk._id === bnk._id)
                                    if (uBankIndex > -1)
                                        onChange(bnk._id, [cmp._id, sft._id, acb._id], false)
                                    bnk.charts.forEach(chrt => {
                                        let uChartIndex = userAccess[uSoftwareIndex]?.active_backups[uActiveBackupIndex]?.banks[uBankIndex]?.charts.findIndex(uChrt => uChrt._id === chrt._id)
                                        if (uChartIndex > -1)
                                            onChange(chrt._id, [cmp._id, sft._id, acb._id, bnk._id], false)
                                    })
                                })
                            })
                        })
                    }
                    else if (userState === 3) {
                        cmp.softwares.forEach(sft => {
                            sft.active_backups.forEach(acb => {
                                let uActiveBackupIndex = userAccess.findIndex(uAcb => uAcb._id === acb._id)
                                if (uActiveBackupIndex > -1)
                                    onChange(acb._id, [cmp._id, sft._id], false)
                                acb.banks.forEach(bnk => {
                                    let uBankIndex = userAccess[uActiveBackupIndex]?.banks.findIndex(uBnk => uBnk._id === bnk._id)
                                    if (uBankIndex > -1)
                                        onChange(bnk._id, [cmp._id, sft._id, acb._id], false)
                                    bnk.charts.forEach(chrt => {
                                        let uChartIndex = userAccess[uActiveBackupIndex]?.banks[uBankIndex]?.charts.findIndex(uChrt => uChrt._id === chrt._id)
                                        if (uChartIndex > -1)
                                            onChange(chrt._id, [cmp._id, sft._id, acb._id, bnk._id], false)
                                    })
                                })
                            })
                        })
                    }
                    else if (userState === 4) {
                        cmp.softwares.forEach(sft => {
                            sft.active_backups.forEach(acb => {
                                acb.banks.forEach(bnk => {
                                    let uBankIndex = userAccess.findIndex(uBnk => uBnk._id === bnk._id)
                                    if (uBankIndex > -1)
                                        onChange(bnk._id, [cmp._id, sft._id, acb._id], false)
                                    bnk.charts.forEach(chrt => {
                                        let uChartIndex = userAccess[uBankIndex]?.charts.findIndex(uChrt => uChrt._id === chrt._id)
                                        if (uChartIndex > -1)
                                            onChange(chrt._id, [cmp._id, sft._id, acb._id, bnk._id], false)
                                    })
                                })
                            })
                        })
                    }
                    else if (userState === 5) {
                        cmp.softwares.forEach(sft => {
                            sft.active_backups.forEach(acb => {
                                acb.banks.forEach(bnk => {
                                    bnk.charts.forEach(chrt => {
                                        let uChartIndex = userAccess.findIndex(uChrt => uChrt._id === chrt._id)
                                        if (uChartIndex > -1)
                                            onChange(chrt._id, [cmp._id, sft._id, acb._id, bnk._id], false)
                                    })
                                })
                            })
                        })
                    }
                })
            else if (state === 2) {
                holdingAccess.forEach(sft => {
                    if (userState === 1) {
                        let uCompanyIndex, uSoftwareIndex;
                        userAccess.forEach((uCompany, indx) => {
                            if (uSoftwareIndex > -1) return;
                            uSoftwareIndex = uCompany.softwares.findIndex(uSft => uSft._id === sft._id);
                            if (uSoftwareIndex > -1) uCompanyIndex = indx
                        });
                        if (uSoftwareIndex > -1)
                            onChange(sft._id, [], false)
                        sft.active_backups.forEach(acb => {
                            let uActiveBackupIndex = userAccess[uCompanyIndex]?.softwares[uSoftwareIndex]?.active_backups.findIndex(uAcb => uAcb._id === acb._id)
                            if (uActiveBackupIndex > -1)
                                onChange(acb._id, [sft._id], false)
                            acb.banks.forEach(bnk => {
                                let uBankIndex = userAccess[uCompanyIndex]?.softwares[uSoftwareIndex]?.active_backups[uActiveBackupIndex]?.banks.findIndex(uBnk => uBnk._id === bnk._id)
                                if (uBankIndex > -1)
                                    onChange(bnk._id, [sft._id, acb._id], false)
                                bnk.charts.forEach(chrt => {
                                    let uChartIndex = userAccess[uCompanyIndex]?.softwares[uSoftwareIndex]?.active_backups[uActiveBackupIndex]?.banks[uBankIndex].charts.findIndex(uChrt => uChrt.chart._id === chrt.chart._id)
                                    if (uChartIndex > -1)
                                        onChange(chrt.chart._id, [sft._id, acb._id, bnk._id], false)
                                })
                            })
                        })
                    }
                    else if (userState === 2) {
                        let uSoftwareIndex = userAccess.findIndex(uSft => uSft._id === sft._id);
                        if (uSoftwareIndex > -1)
                            onChange(sft._id, [], false)
                        sft.active_backups.forEach(acb => {
                            let uActiveBackupIndex = userAccess[uSoftwareIndex]?.active_backups.findIndex(uAcb => uAcb._id === acb._id)
                            if (uActiveBackupIndex > -1)
                                onChange(acb._id, [sft._id], false)
                            acb.banks.forEach(bnk => {
                                let uBankIndex = userAccess[uSoftwareIndex]?.active_backups[uActiveBackupIndex]?.banks.findIndex(uBnk => uBnk._id === bnk._id)
                                if (uBankIndex > -1)
                                    onChange(bnk._id, [sft._id, acb._id], false)
                                bnk.charts.forEach(chrt => {
                                    let uChartIndex = userAccess[uSoftwareIndex]?.active_backups[uActiveBackupIndex]?.banks[uBankIndex].charts.findIndex(uChrt => uChrt.chart._id === chrt.chart._id)
                                    if (uChartIndex > -1)
                                        onChange(chrt.chart._id, [sft._id, acb._id, bnk._id], false)
                                })
                            })
                        })
                    }
                    else if (userState === 3) {
                        sft.active_backups.forEach(acb => {
                            let uActiveBackupIndex = userAccess.findIndex(uAcb => uAcb._id === acb._id)
                            if (uActiveBackupIndex > -1)
                                onChange(acb._id, [sft._id], false)
                            acb.banks.forEach(bnk => {
                                let uBankIndex = userAccess[uActiveBackupIndex]?.banks.findIndex(uBnk => uBnk._id === bnk._id)
                                if (uBankIndex > -1)
                                    onChange(bnk._id, [sft._id, acb._id], false)
                                bnk.charts.forEach(chrt => {
                                    let uChartIndex = userAccess[uActiveBackupIndex]?.banks[uBankIndex]?.charts.findIndex(uChrt => uChrt.chart._id === chrt.chart._id)
                                    if (uChartIndex > -1)
                                        onChange(chrt.chart._id, [sft._id, acb._id, bnk._id], false)
                                })
                            })
                        })
                    }
                    else if (userState === 4) {
                        sft.active_backups.forEach(acb => {
                            acb.banks.forEach(bnk => {
                                let uBankIndex = userAccess.findIndex(uBnk => uBnk._id === bnk._id)
                                if (uBankIndex > -1)
                                    onChange(bnk._id, [sft._id, acb._id], false)
                                bnk.charts.forEach(chrt => {
                                    let uChartIndex = userAccess[uBankIndex]?.charts.findIndex(uChrt => uChrt.chart._id === chrt.chart._id)
                                    if (uChartIndex > -1)
                                        onChange(chrt.chart._id, [sft._id, acb._id, bnk._id], false)
                                })
                            })
                        })
                    }
                    else if (userState === 5) {
                        sft.active_backups.forEach(acb => {
                            acb.banks.forEach(bnk => {
                                bnk.charts.forEach(chrt => {
                                    let uChartIndex = userAccess.findIndex(uChrt => uChrt.chart._id === chrt.chart._id)
                                    if (uChartIndex > -1)
                                        onChange(chrt.chart._id, [sft._id, acb._id, bnk._id], false)
                                })
                            })
                        })
                    }
                })
            }
            else if (state === 3) {
                holdingAccess.forEach(acb => {
                    if (userState === 1) {
                        let uCompanyIndex, uSoftwareIndex, uActiveBackupIndex;
                        userAccess.forEach((uCompany, indx) => {
                            if (uSoftwareIndex > -1) return;
                            uCompany.softwares.forEach((uSft, sftIndx) => {
                                if (uActiveBackupIndex > -1) return;
                                uActiveBackupIndex = uSft.active_backups.findIndex(uAcb => uAcb._id === acb._id);
                                if (uActiveBackupIndex > -1) {
                                    uSoftwareIndex = sftIndx;
                                    uCompanyIndex = indx
                                }

                            })
                        });
                        if (uActiveBackupIndex > -1)
                            onChange(acb._id, [], false)
                        acb.banks.forEach(bnk => {
                            let uBankIndex = userAccess[uCompanyIndex]?.softwares[uSoftwareIndex]?.active_backups[uActiveBackupIndex]?.banks.findIndex(uBnk => uBnk._id === bnk._id)
                            if (uBankIndex > -1)
                                onChange(bnk._id, [acb._id], false)
                            bnk.charts.forEach(chrt => {
                                let uChartIndex = userAccess[uCompanyIndex]?.softwares[uSoftwareIndex]?.active_backups[uActiveBackupIndex]?.banks[uBankIndex]?.charts.findIndex(uChrt => uChrt.chart._id === chrt.chart._id)
                                if (uChartIndex > -1)
                                    onChange(chrt.chart._id, [acb._id, bnk._id], false)
                            })
                        })
                    }
                    else if (userState === 2) {
                        let uSoftwareIndex, uActiveBackupIndex;
                        userAccess.forEach((uSft, indx) => {
                            if (uActiveBackupIndex > -1) return;
                            uActiveBackupIndex = uSft.active_backups.findIndex(uAcb => uAcb._id === acb._id);
                            if (uActiveBackupIndex > -1) {
                                uSoftwareIndex = indx
                            }
                        });
                        if (uActiveBackupIndex > -1)
                            onChange(acb._id, [], false)
                        acb.banks.forEach(bnk => {
                            let uBankIndex = userAccess[uSoftwareIndex]?.active_backups[uActiveBackupIndex]?.banks.findIndex(uBnk => uBnk._id === bnk._id)
                            if (uBankIndex > -1)
                                onChange(bnk._id, [acb._id], false)
                            bnk.charts.forEach(chrt => {
                                let uChartIndex = userAccess[uSoftwareIndex]?.active_backups[uActiveBackupIndex]?.banks[uBankIndex]?.charts.findIndex(uChrt => uChrt.chart._id === chrt.chart._id)
                                if (uChartIndex > -1)
                                    onChange(chrt.chart._id, [acb._id, bnk._id], false)
                            })
                        })
                    }
                    else if (userState === 3) {
                        let uActiveBackupIndex = userAccess.findIndex(uAcb => uAcb._id === acb._id);;
                        if (uActiveBackupIndex > -1)
                            onChange(acb._id, [], false)
                        acb.banks.forEach(bnk => {
                            let uBankIndex = userAccess[uActiveBackupIndex]?.banks.findIndex(uBnk => uBnk._id === bnk._id)
                            if (uBankIndex > -1)
                                onChange(bnk._id, [acb._id], false)
                            bnk.charts.forEach(chrt => {
                                let uChartIndex = userAccess[uActiveBackupIndex]?.banks[uBankIndex]?.charts.findIndex(uChrt => uChrt.chart._id === chrt.chart._id)
                                if (uChartIndex > -1)
                                    onChange(chrt.chart._id, [acb._id, bnk._id], false)
                            })
                        })
                    }
                    else if (userState === 4) {
                        acb.banks.forEach(bnk => {
                            let uBankIndex = userAccess.findIndex(uBnk => uBnk._id === bnk._id)
                            if (uBankIndex > -1)
                                onChange(bnk._id, [acb._id], false)
                            bnk.charts.forEach(chrt => {
                                let uChartIndex = userAccess[uBankIndex]?.charts.findIndex(uChrt => uChrt.chart._id === chrt.chart._id)
                                if (uChartIndex > -1)
                                    onChange(chrt.chart._id, [acb._id, bnk._id], false)
                            })
                        })
                    }
                    else if (userState === 5) {
                        acb.banks.forEach(bnk => {
                            bnk.charts.forEach(chrt => {
                                let uChartIndex = userAccess.findIndex(uChrt => uChrt.chart._id === chrt.chart._id)
                                if (uChartIndex > -1)
                                    onChange(chrt.chart._id, [acb._id, bnk._id], false)
                            })
                        })
                    }
                })
            }
            else if (state === 4) {
                holdingAccess.forEach(bnk => {
                    if (userState === 1) {
                        let uCompanyIndex, uSoftwareIndex, uActiveBackupIndex, uBankIndex;
                        userAccess.forEach((uCompany, indx) => {
                            if (uSoftwareIndex > -1) return;
                            uCompany.softwares.forEach((uSft, sftIndx) => {
                                if (uActiveBackupIndex > -1) return;
                                uSft.active_backups.forEach((uAcb, acbIndx) => {
                                    if (uBankIndex > -1) return;
                                    uBankIndex = uAcb.banks.findIndex(uBnk => uBnk._id === bnk._id);
                                    if (uBankIndex > -1) {
                                        uSoftwareIndex = sftIndx;
                                        uCompanyIndex = indx;
                                        uActiveBackupIndex = acbIndx;
                                    }

                                })

                            })
                        });
                        if (uBankIndex > -1)
                            onChange(bnk._id, [], false)
                        bnk.charts.forEach(chrt => {
                            let uChartIndex = userAccess[uCompanyIndex]?.softwares[uSoftwareIndex]?.active_backups[uActiveBackupIndex]?.banks[uBankIndex]?.charts.findIndex(uChrt => uChrt.chart._id === chrt.chart._id)
                            if (uChartIndex > -1)
                                onChange(chrt.chart._id, [bnk._id], false)
                        })
                    }
                    else if (userState === 2) {
                        let uSoftwareIndex, uActiveBackupIndex, uBankIndex;
                        userAccess.forEach((uSft, sftIndx) => {
                            if (uActiveBackupIndex > -1) return;
                            uSft.active_backups.forEach((uAcb, acbIndx) => {
                                if (uBankIndex > -1) return;
                                uBankIndex = uAcb.banks.findIndex(uBnk => uBnk._id === bnk._id);
                                if (uBankIndex > -1) {
                                    uSoftwareIndex = sftIndx;
                                    uActiveBackupIndex = acbIndx;
                                }

                            })

                        })
                        if (uBankIndex > -1)
                            onChange(bnk._id, [], false)
                        bnk.charts.forEach(chrt => {
                            let uChartIndex = userAccess[uSoftwareIndex]?.active_backups[uActiveBackupIndex]?.banks[uBankIndex]?.charts.findIndex(uChrt => uChrt.chart._id === chrt.chart._id)
                            if (uChartIndex > -1)
                                onChange(chrt.chart._id, [bnk._id], false)
                        })
                    }
                    else if (userState === 3) {
                        let uActiveBackupIndex, uBankIndex;
                        userAccess.forEach((uAcb, acbIndx) => {
                            if (uBankIndex > -1) return;
                            uBankIndex = uAcb.banks.findIndex(uBnk => uBnk._id === bnk._id);
                            if (uBankIndex > -1) {
                                uActiveBackupIndex = acbIndx;
                            }

                        })
                        if (uBankIndex > -1)
                            onChange(bnk._id, [], false)
                        bnk.charts.forEach(chrt => {
                            let uChartIndex = userAccess[uActiveBackupIndex]?.banks[uBankIndex]?.charts.findIndex(uChrt => uChrt.chart._id === chrt.chart._id)
                            if (uChartIndex > -1)
                                onChange(chrt.chart._id, [bnk._id], false)
                        })
                    }
                    else if (userState === 4) {
                        let uBankIndex;
                        uBankIndex = userAccess.findIndex(uBnk => uBnk._id === bnk._id);
                        if (uBankIndex > -1)
                            onChange(bnk._id, [], false)
                        bnk.charts.forEach(chrt => {
                            let uChartIndex = [uBankIndex]?.charts.findIndex(uChrt => uChrt.chart._id === chrt.chart._id)
                            if (uChartIndex > -1)
                                onChange(chrt.chart._id, [bnk._id], false)
                        })
                    }
                    else if (userState === 5) {
                        let uBankIndex;
                        uBankIndex = userAccess.findIndex(uBnk => uBnk._id === bnk._id);
                        if (uBankIndex > -1)
                            onChange(bnk._id, [], false)
                        bnk.charts.forEach(chrt => {
                            let uChartIndex = [uBankIndex]?.charts.findIndex(uChrt => uChrt.chart._id === chrt.chart._id)
                            if (uChartIndex > -1)
                                onChange(chrt.chart._id, [bnk._id], false)
                        })
                    }

                })
            }
            else if (state === 5) {
                holdingAccess.forEach(chrt => {
                    if (userState === 1) {
                        let uCompanyIndex, uSoftwareIndex, uActiveBackupIndex, uBankIndex, uChartIndex;
                        userAccess.forEach((uCompany, indx) => {
                            if (uSoftwareIndex > -1) return;
                            uCompany.softwares.forEach((uSft, sftIndx) => {
                                if (uActiveBackupIndex > -1) return;
                                uSft.active_backups.forEach((uAcb, acbIndx) => {
                                    if (uBankIndex > -1) return;
                                    uAcb.banks.forEach((uBnk, bnkIndex) => {
                                        if (uChartIndex > -1) return;
                                        uChartIndex = uBnk.charts.findIndex(uChrt => uChrt.chart._id === chrt.chart._id);
                                        if (uChartIndex > -1) {
                                            uSoftwareIndex = sftIndx;
                                            uCompanyIndex = indx;
                                            uActiveBackupIndex = acbIndx;
                                            uBankIndex = bnkIndex;
                                        }
                                    })

                                })

                            })
                        });
                        if (uChartIndex > -1)
                            onChange(chrt.chart._id, [], false)
                    }
                    else if (userState === 2) {
                        let uSoftwareIndex, uActiveBackupIndex, uBankIndex, uChartIndex;
                        userAccess.forEach((uSft, sftIndx) => {
                            if (uActiveBackupIndex > -1) return;
                            uSft.active_backups.forEach((uAcb, acbIndx) => {
                                if (uBankIndex > -1) return;
                                uAcb.banks.forEach((uBnk, bnkIndex) => {
                                    if (uChartIndex > -1) return;
                                    uChartIndex = uBnk.charts.findIndex(uChrt => uChrt.chart._id === chrt.chart._id);
                                    if (uChartIndex > -1) {
                                        uSoftwareIndex = sftIndx;
                                        uActiveBackupIndex = acbIndx;
                                        uBankIndex = bnkIndex;
                                    }
                                })

                            })

                        })
                        if (uChartIndex > -1)
                            onChange(chrt.chart._id, [], false)
                    }
                    else if (userState === 3) {
                        let uActiveBackupIndex, uBankIndex, uChartIndex;
                        userAccess.forEach((uAcb, acbIndx) => {
                            if (uBankIndex > -1) return;
                            uAcb.banks.forEach((uBnk, bnkIndex) => {
                                if (uChartIndex > -1) return;
                                uChartIndex = uBnk.charts.findIndex(uChrt => uChrt.chart._id === chrt.chart._id);
                                if (uChartIndex > -1) {
                                    uActiveBackupIndex = acbIndx;
                                    uBankIndex = bnkIndex;
                                }
                            })

                        })
                        if (uChartIndex > -1)
                            onChange(chrt.chart._id, [], false)
                    }
                    else if (userState === 4) {
                        let uBankIndex, uChartIndex;
                        userAccess.forEach((uBnk, bnkIndex) => {
                            if (uChartIndex > -1) return;
                            uChartIndex = uBnk.charts.findIndex(uChrt => uChrt.chart._id === chrt.chart._id);
                            if (uChartIndex > -1) {
                                uBankIndex = bnkIndex;
                            }
                        })
                        if (uChartIndex > -1)
                            onChange(chrt.chart._id, [], false)
                    }
                    else if (userState === 5) {
                        let uChartIndex;
                        uChartIndex = userAccess.findIndex(uChrt => uChrt.chart._id === chrt.chart._id);
                        if (uChartIndex > -1)
                            onChange(chrt.chart._id, [], false)
                    }
                })
            }
            setDataInitiated(false)
        }
    }, [dataInitiated, data, userAccess])

    useEffect(() => {
        if (!data) return;
        let updatedOrders = []
        if (state === 1) {
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
        }
        else if (state === 2) {
            data.forEach(sft => {
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
        }
        else if (state === 3) {
            data.forEach(acb => {
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
        }
        else if (state === 4) {
            data.forEach(bnk => {
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
        }
        else if (state === 5) {
            data.forEach(chrt => {
                updatedOrders.push({
                    ...chrt
                })
            })
        }

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
                            hasChild={() => hasChild(info)}
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

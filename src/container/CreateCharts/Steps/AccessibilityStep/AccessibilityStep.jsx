import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stringFa } from "../../../../assets/strings/stringFaCollection";
import CheckBox from "../../../../component/UI/CheckBox/CheckBox";
import { useTheme } from "../../../../styles/ThemeProvider";
import * as addChartActions from "../../../../store/actions/addChart";
import "./AccessibilityStep.scss";
import Button from "../../../../component/UI/Button/Button";

const AccessibilityStep = () => {
    const themeState = useTheme();
    const theme = themeState.computedTheme;
    const [pageBtnOrder, setPageBtnOrder] = useState(
        {
            view: {
                id: 1,
                title: stringFa.view,
                selected: true
            },
            share: {
                id: 3,
                title: stringFa.share,
                selected: false
            },
            edit: {
                id: 2,
                title: stringFa.Edit,
                selected: false
            }
        })
    const [accessType, setAccessType] = useState("view");
    // const [loading, setLoading] = useState(false);
    // const [employees, setEmployees] = useState(new Array(0).fill(""));
    const [error, setError] = useState(null);
    const [isChanged, setIsChanged] = useState({ view: false, share: false, edit: false });
    const [changed, setChanged] = useState([]);
    const [changedAccess, setChangedAccess] = useState(null);

    const { chartData, emptyRequireds, employees } = useSelector((state) => state.addChart);

    const dispatch = useDispatch();
    const setAccessToAll = (access) => {
        dispatch(addChartActions.setAccessToAll(access));
    };
    const updateAccessList = (accessList) => {
        dispatch(addChartActions.updateAccessList(accessList));
    };

    const onItemClickHandler = (key) => {
        const updatedPageBtnOrder = { ...pageBtnOrder }
        const updatedItem = updatedPageBtnOrder[key];
        for (const item in updatedPageBtnOrder) {
            updatedPageBtnOrder[item].selected = false;
        }
        updatedItem.selected = true;
        updatedPageBtnOrder[key] = updatedItem;
        setPageBtnOrder(updatedPageBtnOrder)
    }
    const allCheckBoxOnChange = () => {
        let updatedAccess = !chartData[`${accessType}All`];
        if (accessType === "view") {
            if ((chartData.shareAll || chartData.editAll) && !updatedAccess) {
                setChangedAccess("ویرایش و اشتراک گذاری")
                setChanged(["all"])
            } else
                setAccessToAll({ accessType, access: updatedAccess })
        }
        else if (accessType === "share") {
            if (!chartData.viewAll && updatedAccess) {
                setChangedAccess("نمایش")
                setChanged(["all"])
            } else
                setAccessToAll({ accessType, access: updatedAccess })
        }
        else if (accessType === "edit") {
            if ((!chartData.shareAll || !chartData.viewAll) && updatedAccess) {
                setChangedAccess("نمایش و اشتراک گذاری")
                setChanged(["all"])
            } else
                setAccessToAll({ accessType, access: updatedAccess })
        }
    }

    const employeeCheckBoxOnChange = (e, emp) => {
        let updatedIsChanged = { ...isChanged }

        if (accessType === "view") {
            if ((isChanged.edit || isChanged.share) && !e.target.checked) {
                setChangedAccess("ویرایش و اشتراک گذاری")
                setChanged([emp, e.target.checked])
            } else
                updateAccessList({ accessType, employee: emp, add: e.target.checked })
            if (e.target.checked) {
                updatedIsChanged.view = true;
                setIsChanged(updatedIsChanged)
            }
        }
        else if (accessType === "share") {
            if (isChanged.view && e.target.checked) {
                setChangedAccess("نمایش")
                setChanged([emp, e.target.checked])
            } else
                updateAccessList({ accessType, employee: emp, add: e.target.checked })
            if (e.target.checked) {
                updatedIsChanged.share = true;
                updatedIsChanged.view = true;
                setIsChanged(updatedIsChanged)
            }
        }
        else if (accessType === "edit") {
            if ((isChanged.share || isChanged.view) && e.target.checked) {
                setChangedAccess("نمایش و اشتراک گذاری")
                setChanged([emp, e.target.checked])
            } else
                updateAccessList({ accessType, employee: emp, add: e.target.checked })
            if (e.target.checked) {
                updatedIsChanged.edit = true;
                updatedIsChanged.share = true;
                updatedIsChanged.view = true;
                setIsChanged(updatedIsChanged)
            }
        }

    }

    const onChangeOkClick = () => {
        if (changed.length === 1)
            setAccessToAll({ accessType, access: !chartData[`${accessType}All`] })
        else if (changed.length > 1) {
            updateAccessList({ accessType, employee: changed[0], add: changed[1] })
            setIsChanged({ view: false, share: false, edit: false })
        }

        setChanged([])
        setChangedAccess(null)
    }

    useEffect(() => {
        for (const btn in pageBtnOrder) {
            if (pageBtnOrder[btn].selected)
                setAccessType(btn)
        }
    }, [pageBtnOrder])



    return <div className="accessibility-step">
        {error}
        {changedAccess &&
            <div className="is-changed-error">
                <p>{`${changedAccess} هم تغییر می کند`}</p>
                <div>
                    <Button
                        ButtonStyle={{
                            margin: "1rem 0.3rem", fontSize: "0.8rem"
                        }}
                        onClick={onChangeOkClick}
                    >
                        باشه
                    </Button>
                    <Button
                        cancel={true}
                        ButtonStyle={{
                            margin: "1rem 0.3rem", fontSize: "0.8rem"
                        }}
                        onClick={() => { setChangedAccess(null); setChanged([]) }}
                    >
                        انصراف
                    </Button>
                </div>
            </div>}
        <div className="accessibility-page-btn">
            {
                Object.entries(pageBtnOrder).map(([k, v], index) => {
                    return (
                        <div
                            className="page-btn-item"
                            key={k}
                            onClick={() => onItemClickHandler(k)}
                            style={{
                                backgroundColor: v.selected ? theme.primary : theme.border_color,
                                cursor: v.selected ? "default" : "pointer",
                                color: v.selected ? theme.on_primary : theme.on_background,
                                border: emptyRequireds.length > 0 ?
                                    emptyRequireds.includes(k) ? `1px solid ${theme.error}` : "" : "",
                            }}
                        >
                            <p style={{
                                borderRight: emptyRequireds.length > 0 ?
                                    emptyRequireds.includes(k) ? "" :
                                        index > 0 ? `1px solid ${theme.darken_border_color}` : "" :
                                    index > 0 ? `1px solid ${theme.darken_border_color}` : ""
                            }}>
                                {v.title}
                            </p>
                        </div>
                    )
                })
            }
        </div>
        <div className="allowed-employees">
            <CheckBox
                checked={chartData[`${accessType}All`]}
                onChange={allCheckBoxOnChange}
                checkmarkStyle={{ width: "13px", height: "13px", }} />
            {stringFa.all_allowed_employees}
        </div>
        <div className={`employees-list ${chartData[`${accessType}All`] && "disabled-div"}`} style={{ borderColor: theme.border_color }}>
            <div className="all">
                <CheckBox
                    checked={chartData[`${accessType}List`].length === employees.length && true}
                    onChange={(e) => employeeCheckBoxOnChange(e, employees)}
                    checkmarkStyle={{ width: "13px", height: "13px", }} />
                {stringFa.all}
            </div>
            {employees &&
                employees.map((emp) =>
                    <div key={emp.user._id} className="employee-item">
                        <CheckBox
                            checked={chartData[`${accessType}List`].find((e) => e === emp.user._id) && true}
                            onChange={(e) => employeeCheckBoxOnChange(e, [emp.user._id])}
                            checkmarkStyle={{ width: "13px", height: "13px", }}
                        />
                        {emp.user.username}
                    </div>
                )}
        </div>
    </div>;
};

export default AccessibilityStep;

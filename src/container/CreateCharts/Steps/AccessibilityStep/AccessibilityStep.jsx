import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stringFa } from "../../../../assets/strings/stringFaCollection";
import CheckBox from "../../../../component/UI/CheckBox/CheckBox";
import ErrorDialog from "../../../../component/UI/Error/ErrorDialog";
import { baseUrl } from "../../../../constants/Config";
import { useTheme } from "../../../../styles/ThemeProvider";
import * as addChartActions from "../../../../store/actions/addChart";
import "./AccessibilityStep.scss";

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
            edit: {
                id: 2,
                title: stringFa.Edit,
                selected: false
            },
            share: {
                id: 3,
                title: stringFa.share,
                selected: false
            }
        })
    const [accessType, setAccessType] = useState("view");
    const [loading, setLoading] = useState(false);
    const [employees, setEmployees] = useState(new Array(0).fill(""));
    const [error, setError] = useState(null);

    const selectedHolding = useSelector((state) => state.holdingDetail.selectedHolding);
    const { chartData, emptyRequireds } = useSelector((state) => state.addChart);
    const { token, userId } = useSelector((state) => state.auth);

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
        setAccessToAll({ accessType, access: updatedAccess })
    }

    const employeeCheckBoxOnChange = (e, emp) => {
        updateAccessList({ accessType, employee: emp, add: e.target.checked })
    }

    useEffect(() => {
        for (const btn in pageBtnOrder) {
            if (pageBtnOrder[btn].selected)
                setAccessType(btn)
        }
    }, [pageBtnOrder])

    useEffect(async () => {
        try {
            setLoading(true)
            const resultFetchingUsers = await axios.post(
                `${baseUrl}api/get_employees`,
                { id: selectedHolding.holdingId },
                { headers: { "auth-token": token } }
            );
            if (resultFetchingUsers.data.success) {
                const res = resultFetchingUsers.data.result.employees.filter((employee) => !employee.user.is_fekrafzar && userId !== employee.user._id)
                setEmployees(res)
            }
            else
                setError(<ErrorDialog onClose={setError}>{stringFa.error_message}</ErrorDialog>)
            setLoading(false)
        } catch (e) {
            setError(<ErrorDialog onClose={setError}>{stringFa.error_occured_try_again}</ErrorDialog>)
        }
    }, []);


    return <div className="accessibility-step">
        {error}
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

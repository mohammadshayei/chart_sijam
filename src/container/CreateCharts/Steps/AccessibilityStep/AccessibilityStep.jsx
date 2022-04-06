import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { stringFa } from "../../../../assets/strings/stringFaCollection";
import CheckBox from "../../../../component/UI/CheckBox/CheckBox";
import ErrorDialog from "../../../../component/UI/Error/ErrorDialog";
import { baseUrl } from "../../../../constants/Config";
import { useTheme } from "../../../../styles/ThemeProvider";
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
    const [accessType, setAccessType] = useState(null);
    const [loading, setLoading] = useState(false);
    const [employees, setEmployees] = useState(null);
    const [error, setError] = useState(null);

    const selectedHolding = useSelector((state) => state.holdingDetail.selectedHolding);
    const chartData = useSelector((state) => state.addChart);
    const { token, userId } = useSelector((state) => state.auth);
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
                            className={`page-btn-item ${v.selected ? "selected-page-btn-item" : ""}`}
                            key={k}
                            onClick={() => onItemClickHandler(k)}
                            style={{
                                backgroundColor: v.selected ? theme.primary : theme.border_color,
                                cursor: v.selected ? "default" : "pointer",
                                color: v.selected ? theme.on_primary : theme.on_background,
                                borderRight: index > 0 ? `1px solid${theme.darken_border_color}` : "",
                            }}
                        >
                            {v.title}
                        </div>
                    )
                })
            }
        </div>
        <div className="employees-list">
            <div className="all">
                <CheckBox
                    checked={chartData[`${accessType}All`]}
                    onChange={allCheckBoxOnChange}
                    checkmarkStyle={{ width: "13px", height: "13px", }} />
                {stringFa.all}
            </div>
            {employees &&
                employees.map((emp) =>
                    <div className="employee-item">
                        <CheckBox checkmarkStyle={{ width: "13px", height: "13px", }} />
                        {emp.user.username}
                    </div>
                )}
        </div>
    </div>;
};

export default AccessibilityStep;

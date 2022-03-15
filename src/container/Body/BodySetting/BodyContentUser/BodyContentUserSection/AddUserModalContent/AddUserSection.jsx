import { useState } from "react";
import Button from "../../../../../../component/UI/Button/Button";
import { IoAlertCircleOutline } from "react-icons/io5";
import { useTheme } from "../../../../../../styles/ThemeProvider";
import { baseUrl } from "../../../../../../constants/Config";
import { useDispatch, useSelector } from "react-redux";
import * as holdingActions from "../../../../../../store/actions/holdingDetail";
import ErrorDialog from "../../../../../../component/UI/Error/ErrorDialog";
import axios from "axios";
import { stringFa } from "../../../../../../assets/strings/stringFaCollection";

const AddUserSection = (props) => {
    const [loading, setLoading] = useState(false);
    const themeState = useTheme();
    const theme = themeState.computedTheme;
    const token = useSelector((state) => state.auth.token);
    const {selectedHolding}  = useSelector((state) => state.holdingDetail);

    const dispatch = useDispatch();
    const addEmployee = (employee) => {
        dispatch(holdingActions.addEmployee(employee));
    };

    const addButtonHandler = async () => {
        setLoading(true)
        try {
            const resultAddUser = await axios.post(
                `${baseUrl}api/add_employee`,
                {
                    holdingId: selectedHolding.holdingId,
                    phone: `${props.phone}`,
                },
                { headers: { "auth-token": token } }
            );
            if (resultAddUser.data.success) {
                addEmployee(resultAddUser.data.result.employee)
                props.setError(
                    <ErrorDialog success={true} onClose={props.setError}>{resultAddUser.data.result.message}</ErrorDialog>
                )
                props.close();
            }
            else
                props.setError(
                    <ErrorDialog onClose={props.setError}>{resultAddUser.data.result.message}</ErrorDialog>
                )
        } catch (error) {
            props.setError(
                <ErrorDialog onClose={props.setError}>{stringFa.error_occured_try_again}</ErrorDialog>
            )
        }
        setLoading(false)
    }

    return <div className="add-user-container">
        <div className="add-user-header">
            <IoAlertCircleOutline className="alert-circle-icon" color={theme.error} />
            <p>.کاربر با شماره {props.phone} موجود است</p>
        </div>
        <div className="add-user-footer">
            <Button
                disabled={loading}
                onClick={() => props.setPage(1)}>
                بازگشت
            </Button>
            <Button
                loading={loading}
                ButtonStyle={{ margin: "0 auto", padding: " 0 2.5rem", backgroundColor: theme.success }}
                onClick={addButtonHandler}>
                + اضافه شود
            </Button>
        </div>
    </div>;
};

export default AddUserSection;

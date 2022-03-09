import Button from "../../../../../../component/UI/Button/Button";
import { IoAlertCircleOutline } from "react-icons/io5";
import { useTheme } from "../../../../../../styles/ThemeProvider";
import { baseUrl } from "../../../../../../constants/Config";
import { useSelector } from "react-redux";
import axios from "axios";

const AddUserSection = (props) => {
    const themeState = useTheme();
    const theme = themeState.computedTheme;
    const token = useSelector((state) => state.auth.token);

    const addButtonHandler = async () => {
        const resultAddUser = await axios.post(
            `${baseUrl}api/add_employee`,
            {
                holdingId: "2e010adffd1a4ea88f8f3e7b026ce048",
                phone: `${props.phone}`,
            },
            { headers: { "auth-token": token } }
        );
        props.close()
    }

    return <div className="add-user-container">
        <div className="add-user-header">
            <IoAlertCircleOutline className="alert-circle-icon" color={theme.error} />
            <p>.کاربر با شماره {props.phone} موجود است</p>
        </div>
        <div className="add-user-footer">
            <Button
                onClick={() => props.setPage(1)}>
                بازگشت
            </Button>
            <Button
                ButtonStyle={{ margin: "0 auto", padding: " 0 2.5rem", backgroundColor: theme.success }}
                onClick={addButtonHandler}>
                + اضافه شود
            </Button>
        </div>
    </div>;
};

export default AddUserSection;

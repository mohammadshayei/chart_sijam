import "./Filter.scss";
import Input from "../../../../component/UI/Input/Input";
import CheckBox from "../../../../component/UI/CheckBox/CheckBox";
import StyledButton from "../../../../component/UI/Button/StyledButton";
import { MdCancel } from "react-icons/md";
import { useTheme } from "../../../../styles/ThemeProvider";

const FieldFilter = (props) => {
    const themeState = useTheme();
    const theme = themeState.computedTheme;
    return <div className="field-filter-wrapper">
        <StyledButton
            onClick={() => props.remove(props.index)}
            ButtonStyle={{ margin: "0.3rem 0 0.3rem 0.3rem" }}
            hover={
                themeState.isDark ? theme.surface_1dp : theme.background_color
            }
        >
            <MdCancel />
        </StyledButton>
        <Input
            inputContainer={{ width: "100%" }}
            elementType="input"
            onChange={props.onFilterValueChange}
            isOk={true}
            value={props.filterValues[props.index].content.value}
            title={props.field.name}
        />
        <CheckBox
            checked={props.filterValues[props.index].content.not}
            onChange={props.onNotValueChange}
            style={{ fontSize: "0.7rem", marginRight: "1rem", marginBottom: "0.5rem" }}
            checkmarkStyle={{ width: "15px", height: "15px" }}
        >نقیض
        </CheckBox>
    </div>;
};

export default FieldFilter;

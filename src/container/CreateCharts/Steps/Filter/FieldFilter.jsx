import { useEffect, useState } from "react";
import "./Filter.scss";
import Input from "../../../../component/UI/Input/Input";
import CheckBox from "../../../../component/UI/CheckBox/CheckBox";
import StyledButton from "../../../../component/UI/Button/StyledButton";
import { MdCancel } from "react-icons/md";
import { useTheme } from "../../../../styles/ThemeProvider";

const FieldFilter = (props) => {
    const [value, setValue] = useState("");
    const [not, setNot] = useState(false);

    const themeState = useTheme();
    const theme = themeState.computedTheme;

    const onInputChange = (e) => {
        setValue(e)
    }

    useEffect(() => {
        let updatedFilterValues = props.filterValues;
        updatedFilterValues[props.index].content.not = not;
        props.setFilterValues(updatedFilterValues);
    }, [not]);

    useEffect(() => {
        let updatedFilterValues = props.filterValues;
        updatedFilterValues[props.index].content.value = value;
        props.setFilterValues(updatedFilterValues);
    }, [value]);

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
            onChange={(e) => onInputChange(e.target.value)}
            isOk={true}
            value={value}
            title={props.field.name}
        />
        <CheckBox
            checked={not}
            onChange={(e) => setNot(e.target.checked)}
            style={{ fontSize: "0.7rem", marginRight: "1rem", marginBottom: "0.5rem" }}
            checkmarkStyle={{ width: "15px", height: "15px" }}
        >نقیض
        </CheckBox>
    </div>;
};

export default FieldFilter;

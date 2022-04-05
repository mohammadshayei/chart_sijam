import { useEffect, useState } from "react";
import "./Filter.scss";
import Input from "../../../../component/UI/Input/Input";
import Spinner from "../../../../component/UI/Loading/Spinner/Spinner";
import { useTheme } from "../../../../styles/ThemeProvider";
import FilterFieldPicker from "./FilterFieldPicker";

const FieldFilter = (props) => {
    const themeState = useTheme();
    const theme = themeState.computedTheme;
    const [selectedFunction, setSelectedFunction] = useState(null);
    const [selectedField, setSelectedField] = useState(null);
    const [value, setValue] = useState(null);
    const functions = ["AND", "OR", "NOT", "EXACT"];

    const onSelectLabelChangeHandler = (e) => {
        if (e.target.value === '') {
            setSelectedFunction("");
            return;
        }
        const labelFinded = functions.find(
            (item) => item === e.target.value
        );
        setSelectedFunction(labelFinded);
    };

    const onInputChange = (e) => {
        setValue(e)
        let updatedFilterValues = props.filterValues;
        updatedFilterValues[props.index].loading = true;
        updatedFilterValues[props.index].text = e;
        props.setFilterValues(updatedFilterValues);
        props.filter(props.index);
    }

    useEffect(() => {
        let updatedFilterValues = props.filterValues;
        updatedFilterValues[props.index].field = selectedField;
        props.setFilterValues(updatedFilterValues);
    }, [selectedField]);


    return <div className="field-filter-wrapper">
        <FilterFieldPicker index={props.index} setSelected={setSelectedField} selected={selectedField} />
        <Input
            inputContainer={{ width: "100%" }}
            elementType="input"
            onChange={(e) => onInputChange(e.target.value)}
            isOk={true}
            value={value}
        />
        <div className="filter-setup">
            {props.filterValues[props.index].loading &&
                <div className="loading-spinner">
                    <Spinner />
                </div>}
            <select
                style={{
                    background: themeState.isDark
                        ? theme.surface_1dp
                        : theme.surface,
                    color: theme.on_background,
                    borderColor: theme.darken_border_color,
                    cursor: "pointer",
                }}
                value={selectedFunction}
                onChange={onSelectLabelChangeHandler}>
                {functions.map((option, i) => (
                    <option key={i}
                        value={option}
                        style={{
                            backgroundColor: themeState.isDark
                                ? "black"
                                : "white",
                            color: theme.on_background,
                            cursor: "pointer",
                        }}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    </div>;
};

export default FieldFilter;

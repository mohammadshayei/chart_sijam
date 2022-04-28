import { useEffect, useState } from "react";
import "./Filter.scss"
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../../../../styles/ThemeProvider";
import * as addChartActions from "../../../../store/actions/addChart"
import FieldFilter from "./FieldFilter";
import Button from "../../../../component/UI/Button/Button";
import FilterFieldPicker from "./FilterFieldPicker";

const Filter = () => {
    const [loading, setLoading] = useState(false);
    const [selectedField, setSelectedField] = useState(null);
    const [filterValues, setFilterValues] = useState([]);
    const [operator, setOperator] = useState("یا");

    const themeState = useTheme();
    const theme = themeState.computedTheme;
    const functions = ["و", "یا"];

    const dispatch = useDispatch();
    const setFilterFields = (payload) => {
        dispatch(addChartActions.setFilterFields(payload));
    };

    const onSelectLabelChangeHandler = (e) => {
        if (e.target.value === '') {
            setOperator("");
            return;
        }
        const foundLabel = functions.find(
            (item) => item === e.target.value
        );
        setOperator(foundLabel)
    };

    const removeFieldFilter = (index) => {
        let updatedFilterValues = [];
        if (index < 0) return;
        updatedFilterValues = filterValues.filter((item, idx) => idx !== index)
        setFilterValues(updatedFilterValues)
    };

    const onSelectField = (value, id, type) => {
        let updatedSelected = {}
        updatedSelected.name = value
        updatedSelected.id = id
        updatedSelected.type = type
        setSelectedField(updatedSelected)
    }

    const filter = () => {
        setLoading(true);
        setFilterFields({ operator, fields: filterValues })
        setLoading(false)
    }

    useEffect(() => {
        const exists = filterValues.some(f => (f.value === selectedField.id));
        if (!selectedField || exists) return
        let updatedFilterValues = [...filterValues];
        updatedFilterValues = [...updatedFilterValues,
        {
            type: selectedField.type, value: selectedField.id, name: selectedField.name,
            content: { value: "", not: false, isPeriod: false }
        }]
        setFilterValues(updatedFilterValues)
    }, [selectedField]);

    useEffect(() => {
        if (filterValues.length > 0) return
        setSelectedField(null)
    }, [filterValues]);


    return <div className="filter-step-container">
        <div className="fields-and-rule">
            <FilterFieldPicker
                index={0}
                setSelected={onSelectField}
                selected={selectedField} />
            <div className="filter-setup">
                <select
                    style={{
                        background: themeState.isDark
                            ? theme.surface_1dp
                            : theme.surface,
                        color: theme.on_background,
                        borderColor: theme.border_color,
                    }}
                    value={operator}
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
        </div>
        {filterValues.map((field, index) =>
            <FieldFilter
                key={index}
                index={index}
                field={field}
                filterValues={filterValues}
                setFilterValues={setFilterValues}
                remove={removeFieldFilter} />
        )}
        <Button
            disabled={filterValues.length === 0 && true}
            loading={loading}
            ButtonStyle={{ fontSize: "0.7rem", marginTop: "1.5rem" }}
            onClick={filter}
        >فیلتر</Button>
    </div>;
};

export default Filter;

import { useEffect, useState } from "react";
import "./Filter.scss"
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../../../../styles/ThemeProvider";
import * as addChartActions from "../../../../store/actions/addChart"
import FieldFilter from "./FieldFilter";
import Button from "../../../../component/UI/Button/Button";
import FilterFieldPicker from "./FilterFieldPicker";
import Input from "../../../../component/UI/Input/Input";
import SavedFilter from "./SavedFilter";
import { v4 as uuidv4 } from 'uuid';

const Filter = () => {
    const [loading, setLoading] = useState(false);
    const [selectedField, setSelectedField] = useState(null);
    const [filterValues, setFilterValues] = useState([]);
    const [operator, setOperator] = useState("یا");
    const [filterTitle, setFilterTitle] = useState("");
    const [initial, setInitial] = useState(true);
    const [id, setId] = useState(null);

    const themeState = useTheme();
    const theme = themeState.computedTheme;
    const { filterRules, metaData } = useSelector((state) => state.addChart);
    const functions = ["و", "یا"];

    const dispatch = useDispatch();
    const setFilterFields = (payload) => {
        dispatch(addChartActions.setFilterFields(payload));
    };
    const changeFiltersMetaData = (payload) => {
        dispatch(addChartActions.changeFiltersMetaData(payload));
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
        if (index < 0) return;
        let updatedFilterValues = [...filterValues];
        updatedFilterValues.splice(index, 1)
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
        setFilterFields({ operator, selected: metaData.filters.length, fields: filterValues })
        setLoading(false)
    }

    const onSaveHandler = () => {
        let updatedFilterValues = [...filterValues]
        let updatedId = id ? id : uuidv4()
        changeFiltersMetaData({ id: updatedId, name: filterTitle, add: true, value: updatedFilterValues })
        setFilterValues([]);
        setId(null)
        setFilterTitle("")
    }

    const onFilterValueChangeHandler = (e, index) => {
        let updatedFilterValues = [...filterValues];
        updatedFilterValues[index].content.value = e.target.value;
        setFilterValues(updatedFilterValues);
    }
    const onNotValueChangeHandler = (e, index) => {
        let updatedFilterValues = [...filterValues];
        updatedFilterValues[index].content.not = e.target.checked;
        setFilterValues(updatedFilterValues);
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
        filter()
    }, [filterValues]);

    useEffect(() => {
        if (filterRules.fields.length === 0 || !initial) return
        setOperator(filterRules.operator)
        setFilterValues(filterRules.fields)
        setInitial(false)
    }, [filterRules.fields]);

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
                onFilterValueChange={(e) => onFilterValueChangeHandler(e, index)}
                onNotValueChange={(e) => onNotValueChangeHandler(e, index)}
                remove={removeFieldFilter} />
        )}
        {filterValues.length > 0 && <Button
            disabled={filterValues.length === 0 && true}
            loading={loading}
            ButtonStyle={{ fontSize: "0.7rem", margin: "1.5rem 0 0.5rem 0" }}
            onClick={filter}
        >فیلتر کردن</Button>}
        {filterRules.fields.length > 0 && <div className="save-filter-section">
            <Input
                inputContainer={{ width: "75%" }}
                elementType="input"
                onChange={(e) => setFilterTitle(e.target.value)}
                isOk={true}
                value={filterTitle}
            />
            <Button
                disabled={filterTitle === "" && true}
                loading={loading}
                ButtonStyle={{
                    fontSize: "0.6rem",
                    margin: "0 0.5rem 0 0",
                    backgroundColor: theme.success
                }}
                onClick={onSaveHandler}
            >ذخیره فیلتر</Button>
        </div>}
        {metaData.filters.length > 0 &&
            <div className="saved-filters-list"
                style={{ borderColor: theme.border_color }}>
                {metaData.filters.map((item, index) => {
                    return <SavedFilter
                        key={item.id}
                        item={item}
                        index={index}
                        setInitial={setInitial}
                        setFilterTitle={setFilterTitle}
                        setId={setId}
                    />
                })}
            </div>}
    </div>;
};

export default Filter;

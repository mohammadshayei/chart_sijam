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
import StyledButton from "../../../../component/UI/Button/StyledButton";

const Filter = () => {
    const [loading, setLoading] = useState(false);
    const [selectedField, setSelectedField] = useState(null);
    const [filterValues, setFilterValues] = useState(null);
    const [operator, setOperator] = useState("یا");
    const [filterTitle, setFilterTitle] = useState("");
    const [id, setId] = useState(null);
    const [saveBtnText, setSaveBtnText] = useState("ذخیره فیلتر");

    const themeState = useTheme();
    const theme = themeState.computedTheme;
    const { metaData } = useSelector((state) => state.addChart);
    const functions = ["و", "یا"];

    const dispatch = useDispatch();
    const changeFiltersMetaData = (payload) => {
        dispatch(addChartActions.changeFiltersMetaData(payload));
    };
    const selectFilter = (payload) => {
        dispatch(addChartActions.selectFilter(payload));
    };
    const saveFilter = (payload) => {
        dispatch(addChartActions.saveFilter(payload));
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
        let updatedId = id ? id : uuidv4()
        changeFiltersMetaData({ id: updatedId, name: filterTitle, remove: false, value: filterValues, operator })
        setId(updatedId)
        setLoading(false)
    }

    const onSaveHandler = () => {
        saveFilter({ id, name: filterTitle })
        setSaveBtnText("تغییر")
        // setFilterValues(null)
        // setId(null)
        // setSelectedField(null)
        // setFilterTitle("")
        // selectFilter({ id: "" })
    }

    const newFilter = () => {
        setFilterValues([])
        setId(null)
        setSelectedField(null)
        setFilterTitle("")
        setSaveBtnText("ذخیره فیلتر")
        selectFilter({ id: "" })
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
        if (!filterValues) return
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
        if (metaData.filters.length === 0) return
        metaData.filters.forEach(filter => {
            if (filter.selected)
                setId(filter.id)
        });
    }, [metaData.filters]);


    useEffect(() => {
        if (!id) return
        selectFilter({ id })
        metaData.filters.forEach(filter => {
            if (filter.id === id) {
                setOperator(filter.type === "and" ? "و" : "یا")
                setFilterValues(filter.filters)
                setFilterTitle(filter.name)
                if (filter.saved)
                    setSaveBtnText("تغییر")
            }
        });
    }, [id]);

    return <div className="filter-step-container">
        {metaData.filters.length > 0 &&
            <div className="saved-filters-list">
                {metaData.filters.map((item, index) => {
                    if (item.saved)
                        return <SavedFilter
                            key={item.id}
                            item={item}
                            setId={setId}
                            setFilterValues={setFilterValues}
                        />
                })}
            </div>}
        <StyledButton
            onClick={newFilter}
            hover={
                themeState.isDark ? theme.surface_1dp : theme.background_color
            }
            ButtonStyle={{ marginBottom: "1rem" }}
        >
            فیلتر جدید
        </StyledButton>
        {filterValues && <div className="fields-and-rule"
            style={{ borderColor: theme.border_color }}>
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
        </div>}
        {filterValues?.map((field, index) =>
            <FieldFilter
                key={index}
                index={index}
                field={field}
                filterValues={filterValues}
                onFilterValueChange={(e) => onFilterValueChangeHandler(e, index)}
                onNotValueChange={(e) => onNotValueChangeHandler(e, index)}
                remove={removeFieldFilter} />
        )}
        {filterValues?.length > 0 && <Button
            disabled={filterValues.length === 0 && true}
            loading={loading}
            ButtonStyle={{ fontSize: "0.7rem", margin: "1.5rem 0 0.5rem 0" }}
            onClick={filter}
        >فیلتر کردن</Button>}
        {id && <div className="save-filter-section">
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
                    backgroundColor: theme.success,
                    width: "25%"
                }}
                onClick={onSaveHandler}
            >{saveBtnText}</Button>
        </div>}
    </div>;
};

export default Filter;

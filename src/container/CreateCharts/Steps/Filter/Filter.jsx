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
import PeriodFieldFilter from "./PeriodFieldFilter";
import { stringFa } from "../../../../assets/strings/stringFaCollection";
import { FaPlusCircle } from "react-icons/fa";
import Modal from "../../../../component/UI/Modal/Modal";
import AddCaption from "../../AddCaption/AddCaption";
import CheckBox from "../../../../component/UI/CheckBox/CheckBox";
import Hint from "../../../../component/UI/Hint/Hint";

const Filter = () => {
    const [loading, setLoading] = useState(false);
    const [selectedField, setSelectedField] = useState(null);
    const [filterValues, setFilterValues] = useState(null);
    const [operator, setOperator] = useState("یا");
    const [filterTitle, setFilterTitle] = useState("");
    const [id, setId] = useState(null);
    const [saveBtnText, setSaveBtnText] = useState("ذخیره فیلتر");
    const [filterCaption, setFilterCaption] = useState('')
    const [captionModal, setCaptionModal] = useState(false)
    const [allowedAll, setAllowedAll] = useState(true)
    const [employeesList, setEmployeesList] = useState([])
    const [captionHovered, setCaptionHovered] = useState(false)

    const themeState = useTheme();
    const theme = themeState.computedTheme;

    const { metaData, employees } = useSelector((state) => state.addChart);

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
        saveFilter({ id, name: filterTitle, caption: filterCaption, users: allowedAll ? [] : employeesList.filter(item => item.checked), allAccess: allowedAll })
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
        setAllowedAll(true)
        setEmployeesList(empList => empList.map(item => {
            return {
                ...item,
                checked: false
            }
        }))
        setFilterCaption('')
    }

    const onFilterValueChangeHandler = (e, index) => {
        let updatedFilterValues = [...filterValues];
        updatedFilterValues[index].content.value = e.target.value;
        setFilterValues(updatedFilterValues);
    }
    const onPeriodFilterValueChangeHandler = (e, index, start) => {
        let updatedFilterValues = [...filterValues];
        if (start)
            updatedFilterValues[index].content.value.start = e;
        else
            updatedFilterValues[index].content.value.end = e;
        setFilterValues(updatedFilterValues);
    }
    const onNotValueChangeHandler = (e, index) => {
        let updatedFilterValues = [...filterValues];
        updatedFilterValues[index].content.not = e.target.checked;
        setFilterValues(updatedFilterValues);
    }


    const onSaveChartCaption = (caption) => {
        setFilterCaption(caption)
    }
    const onChangeAccessList = (_id, all) => {
        if (all.status)
            setEmployeesList(empList => empList.map(item => {
                return {
                    ...item,
                    checked: all.value
                }
            }))

        else
            setEmployeesList(empList => empList.map(item => {
                if (_id === item._id)
                    return {
                        ...item,
                        checked: !item.checked

                    }
                else return item
            }))

    }
    const onChangeAllowedAllAccess = () => {
        setAllowedAll(state => !state);
    }
    useEffect(() => {
        if (!filterValues) return
        const exists = filterValues.some(f => (f.value === selectedField.id));
        if (!selectedField || exists) return
        let updatedFilterValues = [...filterValues];
        updatedFilterValues = [...updatedFilterValues,
        {
            type: selectedField.type, value: selectedField.id, name: selectedField.name,
            content: { value: selectedField.type === 'عبارت‌' ? "" : { start: "", end: "" }, not: false, isPeriod: selectedField.type === 'عبارت‌' ? false : true }
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
                if (filter.name)
                    setAllowedAll(filter.all)
                if (filter.users?.length > 0)
                    setEmployeesList(empList => {
                        if (filter.all) {
                            return empList.map(item => {
                                return {
                                    ...item,
                                    checked: false
                                }
                            })
                        } else {
                            return empList.map(item => {
                                if (filter.users?.findIndex(user => user._id === item._id) > -1)
                                    return {
                                        ...item,
                                        checked: true
                                    }
                                else
                                    return {
                                        ...item,
                                        checked: false
                                    }
                            })
                        }
                    })
                if (filter.caption)
                    setFilterCaption(filter.caption)
                if (filter.saved)
                    setSaveBtnText("تغییر")
            }
        });
    }, [id]);

    useEffect(() => {
        if (!employees) return;
        let updatedEmployeesList = employees.map(item => {
            return {
                _id: item.user._id,
                name: item.user.username,
                checked: false
            }
        })
        setEmployeesList(updatedEmployeesList)
    }, [employees])




    return <div className="filter-step-container">
        <Modal
            show={captionModal}
            modalClosed={() => setCaptionModal(false)}
            style={{
                height: "60%",
                width: "30%",
                minHeight: "230px",
                minWidth: "340px",
                zIndex: 600,
            }}
            bdStyle={{
                zIndex: 550,
            }}
        >
            <AddCaption currentValue={filterCaption} onSaveChartCaption={onSaveChartCaption} close={() => setCaptionModal(false)} />
        </Modal>
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
        </div>
        }
        {filterValues?.map((field, index) =>
            field.type === 'عبارت‌' ?
                <FieldFilter
                    key={index}
                    index={index}
                    field={field}
                    filterValues={filterValues}
                    onFilterValueChange={(e) => onFilterValueChangeHandler(e, index)}
                    onNotValueChange={(e) => onNotValueChangeHandler(e, index)}
                    remove={removeFieldFilter}
                />
                :
                <PeriodFieldFilter
                    key={index}
                    index={index}
                    field={field}
                    filterValues={filterValues}
                    onFilterValueChange={onPeriodFilterValueChangeHandler}
                    onNotValueChange={(e) => onNotValueChangeHandler(e, index)}
                    remove={removeFieldFilter}
                />

        )}
        {
            filterValues?.length > 0 && <Button
                disabled={filterValues.length === 0 && true}
                loading={loading}
                ButtonStyle={{ fontSize: "0.7rem", margin: "1.5rem 0 0.5rem 0" }}
                onClick={filter}

            >فیلتر کردن</Button>
        }
        {
            filterValues?.length > 0 &&
            <>
                <div
                    className="caption-wrapper"
                    onMouseEnter={() => setCaptionHovered(true)}
                    onMouseLeave={() => setCaptionHovered(false)}>

                    {
                        captionHovered && <Hint show={captionHovered} hint={filterCaption ? filterCaption : stringFa.filter_caption_not_added}
                            tooltipStyle={{ left: "0%" }}

                        />
                    }


                    <StyledButton
                        onClick={() => {
                            setCaptionModal(true)
                        }}

                        hover={
                            themeState.isDark ? theme.surface_12dp : theme.background_color
                        }
                        ButtonStyle={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <div className="button-text">
                            {stringFa.caption}
                            <div className="button-icon" style={{ color: theme.primary, }}>
                                <FaPlusCircle />
                            </div>
                        </div>
                    </StyledButton>
                </div>
                {/* access section */}
                <div className="access-wrapper">

                    <div className="allowed-employees">
                        <CheckBox
                            checked={allowedAll}
                            onChange={onChangeAllowedAllAccess}
                            checkmarkStyle={{ width: "13px", height: "13px", }} />
                        {stringFa.all_allowed_employees}
                    </div>
                    <div className={`employees-list ${allowedAll && 'disabled-div'}`} style={{ borderColor: theme.border_color }}>
                        <div className="all">
                            <CheckBox
                                checked={employeesList.filter(item => !item.checked).length === 0}
                                onChange={() => onChangeAccessList('', { status: true, value: !(employeesList.filter(item => !item.checked).length === 0) })}
                                checkmarkStyle={{ width: "13px", height: "13px", }} />
                            {stringFa.all}
                        </div>
                        {employeesList?.map((emp) =>
                            <div key={emp._id} className="employee-item" >
                                <CheckBox
                                    checked={emp.checked}
                                    onChange={() => onChangeAccessList(emp._id, { status: false })}
                                    checkmarkStyle={{ width: "13px", height: "13px", }}
                                />
                                {emp.name}
                            </div>
                        )}
                    </div>
                </div>
            </>
        }
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

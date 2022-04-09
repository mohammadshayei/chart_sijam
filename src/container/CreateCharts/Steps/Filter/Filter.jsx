import { useState } from "react";
import "./Filter.scss"
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../../../../styles/ThemeProvider";
import * as addChartActions from "../../../../store/actions/addChart"
import FieldFilter from "./FieldFilter";

const Filter = () => {
    const themeState = useTheme();
    const theme = themeState.computedTheme;
    const [filterValues, setFilterValues] = useState([{ field: "", text: "", loading: false }]);

    const takenData = useSelector((state) => state.addChart);

    const dispatch = useDispatch();
    const setChartDataFilter = (data) => {
        dispatch(addChartActions.setChartDataFilter(data));
    };

    const filter = (index) => {
        let updatedFilterValues = filterValues;
        setTimeout(() => {
            const filteredData = takenData.data.data.filter((row) => row[filterValues[0].field].indexOf(filterValues[0].text) > -1)
            if (filteredData.length === 0)
                setChartDataFilter({ data: [] })
            else
                setChartDataFilter({ data: filteredData })
            updatedFilterValues[index].loading = false
            setFilterValues(updatedFilterValues)
        }, 4000);
    }

    return <div className="filter-step-container">
        <FieldFilter index={0} filterValues={filterValues} setFilterValues={setFilterValues} filter={filter} />
    </div>;
};

export default Filter;

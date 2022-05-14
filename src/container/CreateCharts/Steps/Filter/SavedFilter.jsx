import { useState } from "react";
import "./Filter.scss"
import { useTheme } from "../../../../styles/ThemeProvider";
import Button from "../../../../component/UI/Button/Button";
import * as addChartActions from "../../../../store/actions/addChart"
import { useDispatch } from "react-redux";

const SavedFilter = ({ item, setId, setFilterValues }) => {
    const [hover, setHover] = useState(false);

    const themeState = useTheme();
    const theme = themeState.computedTheme;
    const dispatch = useDispatch();
    const changeFiltersMetaData = (payload) => {
        dispatch(addChartActions.changeFiltersMetaData(payload));
    };

    const onEnter = () => {
        setHover(true)
    }

    const onLeave = () => {
        setHover(false)
    }

    const onSavedFilterClick = () => {
        setId(item.id)
    }

    const onRemoveFilter = () => {
        if (item.selected) {
            setFilterValues(null)
            setId(null)
        }
        changeFiltersMetaData({ id: item.id, name: item.name, remove: true, operator: "" })
    }

    return <div className="saved-filter"
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        style={{ borderColor: hover || item.selected ? theme.darken_border_color : theme.surface }}>
        <p
            onClick={onSavedFilterClick}
        >{item.name}</p>
        <Button
            ButtonStyle={{
                opacity: hover ? "1" : "0",
                fontSize: "0.6rem",
                margin: "0",
                backgroundColor: theme.error,
                transition: "opacity 0.3s ease",
                zIndex: "900"
            }}
            onClick={onRemoveFilter}
        >حذف</Button>
    </div>;
};

export default SavedFilter;

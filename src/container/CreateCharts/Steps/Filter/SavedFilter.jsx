import { useState } from "react";
import "./Filter.scss"
import { useTheme } from "../../../../styles/ThemeProvider";
import Button from "../../../../component/UI/Button/Button";
import * as addChartActions from "../../../../store/actions/addChart"
import { useDispatch } from "react-redux";

const SavedFilter = ({ item, setInitial, setFilterTitle, setId, index }) => {
    const [hover, setHover] = useState(false);

    const themeState = useTheme();
    const theme = themeState.computedTheme;
    const dispatch = useDispatch();
    const setFilterFields = (payload) => {
        dispatch(addChartActions.setFilterFields(payload));
    };
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
        const operator = item.type === "or" ?
            "یا" : item.type === "and" ?
                "و" : "";
        setInitial(true)
        setFilterFields({ operator, selected: index, fields: item.filters })
        setFilterTitle(item.name)
        setId(item.id)
    }

    return <div className="saved-filter"
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onClick={onSavedFilterClick}
        style={{ borderColor: hover ? theme.darken_border_color : theme.surface }}>
        <p>{item.name}</p>
        <Button
            ButtonStyle={{
                opacity: hover ? "1" : "0",
                fontSize: "0.6rem",
                margin: "0",
                backgroundColor: theme.error,
                transition: "opacity 0.3s ease",
                zIndex: "900"
            }}
            onClick={() => changeFiltersMetaData({ id: item.id, name: item.name, add: false })}
        >حذف</Button>
    </div>;
};

export default SavedFilter;

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { stringFa } from '../../../assets/strings/stringFaCollection';
import { useTheme } from '../../../styles/ThemeProvider';
import './FilterSelector.scss'
const FilterSelector = (props) => {
    const { isFullscreen } = useSelector((state) => state.addChart);
    const [extraItems, setExtraItems] = useState([]);

    const themeState = useTheme();
    const theme = themeState.computedTheme;
    // const extraItems = [
    //     { name: stringFa.separately, value: "seprately", key: 1 },
    //     { name: stringFa.merge_filters, value: "merged", key: 2 }]

    useEffect(() => {
        let updatedExtraItems = [
            { name: stringFa.separately, value: "seprately", key: 1 },
            { name: stringFa.merge_filters, value: "merged", key: 2 }]
        if (isFullscreen) updatedExtraItems.splice(0, 1)
        setExtraItems(updatedExtraItems)

    }, [isFullscreen]);



    return (
        <div className='filter-container'>
            <select
                style={{
                    background: themeState.isDark
                        ? theme.surface_1dp
                        : theme.surface,
                    color: theme.on_background,
                    borderColor: theme.darken_border_color,
                    cursor: "pointer",
                    ...props.selectStyle
                }}
                defaultValue={props.filters[props.selectedFilter]._id}
                onChange={props.onChange}
            >
                {props.filters?.map((item, index) => (
                    <option key={item.filter._id}
                        value={item._id}
                        style={{
                            backgroundColor: themeState.isDark
                                ? "black"
                                : "white",
                            color: theme.on_background,
                        }}>
                        {item.filter.name}
                    </option>
                ))}
                {extraItems.map((item) => (
                    <option
                        key={item.key}
                        value={item.value}
                        style={{
                            backgroundColor: themeState.isDark
                                ? "black"
                                : "white",
                            color: theme.on_background,
                        }}
                    >
                        {item.name}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default FilterSelector
import { useEffect, useState, memo } from 'react';
import { useSelector } from 'react-redux';
import { stringFa } from '../../../assets/strings/stringFaCollection';
import { useTheme } from '../../../styles/ThemeProvider';
import './FilterSelector.scss'
const FilterSelector = memo((props) => {
    const { isFullscreen } = useSelector((state) => state.addChart);
    const [extraItems, setExtraItems] = useState([]);
    const [value, setValue] = useState('')
    const themeState = useTheme();
    const theme = themeState.computedTheme;
    // const extraItems = [
    //     { name: stringFa.separately, value: "seprately", key: 1 },
    //     { name: stringFa.merge_filters, value: "merged", key: 2 }]

    useEffect(() => {
        let updatedExtraItems = []
        if (!isFullscreen) updatedExtraItems.push({ name: stringFa.separately, value: "seprately", key: 1 })
        if (!props.seprated) updatedExtraItems.push({ name: stringFa.merge_filters, value: "merged", key: 2 })
        setExtraItems(updatedExtraItems)

    }, [isFullscreen, props.seprated]);
    useEffect(() => {
        if (!props.selectedFilter || !props.filters) return;
        setValue(props.filters[props.selectedFilter]._id)
    }, [props.selectedFilter, props.filters])

    const onChange = (e) => {
        props.onChange(e)
        setValue(e.target.value)
    }
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
                value={value}
                // defaultValue={props.filters[props.selectedFilter]._id}
                onChange={onChange}
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
})

export default FilterSelector
import { useTheme } from '../../../styles/ThemeProvider';
import './FilterSelector.scss'
const FilterSelector = (props) => {
    const themeState = useTheme();
    const theme = themeState.computedTheme;
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
            </select>
        </div>
    )
}

export default FilterSelector
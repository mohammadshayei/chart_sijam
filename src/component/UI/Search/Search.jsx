import './Search.scss'
import Input from '../Input/Input';
import { IoIosSearch } from "react-icons/io";
import { useTheme } from '../../../styles/ThemeProvider';
import { stringFa } from '../../../assets/strings/stringFaCollection';

const Search = (props) => {
    const themeState = useTheme();
    const theme = themeState.computedTheme;

    return (
        <div className='search-contianer' style={props.containerStyle}>
            <Input
                elementType="input"
                config={{
                    ...props.config,
                    placeholder: stringFa.search,
                }}
                isOk={true}
                value={props.value}
                onChange={props.onChange}
                style={props.inputStyle}
            />
            <IoIosSearch className="search-icon" size="1.5em" color={theme.darken_border_color} style={props.iconStyle} />
        </div>
    )
}

export default Search

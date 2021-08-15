import React from 'react'
import Input from '../Input/Input'
import './Search.scss'
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
const Search = (props) => {
    return (
        <div className='search-contianer' style={props.containerStyle}>
            <Input type='input' style={props.inputStyle}  onChange={props.onChange} value={props.value} config={props.config} />
            <SearchRoundedIcon style={props.iconStyle} />
        </div>
    )
}

export default Search

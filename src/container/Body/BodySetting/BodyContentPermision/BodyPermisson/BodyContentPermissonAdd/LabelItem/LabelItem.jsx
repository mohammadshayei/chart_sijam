import React from 'react'
import CheckBox from '../../../../../../../component/UI/CheckBox/CheckBox'
import { useTheme } from '../../../../../../../styles/ThemeProvider';
import './LabelItem.scss'
const LabelItem = (props) => {
    const themeState = useTheme();
    const theme = themeState.computedTheme;
    return (
        <div className='label-item-container'
            style={{
                backgroundColor: theme.table_background
            }}
            onClick={props.onChange}
        >
            <CheckBox checked={props.checked} onChange={props.onChange} />
            <p>{props.title}</p>
        </div>
    )
}

export default LabelItem

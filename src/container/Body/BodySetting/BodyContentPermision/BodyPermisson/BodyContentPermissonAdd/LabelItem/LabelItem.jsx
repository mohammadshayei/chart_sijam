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
                backgroundColor:
                    themeState.isDark ?
                        theme.surface_4dp :
                        theme.surface,
            }}
            onClick={props.onChange}
        >
            <CheckBox checked={props.checked} onChange={props.onChange} />
            <p>{props.title}</p>
        </div>
    )
}

export default LabelItem

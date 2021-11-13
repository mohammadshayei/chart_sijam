import React from 'react'
import { useTheme } from '../../../styles/ThemeProvider';
import './UserImage.scss'
const UserImage = (props) => {
    const themeState = useTheme();
    const theme = themeState.computedTheme;
    return (
        <div className='user-image-container' style={{ ...props.divStyle }}>
            <img style={{ ...props.imageStyle }} src={props.src} alt={props.alt ? props.alt : 'alt'} />
            <p  style={{ ...props.titleStyle, color:theme.primary,whiteSpace: 'nowrap' }}>{props.title}</p>
        </div>
    )
}

export default UserImage

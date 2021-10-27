import React from 'react'
import { useTheme } from '../../../../styles/ThemeProvider';
import Spinner from '../../Loading/Spinner/Spinner';
import StyledButton from '../StyledButton'
import './ButtonIconAndLoading.scss'
const ButtonIconAndLoading = (props) => {
    const themeState = useTheme();
    const theme = themeState.computedTheme;
    // console.log( props.loading)
    return (
        <div className='body-content-custom-button-container'>
            <StyledButton
                onClick={props.onClick}
                ButtonStyle={{
                    ...props.buttonStyle,
                    padding: "0",
                }}
                hover={props.isCancel ? theme.error_variant : theme.primary_variant}
                backgroundColor={props.isCancel ? theme.error : theme.primary}
            >

                <div className="button-text" style={{ color: props.isCancel ? theme.on_error : theme.on_primary }}>

                    {props.title}
                    {
                        props.icon
                    }
                    {
                        props.loading &&
                        <div className='logo-container'>

                            <Spinner dark={themeState.isDark} width="20px" height="20px" />
                        </div>
                    }


                </div>
            </StyledButton>
        </div>
    )
}

export default ButtonIconAndLoading

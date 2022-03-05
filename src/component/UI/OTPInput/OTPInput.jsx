import { useState, useEffect } from "react";
import { useTheme } from "../../../styles/ThemeProvider";
import "./OTPInput.scss"

const OTPInput = (props) => {
    const themeState = useTheme();
    const theme = themeState.computedTheme;
    const [otp, setOtp] = useState(new Array(props.boxes).fill(""));
    const [focus, setFocus] = useState(new Array(props.boxes).fill(false));

    const onFocusHandler = (e, i) => {
        let updatedFocus = [...focus]
        updatedFocus[i] = true
        setFocus(updatedFocus);
        if (e.target.value)
            e.target.select()
    };
    const onBlurHandler = (i) => {
        let updatedFocus = [...focus]
        updatedFocus[i] = false
        setFocus(updatedFocus);
    };

    const handleChange = (e, index) => {
        if (isNaN(e.target.value)) return false;

        setOtp([...otp.map((d, idx) => (idx === index) ? e.target.value : d)])

        if (e.target.value && e.target.nextSibling) {
            e.target.nextSibling.focus();
            let updatedFocus = [...focus]
            updatedFocus[index] = false
            updatedFocus[index + 1] = true
            setFocus(updatedFocus);
        }
    }

    useEffect(() => {
        props.onChange(otp.join(""))
    }, [otp]);

    return <div className="otp-input-container">
        {otp.map((data, index) => {
            return (
                <input
                    className={`otp-input-element ${props.invalid && props.shouldValidate && props.touched
                        ? "invalid"
                        : ""
                        }`}
                    key={index}
                    maxLength={1}
                    value={data}
                    onChange={e => handleChange(e, index)}
                    style={{
                        borderColor: props.isOk ?
                            (focus[index] ? theme.primary : theme.darken_border_color)
                            :
                            (theme.error),
                        ...props.style,
                    }}
                    {...props.config}
                    onFocus={e => onFocusHandler(e, index)}
                    onBlur={() => onBlurHandler(index)}
                />
            )
        })}
    </div>;
};

export default OTPInput;

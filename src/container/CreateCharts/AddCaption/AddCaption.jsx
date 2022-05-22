import { useEffect, useState } from 'react';
import { stringFa } from '../../../assets/strings/stringFaCollection'
import Button from '../../../component/UI/Button/Button';
import { useTheme } from '../../../styles/ThemeProvider';
import './AddCaption.scss'
const AddCaption = ({ close, onSaveChartCaption, currentValue }) => {
    const [focus, setFocus] = useState(false)
    const [value, setValue] = useState('')

    const themeState = useTheme();
    const theme = themeState.computedTheme;


    useEffect(() => {
        if (!currentValue) return;
        setValue(currentValue)

    }, [currentValue])

    return (
        <div className='add-caption-wrapper'>
            <label>
                {stringFa.caption} :
                <textarea
                    style={{
                        background: themeState.isDark
                            ? theme.surface_1dp
                            : theme.surface,
                        color: theme.on_background,
                        borderColor: (focus ? theme.primary : theme.darken_border_color),
                    }}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </label>
            <div className='actions'>
                <Button
                    ButtonStyle={{
                        padding: ".1rem 1rem",
                        marginRight: "1rem"
                    }}
                    disabled={value.length === 0}
                    onClick={() => {
                        onSaveChartCaption(value)
                        close()
                    }}
                >
                    {stringFa.confirm}
                </Button>
                <Button
                    ButtonStyle={{
                        padding: ".1rem 1rem"
                    }}
                    onClick={close}
                >
                    {stringFa.cancel}
                </Button>

            </div>
        </div>
    )
}

export default AddCaption
import { Checkbox } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { stringFa } from '../../../../../../assets/strings/stringFaCollection'
import StyledButton from '../../../../../../component/UI/Button/StyledButton'
import CustomSelect from '../../../../../../component/UI/CustomSelect/CustomSelect'
import UserImage from '../../../../../../component/UI/UserImage/UserImage'
import { baseUrl } from '../../../../../../constants/Config'
import { useTheme } from '../../../../../../styles/ThemeProvider'
import { useNavigate } from 'react-router-dom'
import './DynamicItem.scss'
const DynamicItem = ({ data, config, labels, onChange }) => {
    const [cmp, setCmp] = useState(null)
    const themeState = useTheme();
    const theme = themeState.computedTheme;
    const navigate = useNavigate()
    useEffect(() => {
        switch (config.componentNumber) {
            case 1:
                setCmp(<p>{data[config.path[0]] ? 'بله' : 'خیر'}</p>)
                break;
            case 2:
                setCmp(
                    <UserImage
                        alt='profile'
                        src={`${baseUrl}images/${data.user.image !== '' ? data.user.image : 'avatar.svg'}`}
                        title={data[config.path[0]][config.path[1]]}
                    />)
                break;
            case 3:
                setCmp(
                    <CustomSelect
                        selectedItem={data.label && data.label.name}
                        items={labels && labels}
                        onSelectChangeHandler={(e) => onChange(e, data.user._id)}
                        style={{ width: 'auto', margin: "0" }}
                        selectStyle={{ fontSize: '13px' }}
                        keyField='_id'
                        valueField='name'
                        path='label'
                    />
                )
                break;
            case 4:
                setCmp(<p style={{ whiteSpace: 'nowrap' }}> {config.path.length === 1 ? data[config.path[0]] : data[config.path[0]][config.path[1]]}</p>)
                break;
            case 5:
                setCmp(
                    <StyledButton
                        onClick={() => {
                            navigate(`/view/setting?menu_item=2&s=2&id=${data.user._id}`)
                        }}
                        ButtonStyle={{
                            backgroundColor: theme.primary,
                            color: theme.on_primary,
                            padding: '0 1rem',
                        }}
                        hover={
                            themeState.isDark ? theme.surface_12dp : theme.background_color
                        }
                    >
                        {stringFa.see}

                    </StyledButton>)
                break;
            default:
                setCmp(<p style={{ whiteSpace: 'nowrap' }}> {config.path.length === 1 ? data[config.path[0]] : data[config.path[0]][config.path[1]]}</p>)
                break;
        }
    }, [config.componentNumber, data])
    return cmp;
}

export default DynamicItem

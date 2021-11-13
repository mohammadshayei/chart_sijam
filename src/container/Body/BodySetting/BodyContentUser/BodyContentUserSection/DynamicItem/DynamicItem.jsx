import { Checkbox } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import CustomSelect from '../../../../../../component/UI/CustomSelect/CustomSelect'
import UserImage from '../../../../../../component/UI/UserImage/UserImage'
import { baseUrl } from '../../../../../../constants/Config'
import './DynamicItem.scss'
const DynamicItem = ({ data, config, labels, onChange }) => {
    const [cmp, setCmp] = useState(null)
    useEffect(() => {
        switch (config.componentNumber) {
            case 1:
                setCmp(<p>{data[config.path[0]] ? 'بله' : 'خیر'}</p>)
                break;
            case 2:
                setCmp(
                    <UserImage
                        alt='profile'
                        src={`${baseUrl}images/${data.user_id.image !== '' ? data.user_id.image : 'avatar'}.png`}
                        title={data[config.path[0]][config.path[1]]}
                    />)
                break;
            case 3:
                setCmp(
                    <CustomSelect
                        selectedItem={data.label_id.name}
                        items={labels && labels}
                        onSelectChangeHandler={(e) => onChange(e, data.user_id._id)}
                        style={{ width: 'auto', margin: "0" }}
                        selectStyle={{fontSize:'13px'}}
                        keyField='_id'
                        valueField='name'
                        path='label'
                    />
                )
                break;
            case 4:
                setCmp(<p style={{ whiteSpace: 'nowrap' }}> {config.path.length === 1 ? data[config.path[0]] : data[config.path[0]][config.path[1]]}</p>)
                break;
            default:
                setCmp(<p style={{ whiteSpace: 'nowrap' }}> {config.path.length === 1 ? data[config.path[0]] : data[config.path[0]][config.path[1]]}</p>)
                break;
        }
    }, [config.componentNumber,data])
    return cmp;
}

export default DynamicItem

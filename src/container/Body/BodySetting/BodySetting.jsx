import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import BodyContentCustom from './BodyContentCustom/BodyContentCustom'
import BodyContentPermision from './BodyContentPermision/BodyContentPermision'
import BodyContentUser from './BodyContentUser/BodyContentUser'
import './BodySetting.scss'
const BodySetting = (props) => {
    const location = useLocation()
    const [body, setBody] = useState(null)

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const menu_item = searchParams.get("menu_item");
        switch (menu_item) {
            case '1':
                setBody(<BodyContentCustom />)
                break;
            case '2':
                setBody(<BodyContentUser />)
                break;
            case '3':
                setBody(<BodyContentPermision />)
                break;


            default:
            case '1':
                setBody(<BodyContentCustom />)
                break;
        }
    }, [location])
    return (
        <div className='setting-container'>
            {body}
        </div>
    )
}

export default BodySetting


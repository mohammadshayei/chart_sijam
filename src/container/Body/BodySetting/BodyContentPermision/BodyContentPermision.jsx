import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import HeaderSetting from '../../../../component/UI/Header/HeaderSetting/HeaderSetting'
import BodycontentPermissonView from './BodyPermisson/BodyContentPermissonView/BodyContentPermissonView'
import BodycontentPermissonAdd from './BodyPermisson/BodyContentPermissonAdd/BodyContentPermissonAdd'

import './BodyContentPermision.scss'
import { stringFa } from '../../../../assets/strings/stringFaCollection'
const BodyContentPermision = (props) => {
    const [headerOrder, setHeaderOrder] = useState(
        {
            view: {
                id: 1,
                title: stringFa.view_labels,
                selected: true
            },
            add: {
                id: 2,
                title: stringFa.create_labels,
                selected: false
            }
        })
    const [body, setBody] = useState(null)
    const location = useLocation()
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const section = searchParams.get("s");
        switch (section) {
            case '1':
                setBody(<BodycontentPermissonView />)
                break;
            case '2':
                setBody(<BodycontentPermissonAdd />)
                break;

            default:
            case '1':
                setBody(<BodycontentPermissonView />)
                break;
        }
    }, [location])
    const onItemClickHandler = (e, key) => {
        const updatedHeaderOrder = { ...headerOrder }
        const updatedItem = updatedHeaderOrder[key];
        for (const item in updatedHeaderOrder) {
            updatedHeaderOrder[item].selected = false;
        }
        updatedItem.selected = true;
        updatedHeaderOrder[key] = updatedItem;
        setHeaderOrder(updatedHeaderOrder)
    }
    return (
        <div className='body-content-permission-container'>
            <HeaderSetting onClick={onItemClickHandler} data={headerOrder} />
            {body}
        </div>
    )
}

export default BodyContentPermision

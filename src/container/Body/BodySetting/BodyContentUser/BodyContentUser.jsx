import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { stringFa } from '../../../../assets/strings/stringFaCollection'
import HeaderSetting from '../../../../component/UI/Header/HeaderSetting/HeaderSetting'
import './BodyContentUser.scss'
import BodyContentUserAccessChart from './BodyContentUserAccessChart/BodyContentUserAccessChart'
import BodyContentUserSection from './BodyContentUserSection/BodyContentUserSection'
const BodyContentUser = () => {
    const [headerOrder, setHeaderOrder] = useState(
        {
            view: {
                id: 1,
                title: stringFa.users,
                selected: true
            },
            add: {
                id: 2,
                title: stringFa.access_chart,
                selected: false
            }
        })
    const [body, setBody] = useState(null)
    const location = useLocation()
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const section = searchParams.get("s");
        const userId = searchParams.get("id");
        const udpatedHeaderOrder = { ...headerOrder }
        switch (section) {
            case '1':
                setBody(<BodyContentUserSection />)
                udpatedHeaderOrder.view.selected = true
                udpatedHeaderOrder.add.selected = false
                break;
            case '2':
                setBody(<BodyContentUserAccessChart userIdUrl={userId} />)
                udpatedHeaderOrder.view.selected = false
                udpatedHeaderOrder.add.selected = true
                break;

            default:
                setBody(<BodyContentUserSection />)
                udpatedHeaderOrder.view.selected = true
                udpatedHeaderOrder.add.selected = false
                break;
        }
        setHeaderOrder(headerOrder)
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
        <div className='body-content-user-container'>
            <HeaderSetting pageIndex={2} onClick={onItemClickHandler} data={headerOrder} />
            <div className='body-content-user-body'>
                {body}
            </div>
        </div>
    )
}

export default BodyContentUser

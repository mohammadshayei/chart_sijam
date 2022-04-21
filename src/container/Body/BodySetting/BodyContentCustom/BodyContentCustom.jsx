import { useState, useEffect } from 'react'
import { stringFa } from '../../../../assets/strings/stringFaCollection'
import './BodyContentCustom.scss'

import HeaderSetting from '../../../../component/UI/Header/HeaderSetting/HeaderSetting';
import { useLocation } from 'react-router';
import BodyContentCustomHoldingInfo from './BodyContentCustomHoldingInfo/BodyContentCustomHoldingInfo';
import BodyContentCustomHoldingStructure from './BodyContentCustomHoldingStructure/BodyContentCustomHoldingStructure';

const BodyContentCustom = (props) => {
    const [body, setBody] = useState(null)
    const [headerOrder, setHeaderOrder] = useState(
        {
            info: {
                id: 1,
                title: stringFa.specifications,
                selected: true
            },
            structure: {
                id: 2,
                title: stringFa.structure,
                selected: false
            }
        })
    const location = useLocation()
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
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const section = searchParams.get("s");
        let updatedOrder = { ...headerOrder }
        switch (section) {
            case '1':
                setBody(<BodyContentCustomHoldingInfo />)
                updatedOrder.info.selected = true;
                updatedOrder.structure.selected = false;
                break;
            case '2':
                setBody(<BodyContentCustomHoldingStructure />)
                updatedOrder.info.selected = false;
                updatedOrder.structure.selected = true;
                break;

            default:
                setBody(<BodyContentCustomHoldingInfo />)
                updatedOrder.info.selected = true;
                updatedOrder.structure.selected = false;
                break;
        }
        setHeaderOrder(updatedOrder)
    }, [location])
    return (
        <div className='body-content-custom-container'>
            <HeaderSetting pageIndex={1} onClick={onItemClickHandler} data={headerOrder} />
            <div className='body-content-custom-body'>
                {body}
            </div>
        </div>
    )
}

export default BodyContentCustom

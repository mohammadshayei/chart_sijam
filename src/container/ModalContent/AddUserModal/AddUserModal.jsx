import React, { useState } from 'react'
import { stringFa } from '../../../assets/strings/stringFaCollection'
import HeaderSetting from '../../../component/UI/Header/HeaderSetting/HeaderSetting'
import AssingUser from './AssingUser/AssingUser'
import CreateNewUser from './CreateNewUser/CreateNewUser'

const AddUserModal = (props) => {
    const [headerOrder, setHeaderOrder] = useState(
        {
            create: {
                id: 1,
                title: stringFa.create_new_user,
                selected: true
            },
            assign: {
                id: 2,
                title: stringFa.user_assing,
                selected: false
            }
        })
    const onHeaderItemClick = (e, key) => {
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
        <div>
            <HeaderSetting notLink={true} onClick={onHeaderItemClick} data={headerOrder} />
            {
                headerOrder.create.selected ? <CreateNewUser /> : <AssingUser />
            }
        </div>
    )
}

export default AddUserModal

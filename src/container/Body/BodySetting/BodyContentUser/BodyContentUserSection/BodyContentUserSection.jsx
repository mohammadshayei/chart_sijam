import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { stringFa } from '../../../../../assets/strings/stringFaCollection'
import CustomSelect from '../../../../../component/UI/CustomSelect/CustomSelect'
import { baseUrl } from '../../../../../constants/Config'
import { useTheme } from '../../../../../styles/ThemeProvider'
import './BodyContentUserSection.scss'
import Search from '../../../../../component/UI/Search/Search'
import DynamicItem from './DynamicItem/DynamicItem'
import StyledButton from '../../../../../component/UI/Button/StyledButton'
import { AiOutlinePlus } from 'react-icons/ai'
import AddUserModal from '../../../../ModalContent/AddUserModal/AddUserModal'
import Modal from "../../../../../component/UI/Modal/Modal";

const BodyContentUserSection = () => {
    const [multiHolding, setMultiHolding] = useState(false)
    const [loading, setLoading] = useState(false)
    const [selectedHolding, setSelectedHolding] = useState('')
    const [fethedHoldings, setFethedHoldings] = useState([])
    const [addUserOpen, setAddUserOpen] = useState(false)
    const [userSearch, setUserSearch] = useState('')
    const [holdingDetail, setHoldingDetail] =
        useState({
            name: '',
            image: '',
            id: ''
        })
    const order = [
        {
            title: 'نام کاربری',
            path: ['user_id', 'username'],
            componentNumber: 2,

        },
        {
            title: 'شماره همراه',
            path: ['user_id', 'phone'],
            componentNumber: 4,

        },
        {
            title: 'برچسب',
            path: ['label_id', 'name'],
            componentNumber: 3,

        },
        {
            title: 'هیئت مدیره',
            path: ['management_committee'],
            componentNumber: 1,

        },
        {
            title: 'نام شرکت',
            path: ['company_id', 'name'],
            componentNumber: 4,

        },
        {
            title: 'موقعیت شغلی',
            path: ['position_name'],
            componentNumber: 4,

        },
    ]
    const [selectedLabel, setSelectedLabel] =
        useState({
            name: '',
            id: ''
        })
    const [users, setUsers] = useState(null)
    const [labels, setLabels] = useState(null)
    const themeState = useTheme();
    const theme = themeState.computedTheme;
    const user = useSelector(state => state.auth.user)
    const token = useSelector(state => state.auth.token)



    useEffect(() => {
        if (user && user.is_fekrafzar) {
            setMultiHolding(true)
        } else {
            setMultiHolding(false)
        }
    }, [user])
    const onSelectHoldingChangeHandler = e => {
        setSelectedHolding(e.target.value)
        const holding = fethedHoldings.find(item => item.name === e.target.value)
        setHoldingDetail({
            name: holding.name,
            image: holding.image,
            id: holding.id,
        })

    }
    const onSelectLabelChangeHandler = e => {
        setSelectedHolding(e.target.value)
        const labelFinded = labels.find(item => item.label.name === e.target.value)
        setSelectedLabel({
            name: labelFinded.label.name,
            id: labelFinded.label._id,
        })
    }


    const onChangeSearchInput = (e) => {
        setUserSearch(e.target.value);
    };

    const onChangeLabelItem = async (e, userId) => {
        let selected = e.target.value
        let findedLabel = labels.find(item => item.label.name === selected)
        const paylaod = {
            holdingId: holdingDetail.id,
            userId: userId,
            labelId: findedLabel.label._id
        }
        const resultEditedLabel = await
            axios.post(`${baseUrl}api/change_label_employee`, paylaod, { headers: { 'auth-token': token } });

        if (resultEditedLabel.data.success) {
            // const upadatedUsers = [...users]
            // let userIndex = upadatedUsers.findIndex(item => item.user_id._id === userId)
            // let updatedUser = { ...upadatedUsers[userIndex] }
            // let updatedLabelUser = { ...updatedUser.label_id }
            // updatedLabelUser.name = selected;
            // updatedUser.label_id = updatedLabelUser;
            // upadatedUsers[userIndex]=updatedUser;

            // const editedUser = { ...upadatedUser[userIndex], label_id: { ...upadatedUser[userIndex].label_id, name: selected } };
            // upadatedUser[userIndex] = editedUser;
            let updatedUsers = users.map(item => {
                if (item.user_id._id === userId) return {
                    ...item,
                    label_id: {
                        ...item.label_id,
                        name: selected
                    }
                }
                else return item
            })
            setUsers(updatedUsers)
        }
    }
    const onClickAddUserHandler = e => {
        setAddUserOpen(true)
    }
    const closeModal = () => {
        setAddUserOpen(false);
    };
    useEffect(async () => {
        if (multiHolding) {
            setLoading(true);
            const resultFetchingHoldings = await axios.get(`${baseUrl}api/get_holdings`, { headers: { 'auth-token': token } });
            setFethedHoldings(resultFetchingHoldings.data.message.result)
            setHoldingDetail({
                name: resultFetchingHoldings.data.message.result[0].name,
                image: resultFetchingHoldings.data.message.result[0].image,
                id: resultFetchingHoldings.data.message.result[0].id,
            })
            setLoading(false);

        }
    }, [multiHolding])

    useEffect(async () => {
        if (holdingDetail && holdingDetail.id) {
            setLoading(true);
            const resultFetchingLabels = await axios.post
                (`${baseUrl}api/get_holding_labels`, { holdingId: holdingDetail.id }, { headers: { 'auth-token': token } });
            setLabels(resultFetchingLabels.data.labels)

            const resultFetchingUsers = await axios.post
                (`${baseUrl}api/get_employees`, { holdingId: holdingDetail.id }, { headers: { 'auth-token': token } });
            setUsers(resultFetchingUsers.data.employees)
            setLoading(false);
        }
    }, [holdingDetail])


    return (
        <div className='body-content-user-section-container'>
            <Modal show={addUserOpen} modalClosed={closeModal} >
                <AddUserModal closeModal={closeModal} />
            </Modal>
            {
                multiHolding &&
                <>
                    <CustomSelect
                        title={stringFa.select_holding}
                        selectedItem={selectedHolding}
                        items={fethedHoldings}
                        onSelectChangeHandler={onSelectHoldingChangeHandler}
                        style={{ marginBottom: "1rem" }}
                        keyField='code'
                        valueField='name'
                    />
                    <div className='seprator'
                        style={{ backgroundColor: theme.hover_button }}
                    />
                </>
            }
            <div className='body-content-user-filter-section'>

                <div className='body-content-user-filter-section-search'>
                    <p>
                        {stringFa.username}
                    </p>
                    <Search
                        value={userSearch}
                        onChange={onChangeSearchInput}
                        config={{ placeholder: stringFa.search, type: "text" }}
                        iconStyle={{
                            fontSize: "1.5rem",
                            fontWeight: "100",
                            margin: "0",
                        }}
                        containerStyle={{
                            width: '20rem',
                            border: ' 1px solid #c5c7d0',
                            padding: '0',
                            backgroundColor: theme.table_background,
                            marginTop: '1rem'
                        }}
                        inputStyle={{
                            heigth: '3.4rem',
                            border: "none",
                            margin: '0',
                            width: '18.5rem',
                            outline: 'none',
                            fontSize: '1rem',
                            padding: '.2rem .4rem '

                        }}

                    />
                </div>
                <CustomSelect
                    title={stringFa.label}
                    selectedItem={selectedLabel.name}
                    items={labels && labels}
                    onSelectChangeHandler={onSelectLabelChangeHandler}
                    style={{ marginBottom: "1rem", width: '10rem' }}
                    keyField='_id'
                    valueField='name'
                    path='label'
                />
                <div className='button-add-container'>
                    <StyledButton
                        onClick={onClickAddUserHandler}
                        ButtonStyle={{
                            padding: "0",
                        }}
                        hover={theme.primary_variant}
                        backgroundColor={theme.primary}
                        onClick={onClickAddUserHandler}
                    >

                        <div className="button-text" style={{ color: theme.on_primary }}>
                            {stringFa.add_user}
                            <AiOutlinePlus style={{ marginLeft: ".4rem" }} />
                        </div>
                    </StyledButton>
                </div>
            </div>
            <p style={{ fontSize: "14px" }}>
                تعداد نتایج : {users ? users.length : 0}
            </p>
            <div className='table-container'>

                <table className='tabe-permissions'
                    style={{
                        // boxShadow: `0 0 20px ${theme.hover}`
                    }}>
                    <thead>
                        <tr className='tabe-permissions-thead-tr'
                            style={{
                                backgroundColor: 'transparent',
                                color: theme.on_background
                            }}
                        >
                            {
                                order.map(item =>
                                    <th style={{ fontWeight: '100' }} key={item.title}>{item.title}</th>
                                )
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users && users.length > 0 && users.map((v) =>
                                <tr key={v._id} >
                                    {
                                        order.map((item) =>
                                            <td key={item.title}>
                                                <DynamicItem
                                                    config={item}
                                                    data={v}
                                                    labels={labels}
                                                    onChange={onChangeLabelItem}
                                                />
                                            </td>
                                        )
                                    }
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default BodyContentUserSection

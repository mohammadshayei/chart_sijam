import React, { useCallback, useRef, useState, useEffect } from 'react'
import { stringFa } from '../../../../assets/strings/stringFaCollection'
import StyledButton from '../../../../component/UI/Button/StyledButton';
import './BodyContentCustom.scss'
import { MdModeEdit } from 'react-icons/md'
import IMAGE from "../../../../assets/images/simamlogo.png";
import { TiCancel } from 'react-icons/ti'
import SelectHolding from './SelectHolding/SelectHolding';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { baseUrl } from '../../../../constants/Config';
import ErrorDialog from '../../../../component/UI/Error/ErrorDialog';
import ButtonIconAndLoading from '../../../../component/UI/Button/ButtonIconAndLoading/ButtonIconAndLoading.jsx'
import { useTheme } from '../../../../styles/ThemeProvider'

const BodyContentCustom = (props) => {
    const [selectedHolding, setSelectedHolding] = useState('')
    const [isFekrafzar, setIsFekrafzar] = useState(false)
    const [fethedHoldings, setFethedHoldings] = useState([])
    const [logoUploaded, setLogoUploaded] = useState(null)
    const [msg, setMsg] = useState(null)
    const [holdingDetail, setHoldingDetail] =
        useState({
            name: '',
            image: '',
            id: ''
        })
    //loading for fetching holdings where user is fekrafzar
    const [isLoading, setIsLoading] = useState(false)
    //loading for buttons 
    const [loadingState, setLoadingState] =
        useState({
            loading: false,
            name: ''
        })


    const themeState = useTheme();
    const theme = themeState.computedTheme;
    const user = useSelector(state => state.auth.user)
    const token = useSelector(state => state.auth.token)

    const imageRef = useRef()



    useEffect(() => {
        if (user && user.is_fekrafzar) {
            setIsFekrafzar(true)
        } else {
            setIsFekrafzar(false)
        }
    }, [user])
    useEffect(async () => {
        if (isFekrafzar) {
            setIsLoading(true);
            const resultFetchingHoldings = await axios.get(`${baseUrl}api/get_holdings`, { headers: { 'auth-token': token } });
            setFethedHoldings(resultFetchingHoldings.data.message.result)
            setIsLoading(false);
            setHoldingDetail({
                name: resultFetchingHoldings.data.message.result[0].name,
                image: resultFetchingHoldings.data.message.result[0].image,
                id: resultFetchingHoldings.data.message.result[0].id,
            })

        }
    }, [isFekrafzar])
    const onChangeLogoClickHandler = useCallback(() => {
        imageRef.current.click();
    }, [])
    const onLogoImageChangHandler = async (event) => {
        let img = event.target.files[0]
        if (!img) return;
        setLoadingState({
            name: "logo",
            loading: true
        })
        const formData = new FormData()
        formData.append(
            "image",
            event.target.files[0],
        );
        formData.append(
            "holdingId",
            holdingDetail.id,
        );
        const reaultUploadImage = await axios.post(
            `${baseUrl}api/upload_holding_image`,
            formData,
            { headers: { 'auth-token': token } }
        );
        if (!reaultUploadImage.data.success) {
            setMsg(
                <ErrorDialog
                    onClose={setMsg}
                    success={false}
                >{reaultUploadImage.data.error ?
                    reaultUploadImage.data.error : stringFa.error_occured_try_again}</ErrorDialog>
            );
            setLoadingState({
                name: "logo",
                loading: true
            })
            return
        }

        setLogoUploaded(URL.createObjectURL(event.target.files[0]))
        const updatedHoldingDetail = { ...holdingDetail, image: event.target.files[0] }
        setHoldingDetail(updatedHoldingDetail)
        setMsg(
            <ErrorDialog
                onClose={setMsg}
                success={true}
            >{stringFa.logo_edited}</ErrorDialog>
        );
        setLoadingState({
            name: "logo",
            loading: false
        })
    };
    const onChangeHoldingName = async () => {
        setLoadingState({
            name: "name",
            loading: true
        })
        const resultEditHoldingName = await axios.post
            (`${baseUrl}api/edit_holding_name`, { holdingId: holdingDetail.id, holdingName: holdingDetail.name }
                , { headers: { 'auth-token': token } });
        if (!resultEditHoldingName.data.success) {
            setMsg(
                <ErrorDialog
                    onClose={setMsg}
                    success={false}
                >{resultEditHoldingName.data.error ?
                    resultEditHoldingName.data.error : stringFa.error_occured_try_again}</ErrorDialog>
            );
            setLoadingState({
                name: "name",
                loading: false
            })
            return
        }
        const updatedFetchedHoldings = [...fethedHoldings];
        let holingIndex = fethedHoldings.findIndex(item => item.name === holdingDetail.name)
        const editedHolding = { ...holdingDetail };
        updatedFetchedHoldings.splice(holingIndex - 1, 1)
        updatedFetchedHoldings.splice(holingIndex, 0, editedHolding)
        setFethedHoldings(updatedFetchedHoldings)
        setSelectedHolding(holdingDetail.name)
        setMsg(
            <ErrorDialog
                onClose={setMsg}
                success={true}
            >{stringFa.holding_name_edited}</ErrorDialog>
        );
        setLoadingState({
            name: "name",
            loading: false
        })
    }
    const onSelectChangeHandler = e => {
        setLogoUploaded(null)
        setSelectedHolding(e.target.value)
        const holding = fethedHoldings.find(item => item.name === e.target.value)
        setHoldingDetail({
            name: holding.name,
            image: holding.image,
            id: holding.id,
        })
    }
    const onEditHoldingNameChangeHandler = event => {
        const updatedHoldingDetail = { ...holdingDetail, name: event.target.value }
        setHoldingDetail(updatedHoldingDetail)
        // setHoldingDetail

    }
    return (
        <div className='body-content-custom-container'>
            {msg}
            {
                isFekrafzar &&
                <>
                    <SelectHolding
                        selectedHolding={selectedHolding}
                        fethedHoldings={fethedHoldings}
                        onSelectChangeHandler={onSelectChangeHandler}
                        style={{ marginBottom: "1rem" }}
                    />
                    <div className='seprator'
                        style={{ backgroundColor: theme.hover_button }}
                    />
                </>
            }

            <h3 className='brand-title'> {stringFa.create_your_brand}</h3>
            <div className='body-content-custom-logo-container'>
                <h4 className='main-menu-log'>
                    {stringFa.main_menu_logo}
                </h4>
                <img src={holdingDetail.image !== '' ?
                    logoUploaded ? logoUploaded : `${baseUrl}uploads/${holdingDetail.image}` : IMAGE} alt='logo' />
                <p className='recommended-logo-size'> {stringFa.recommended_logo_size}</p>
                <input type="file" style={{ display: 'none' }} ref={imageRef} onChange={onLogoImageChangHandler} />
                <ButtonIconAndLoading
                    title={stringFa.change_logo}
                    onClick={onChangeLogoClickHandler}
                    isCancel={false}
                    icon={<MdModeEdit style={{ marginLeft: ".4rem" }} />}
                    loading={loadingState.name === 'logo' && loadingState.loading}
                />
            </div>

            <div className='body-content-custom-title-container'>
                <h4 className='main-menu-log'>
                    {stringFa.holding_name}
                </h4>
                <input
                    className="editable-input"
                    value={holdingDetail.name}
                    onChange={onEditHoldingNameChangeHandler}
                // onKeyDown={setTitleHandler}
                // style={{ borderColor: error ? "red" : "" }}
                />
                <ButtonIconAndLoading
                    title={stringFa.change_holding_name}
                    onClick={onChangeHoldingName}
                    isCancel={false}
                    icon={<MdModeEdit style={{ marginLeft: ".4rem" }} />}
                    loading={loadingState.name === 'name' && loadingState.loading}
                />
            </div>
        </div>
    )
}

export default BodyContentCustom

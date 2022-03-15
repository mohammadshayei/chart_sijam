import React, { useCallback, useRef, useState, useEffect } from 'react'
import { stringFa } from '../../../../assets/strings/stringFaCollection'
import StyledButton from '../../../../component/UI/Button/StyledButton';
import './BodyContentCustom.scss'
import { MdModeEdit } from 'react-icons/md'
import IMAGE from "../../../../assets/images/simamlogo.png";
import { TiCancel } from 'react-icons/ti'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { baseUrl } from '../../../../constants/Config';
import ErrorDialog from '../../../../component/UI/Error/ErrorDialog';
import ButtonIconAndLoading from '../../../../component/UI/Button/ButtonIconAndLoading/ButtonIconAndLoading.jsx'
import { useTheme } from '../../../../styles/ThemeProvider'
import * as holdingActions from "../../../../store/actions/holdingDetail";
import { useDispatch } from 'react-redux';

const BodyContentCustom = (props) => {
    const [logoUploaded, setLogoUploaded] = useState(null)
    const [msg, setMsg] = useState(null)
    const [name, setName] = useState('')
    const [loadingState, setLoadingState] =
        useState({
            loading: false,
            name: ''
        })

    const selectedHolding = useSelector((state) => state.holdingDetail.selectedHolding);
    const token = useSelector(state => state.auth.token)
    
    const dispatch = useDispatch();
    const imageRef = useRef()
    
    const themeState = useTheme();
    const theme = themeState.computedTheme;

    const editHodlingInfo = (payload) => {
        dispatch(holdingActions.editHodlingInfo(payload));
    };

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
            selectedHolding.holdingId,
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
        editHodlingInfo({ value: event.target.files[0], mode: 'image' })
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
            (`${baseUrl}api/edit_holding_name`, { holdingId: selectedHolding.holdingId, holdingName: name }
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
        editHodlingInfo({ value: name, mode: 'name' })
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
    const onEditHoldingNameChangeHandler = event => {
        setName(event.target.value)
    }
    return (
        <div className='body-content-custom-container'>
            {msg}
            <h3 className='brand-title'> {stringFa.create_your_brand}</h3>
            {
                selectedHolding &&
                <div className='body-content-custom-logo-container'>
                    <h4 className='main-menu-log'>
                        {stringFa.main_menu_logo}
                    </h4>
                    <img src={selectedHolding.holdingImage !== '' ?
                        logoUploaded ? logoUploaded : `${baseUrl}uploads/${selectedHolding.holdingImage}` : IMAGE} alt='logo' />
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
            }

            <div className='body-content-custom-title-container'>
                <h4 className='main-menu-log'>
                    {stringFa.holding_name}
                </h4>
                <input
                    className="editable-input"
                    value={name}
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

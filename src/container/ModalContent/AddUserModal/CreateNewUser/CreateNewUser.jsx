import React, { useEffect, useState } from 'react'
import './CreateNewUser.scss'
import StyledButton from '../../../../component/UI/Button/StyledButton'
import { useTheme } from '../../../../styles/ThemeProvider';
import { stringFa } from '../../../../assets/strings/stringFaCollection';
import { countryCodes } from "../../../../assets/DummyData/CountryCode";
import InputPhoneNumber from "../../../Auth/GetPhoneNumber/InputPhoneNumber/InputPhoneNumber";
import UnderlineInput from '../../../inputs/UnderlineInput/UnderlineInput';

const CreateNewUser = (props) => {
    const [userState, setUserState] = useState(0)
    const [count, setCount] = useState(10);
    const [verifyCodeCount, setVerifyCodeCount] = useState(6);
    const [verifyCodeSelected, setVerifyCodeSelected] = useState(false)
    const [verifyCodeValue, setVerifyCodeValue] = useState('')
    const [phone, setPhone] = useState('')
    const [resultCountry, setResultCountry] = useState(
        countryCodes.find((item) => item.name === "IRAN")
    );
    const [isValidPhone, setIsValidPhone] = useState(true);


    const maxLength = 10;
    const themeState = useTheme();
    const theme = themeState.computedTheme;

    const onChangePhoneHanlder = (e) => {
        setPhone(e.target.value);
        setCount(maxLength - e.target.value.length);
        setIsValidPhone(e.target.value.length === 10 && e.target.value[0] === "9");
    };
    const onChangeCodeHandler = (e) => {
        setResultCountry(
            countryCodes.find((item) => item.dial_code === `+${e.target.value}`)
        );
    };
    const onChangeVerifyCode = (e) => {
        setVerifyCodeValue(e.target.value);
        setVerifyCodeCount(6 - e.target.value.length);
    };
    const onSendSmsToUser = () => {
        console.log('here')
        setUserState(1);
    }
    const onValidateCode = () => {

    }
    const onRegister = () => {

    }
    const globalHandler = () => {
        switch (userState) {
            case 0:
                onSendSmsToUser()
                break;
            case 1:
                onValidateCode()
                break;
            case 2:
                onRegister()
                break;
            default:
                onSendSmsToUser()
                break;
        }
    }
    const sendSmsBody = (
        <div className='create-new-user-get-phone-container'>
            <p>
                {stringFa.enter_phone}
            </p>
            <InputPhoneNumber
                phoneValue={phone}
                onChangePhone={onChangePhoneHanlder}
                onChangeCode={onChangeCodeHandler}
                correctCode={resultCountry ? true : false}
                isValidPhone={isValidPhone}
                maxLength={10}
                count={count}
                codeValue={
                    resultCountry ? resultCountry.dial_code.replace("+", "") : null
                }
            />
        </div>
    )
    const verifyCodeBody = (
        <div className="create-new-user-verify-code-container">
           
            <UnderlineInput
                config={{
                    type: "text",
                    placeholder: "",
                    maxLength: 6,
                }}
                onChange={onChangeVerifyCode}
                value={verifyCodeValue}
                onFocus={() => {
                    setVerifyCodeSelected(true);
                }}
                onBlur={() => {
                    setVerifyCodeSelected(false);
                }}
                maxLength={6}
                count={verifyCodeCount}
                padding={0.5}
                space={0.5}
                width={15}
                inputStyle={{
                    borderBottom: `${verifyCodeSelected ? theme.background :
                        theme.borderBlur
                        } ${verifyCodeSelected ? "2px" : "1px"} solid`,

                }}
            />
             <div className="create-new-user-header-verify-contianer">
                <h5>لطفا کد ارسال شده را وارد کنید</h5>
            </div>
        </div>
    )
    return (
        <div className='create-new-user-container'>
            {
                userState === 0 ? sendSmsBody : userState === 1 ? verifyCodeBody : null
            }
            <div className='button-create-new-user-container'>
                <StyledButton
                    ButtonStyle={{
                        padding: "0",
                    }}
                    hover={theme.primary_variant}
                    backgroundColor={theme.primary}
                    onClick={globalHandler}
                >

                    <div className="button-text" style={{ color: theme.on_primary }}>
                        {stringFa.confirm}
                    </div>
                </StyledButton>
            </div>
        </div>
    )
}

export default CreateNewUser

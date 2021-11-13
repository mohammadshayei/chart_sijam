import React, { useState } from 'react'
import './CreateNewUser.scss'
import StyledButton from '../../../../component/UI/Button/StyledButton'
import { useTheme } from '../../../../styles/ThemeProvider';
import { stringFa } from '../../../../assets/strings/stringFaCollection';
import { countryCodes } from "../../../../assets/DummyData/CountryCode";
import InputPhoneNumber from "../../../Auth/GetPhoneNumber/InputPhoneNumber/InputPhoneNumber";

const CreateNewUser = (props) => {
    const [userState, setUserState] = useState(0)
    const [count, setCount] = useState(10);
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
    return (
        <div className='create-new-user-container'>
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
            <div className='button-create-new-user-container'>
                <StyledButton
                    ButtonStyle={{
                        padding: "0",
                    }}
                    hover={theme.primary_variant}
                    backgroundColor={theme.primary}
                // onClick={onClickAddUserHandler}
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

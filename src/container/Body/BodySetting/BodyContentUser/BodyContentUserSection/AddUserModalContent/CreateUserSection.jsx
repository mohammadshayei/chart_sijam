import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { stringFa } from "../../../../../../assets/strings/stringFaCollection";
import Button from "../../../../../../component/UI/Button/Button";
import CustomSelect from "../../../../../../component/UI/CustomSelect/CustomSelect";
import Input from "../../../../../../component/UI/Input/Input";
import { baseUrl } from "../../../../../../constants/Config";
import { useTheme } from "../../../../../../styles/ThemeProvider";
import avatar from "../../../../../../assets/images/user_avatar.svg"
import { AiFillCamera } from 'react-icons/ai'
import ErrorDialog from "../../../../../../component/UI/Error/ErrorDialog";

const CreateUserSection = (props) => {
    const themeState = useTheme();
    const theme = themeState.computedTheme;
    const [labels, setLabels] = useState(null);
    const [selectedLabel, setSelectedLabel] = useState(null);
    const [imageSrc, setImageSrc] = useState('')
    const [imagePath, setImagePath] = useState('')
    const [orderAuth, setOrderAuth] = useState({
        orderForm: {
            namefamily: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    autoFocus: true,
                },
                title: stringFa.name_and_family,
                error: stringFa.name_and_family_error,
                value: "",
                isValid: true,
                validation: {
                    isRequired: true,
                    minLength: 1,
                },
                isFocused: false,
                selected: false,
            },
            username: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                },
                title: stringFa.username,
                error: stringFa.username_error,
                value: "",
                isValid: true,
                validation: {
                    isRequired: true,
                    minLength: 3,
                },
                isFocused: false,
                selected: false,
            },
            password: {
                elementType: "input",
                elementConfig: {
                    type: "password",
                    autoComplete: "new-password"
                },
                title: stringFa.password,
                error: stringFa.password_error,
                value: "",
                isValid: true,
                validation: {
                    isRequired: true,
                    minLength: 6,
                },
                isFocused: false,
                selected: false,
            },
            repassword: {
                elementType: "input",
                elementConfig: {
                    type: "password",
                    autoComplete: "new-password"
                },
                title: stringFa.confirm_password,
                error: stringFa.confirm_password_error,
                value: "",
                isValid: true,
                validation: {
                    isRequired: true,
                },
                isFocused: false,
                selected: false,
            },
        },
        isValid: false
    })

    const token = useSelector((state) => state.auth.token);
    const imageRef = useRef(null);

    const checkValidaty = (value, rules) => {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== "" && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        if (rules.isEmail) {
            const pattern =
                /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid;
        }
        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid;
        }

        return isValid;
    };

    const onChange = (e, key) => {
        let UpdatedOrderAuth = { ...orderAuth };
        let UpdatedOrderForm = { ...UpdatedOrderAuth.orderForm };
        let updatedFormElement = UpdatedOrderForm[key];
        updatedFormElement.value = e.target.value;
        updatedFormElement.isValid = checkValidaty(
            e.target.value,
            updatedFormElement.validation
        );
        UpdatedOrderForm[key] = updatedFormElement;

        if (key === "repassword") {
            updatedFormElement.isValid =
                e.target.value === orderAuth.orderForm.password.value && updatedFormElement.isValid;
        }

        let formIsValid = true;
        for (let inputIdentifier in UpdatedOrderForm) {
            formIsValid = UpdatedOrderForm[inputIdentifier].isValid && formIsValid;
        }
        UpdatedOrderAuth.orderForm = UpdatedOrderForm;
        UpdatedOrderAuth.isValid = formIsValid;
        setOrderAuth(UpdatedOrderAuth);
    };
    const onChangeLabelItem = (e) => {
        let selected = e.target.value;
        let findedLabel = labels.find((item) => item.label.name === selected).label._id;
        setSelectedLabel(findedLabel)
    };

    const createNewUser = async () => {
        const paylaod = {
            name_family: orderAuth.orderForm.namefamily.value,
            username: orderAuth.orderForm.username.value,
            password: orderAuth.orderForm.password.value,
            phone: props.phone,
            holdingId: "28f9b37503ec4b50b603b33ed0e3f597",
            labelId: selectedLabel,
        };
        try {
            props.setError(null)
            const resultCreateNewUser = await axios.post(
                `${baseUrl}api/create_employee`,
                paylaod,
                { headers: { "auth-token": token } }
            );
            if (resultCreateNewUser.data.success) {
                props.setError(
                    <ErrorDialog success={true} onClose={props.setError}>{resultCreateNewUser.data.result.message}</ErrorDialog>
                )
                props.close();
            }
            else
                props.setError(
                    <ErrorDialog onClose={props.setError}>{resultCreateNewUser.data.result.message}</ErrorDialog>
                )
        } catch (error) {
            props.setError(
                <ErrorDialog onClose={props.setError}>{stringFa.error_occured_try_again}</ErrorDialog>
            )
        }
    }

    const onChangeImage = (event) => {
        if (event.target.files[0]) {
            setImagePath(event.target.files[0]);
            setImageSrc(URL.createObjectURL(event.target.files[0]));
        }
        else {
            setImageSrc('')
            setImagePath('')
        }
    }

    const uploadButtonClickHandler = useCallback(() => {
        imageRef.current.click();
    }, [])

    useEffect(async () => {
        // setLoading(true);
        const resultFetchingLabels = await axios.post(
            `${baseUrl}api/get_holding_labels`,
            { holdingId: "28f9b37503ec4b50b603b33ed0e3f597" },
            { headers: { "auth-token": token } }
        );

        setLabels(resultFetchingLabels.data.labels);
        // setLoading(false);

    }, []);

    return <div className="create-user-section">
        <div className="image-wrapper">
            <div className="circle-div" onClick={uploadButtonClickHandler}>
                <input type="file"
                    style={{ display: 'none' }}
                    ref={imageRef}
                    onChange={onChangeImage} />

                <img src={imageSrc === '' ? avatar : imageSrc} alt="avatar" />
                <div className="upload-image-wrapper" >
                    <AiFillCamera className='camera' />
                </div>
            </div>
        </div>
        {Object.entries(orderAuth.orderForm).map(([k, v]) => (
            <Input
                key={k}
                onChange={(e) => onChange(e, k)}
                value={v.value}
                config={{ onBlur: onChange, ...v.elementConfig }}
                isOk={v.isValid}
                title={v.title}
                messageError={v.error}
                inputContainer={{ marginBottom: "1rem" }}
            />
        ))}
        <div className="field-container">
            <p>{stringFa.label}</p>
            <CustomSelect
                // selectedItem={labels && data.label.name}
                items={labels && labels}
                onSelectChangeHandler={(e) => onChangeLabelItem(e)}
                style={{ width: '100%', margin: "0 1rem 0 0" }}
                selectStyle={{ fontSize: '13px' }}
                keyField='_id'
                valueField='name'
                path='label'
            />
        </div>
        <Button
            disabled={!(orderAuth.isValid)}
            ButtonStyle={{ marginTop: "1rem", width: "100%" }}
            onClick={createNewUser}>
            {stringFa.create_new_user}
        </Button>
    </div>;
};

export default CreateUserSection;

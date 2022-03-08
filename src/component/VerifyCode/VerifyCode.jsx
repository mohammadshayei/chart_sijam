import { useState } from "react";
import "./VerifyCode.scss";
import Button from "../UI/Button/Button";
import { stringFa } from "../../assets/strings/stringFaCollection";
import { useTheme } from "../../styles/ThemeProvider";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import Input from "../UI/Input/Input";
import ErrorDialog from "../UI/Error/ErrorDialog";

const VerifyCode = (props) => {
  const [value, setValue] = useState("");
  const [count, setCount] = useState(5);
  const [invalid, setInvalid] = useState(false);

  const maxLength = 5;
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  const onChange = (value) => {
    setValue(value);
    setCount(maxLength - value.length);
    setInvalid(false)
  };
  const onClickButtonContinueHandler = () => {
    props.setError(null)
    if (props.otp && value) {
      if (props.otp === Number(value))
        props.setPage(4)
      else
        setInvalid(true)
    } else
      props.setError(<ErrorDialog onClose={props.setError}>{stringFa.error_message}</ErrorDialog>)
  };

  return (
    <form onSubmit={(e) => {
      onClickButtonContinueHandler()
      e.preventDefault()
    }} className="verify-code-wrapper">
      <div className="header-verify-contianer">
        <IoIosCheckmarkCircleOutline className="verify-check-icon"
          color={theme.primary} size="4rem" />
        <p>لطفا کد ارسال شده را وارد کنید</p>
      </div>
      <Input
        elementType="otp"
        boxes={5}
        onChange={onChange}
        inputContainer={{
          direction: "ltr"
        }}
        config={{ autoFocus: true }}
        messageError={stringFa.invalid_code}
        isOk={!invalid}
        inputError={{ left: "50%", transform: "translate(-50%,0.5rem)" }}
      />
      <div className={`button-verify-container ${invalid && "invalid"}`}>
        <Button
          hoverBGColor={theme.primary_variant}
          disabled={count > 0}
          ButtonStyle={{
            width: "15rem",
            paddingTop: ".2rem",
          }}
        >
          <p>{stringFa.confirm}</p>
        </Button>
      </div>
    </form>
  );
};

export default VerifyCode;

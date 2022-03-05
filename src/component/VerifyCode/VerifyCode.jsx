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
  const [error, setError] = useState(null);
  const maxLength = 5;
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  const onChange = (value) => {
    setValue(value);
    setCount(maxLength - value.length);
  };
  const onClickButtonContinueHandler = () => {
    if (props.otp === Number(value))
      setError(<ErrorDialog onClose={setError}>تایید شد.</ErrorDialog>)
  };

  return (
    <div className="verify-code-wrapper">
      {error}
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
        isOk={true}
      />
      <div className="button-verify-container">
        <Button
          hoverBGColor={theme.primary_variant}
          disabled={count > 0}
          ButtonStyle={{
            width: "15rem",
            backgroundColor:
              value.length === 5 ? theme.primary : theme.secondary,
            opacity:
              value.length === 5 ? 1 : 0.5,
            color: theme.on_primary,
            paddingTop: ".2rem",
          }}
          onClick={onClickButtonContinueHandler}
        >
          <p>{stringFa.confirm}</p>
        </Button>
      </div>
    </div>
  );
};

export default VerifyCode;

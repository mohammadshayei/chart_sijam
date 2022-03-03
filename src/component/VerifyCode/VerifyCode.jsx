import { useState } from "react";
import "./VerifyCode.scss";
import Button from "../UI/Button/Button";
import { stringFa } from "../../assets/strings/stringFaCollection";
import { useTheme } from "../../styles/ThemeProvider";
import UnderlineInput from "../../container/inputs/UnderlineInput/UnderlineInput";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import OTPInput from "../UI/OTPInput/OTPInput";

const VerifyCode = (props) => {
  const [value, setValue] = useState("");
  const [selected, setSelected] = useState(false);
  const [count, setCount] = useState(5);
  const maxLength = 5;
  const themeState = useTheme();
  const theme = themeState.computedTheme;
  const onChange = (e) => {
    setValue(e.target.value);
    setCount(maxLength - e.target.value.length);
  };
  const onClickButtonContinueHandler = (e) => {
    props.setStage(1);
  };

  return (
    <div className="verify-code-wrapper">
      <div className="header-verify-contianer">
        <IoIosCheckmarkCircleOutline className="verify-check-icon"
          color={theme.primary} size="4rem" />
        <p>لطفا کد ارسال شده را وارد کنید</p>
      </div>
      {/* <UnderlineInput
        config={{
          type: "text",
          placeholder: "",
          maxLength: maxLength,
        }}
        onChange={onChange}
        value={value}
        onFocus={() => {
          setSelected("phone");
        }}
        onBlur={() => {
          setSelected("");
        }}
        maxLength={maxLength}
        count={count}
        padding={0.5}
        space={0.5}
        width={15}
        inputStyle={{
          borderBottom: `${selected === "phone" ? theme.background : theme.borderBlur
            } ${selected === "phone" ? "2px" : "1px"} solid`,
        }}
      /> */}
      <OTPInput boxes={5} />
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
        >
          <p>{stringFa.confirm}</p>
        </Button>
      </div>
    </div>
  );
};

export default VerifyCode;

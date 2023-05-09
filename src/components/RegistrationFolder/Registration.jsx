import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { CenterWrapper, InputWrapper, StyledInput, Wrapper } from "./styles";
import RegistrationInput from "./RegistrationInput";
import { pwCheck } from "./reg";


const Registration = () => {
  const formRef = useRef({ name: "", id: "", PW: "", PW2: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [emailError, setEmailError] = useState(false)
  const onclickHandler = () => {
    if (!pwCheck(formRef.current.PW)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    // if (
    //   formRef.current.name === "" ||
    //   formRef.current.id === "" ||
    //   formRef.current.PW === "" ||
    //   formRef.current.PW2 === ""
    // ) {
    //   alert("empty string");
    // } else if (!pwCheck(formRef.current.PW) || !pwCheck(formRef.current.PW2)) {
    //   alert("pw wrong");
    // } else if (formRef.current.PW !== formRef.current.PW2) {
    //   alert("pw not same");
    // } else {
    //   alert("submitted");
    // }
  };
  const handleClickShowPassword = (field) => {
    if (field === "pw") {
      setShowPassword(!showPassword);
    } else if (field === "pw2") {
      setShowPassword2(!showPassword2);
    }
  };
  return (
    <Wrapper>
      <CenterWrapper>
      {emailError && <div style={{ color: "red" }}>Email is wrong</div>}
        <RegistrationInput type="text"
          placeholder="name"
          onChange={(e) => (formRef.current.name = e.target.value)} />
        <RegistrationInput type="text"
          placeholder="id(email)"
          onChange={(e) => (formRef.current.id = e.target.value)} />
        <RegistrationInput 
          type={showPassword ? "text" : "password"}
          placeholder="password"
          onChange={(e) => (formRef.current.PW = e.target.value)}
          handleClickShowPassword={()=>handleClickShowPassword("pw")}
          showPassword={showPassword}
        />
        <InputWrapper>
          <StyledInput
            type={showPassword2 ? "text" : "password"}
            placeholder="password2"
            onChange={(e) => (formRef.current.PW2 = e.target.value)}
          />
          <button type="button" onClick={() => handleClickShowPassword("pw2")}>
            {showPassword2 ? "Hide" : "Show"}
          </button>
        </InputWrapper>
        <button onClick={onclickHandler}>Submit</button>
      </CenterWrapper>
    </Wrapper>
  );
};

export default Registration;

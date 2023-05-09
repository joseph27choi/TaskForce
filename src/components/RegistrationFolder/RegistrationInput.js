import React from 'react'
import { InputWrapper, StyledInput } from './styles'

const RegistrationInput = ({ type, placeholder, onChange, handleClickShowPassword, showPassword }) => {

    return (
        <InputWrapper>
            <StyledInput
                type={type}
                placeholder={placeholder}
                onChange={onChange}
            />
            {showPassword !== undefined && (
                <button type="button" onClick={handleClickShowPassword}>
                    {showPassword ? "Hide" : "Show"}
                </button>
            )}
        </InputWrapper>
    )
}

export default RegistrationInput
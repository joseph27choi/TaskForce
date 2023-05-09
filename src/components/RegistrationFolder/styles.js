import styled from "styled-components";

export const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const CenterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  button {
    width: 100%;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
`;

export const StyledInput = styled.input`
  width: 100%;
  height: 40px;
  padding-left: 1rem;
`;

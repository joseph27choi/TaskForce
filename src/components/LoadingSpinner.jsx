import React from 'react'
import styled, { keyframes } from 'styled-components'

const LoadingSpinner = () => {
  return (
    <SpinnerContainer>
      <Spinner />
    </SpinnerContainer>
  )
}

export default LoadingSpinner


const SpinnerContainer = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;

  transform: translate(-50%, -50%);
`

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`

const Spinner = styled.div`
  width: 100px;
  height: 100px;

  border-radius: 100%;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #fb2710d3;

  animation: ${spin} 1.2s ease-in-out infinite;  
`
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Timer from '../components/Timer';

const Pomodoro = () => {
    const navigate = useNavigate();
    const { state } = useLocation();

    const onBack = () => {
        navigate(-1);
    }

    return (
        <StyledBackground Priority={state.priority}>
            <PomodoroPageLayout>
                {state && (
                    <>
                        <TaskName> {state.content} </TaskName>
                    </>
                )}
                <Timer selectedTask={state}/>
                <button onClick={onBack}>GO BACK</button>
            </PomodoroPageLayout>
        </StyledBackground>
    )
}

export default Pomodoro

const StyledBackground = styled.div`

    background-color: ${({Priority}) => {
        return (
        (Priority === 'gray' && '#bbbdbb') ||
        (Priority === 'green' && '#b2d6b4') ||
        (Priority === 'orange' && '#ffeebb') ||
        (Priority === 'red' && '#ffcccc') || '#000'
        );
    }};

    height: 100vh;
    width: 100vw;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const TaskName = styled.div`
    font-size: 5rem;
    font-weight: 300;
`

const PomodoroPageLayout = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    height: 100%;
    margin: 6rem 0;
`
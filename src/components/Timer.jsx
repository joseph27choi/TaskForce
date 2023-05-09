import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Timer = ({ selectedTask }) => {
  const [secondsLeft, setSecondsLeft] = useState(selectedTask.timed * 25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isRunning && secondsLeft > 0) {
      intervalId = setInterval(() => {
        setSecondsLeft((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, secondsLeft]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const timeLeft = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  const totalSeconds = selectedTask.timed * 25 * 60;
  const elapsedSeconds = totalSeconds - secondsLeft;
  const percentage = elapsedSeconds >= totalSeconds ? 99 : elapsedSeconds / totalSeconds * 100;

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  return (
    <TimerWrapper>
    <CircularProgressbar
    value={percentage}
    text={timeLeft}
    styles={buildStyles({
      strokeLinecap: "butt",
      textSize: "24px",
      pathColor: "#c4c4c4",
      textColor: "#000",
      trailColor: "#fff",
    })}
    counterClockwise={true}
    />
      <ButtonWrapper>
        <Button onClick={toggleTimer}>{isRunning ? "Pause" : "Start"}</Button>
      </ButtonWrapper>
    </TimerWrapper>
  );
};

export default Timer;

const TimerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const ButtonWrapper = styled.div`
  margin-top: 16px;
`;

const Button = styled.button`
  font-size: 16px;
  font-weight: 600;
  padding: 8px 16px;
  border: none;
  background-color: #0063e5;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #0052cc;
  }
  &:active {
    background-color: #004499;
  }
`;
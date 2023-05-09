import styled from "styled-components";

export const StyledContainer = styled.div`
  height: 100vh;
  
  background-color: #e4e4e46e;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

`;

export const StyledTodo = styled.div`

  height: 50rem;
  width: 65rem;


  border-radius: 20px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

`;

export const BannerDiv = styled.div`
  width: 100%;

  background-color: white;
  
  border: none;
  border-radius: 9px 9px 0 0;

  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;

  margin: 1.5rem 0 1rem 0;
  padding: 0;

  color: #7e7e7e;
`;

export const RedHeader = styled.h5`
  color: #fb2710d3;
  font-size: 28px;
  margin: 0.5rem 0 0 0;
`

export const EstimatedTimeDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

export const TasksToCompleteDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

export const ElapsedTimeDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

export const CompletedTasksDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space space-evenly;
  align-items: center;
`;

export const InputDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  height: 3.5rem;
  width: 100%;
  background-color: white;

`;

export const Input = styled.input`
  font-size: 16px;

  height: 100%;
  width: 100%;

  border: none;
`;

export const SubmitBtn = styled.button`
  font-size: 16px;
  padding: 0 1.5rem 0 1rem;

  border: none;
  border-radius: 5px 0 0 5px;

  height: 100%;
  width: 2rem;


  /* background-color: #ed2913c1; */
  background-color: white;
  color: #7e7e7e;

`;

export const TaskHeader = styled.p`
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  font-size: 16px;
`

export const TasksDiv = styled.div`
  font-size: 16px;
  width: 100%;

`

export const Task = styled.div`
  background-color: white;
  width: 100%;

  border: none;

  padding: 1rem 0;
  margin: 0.2rem 0;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const PlayButton = styled.button`
  font-size: 10px;

  padding: 0.3rem;

  text-align: center;

  background-color: #fb281026;
  color: #fb2710d3;

  border: none;
  border-radius: 100%;

  margin: 0 0.6rem 0 0.45rem;
`


export const ShowHideDiv = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

export const ShowHideBtn = styled.button`
font-size: 14px;

background-color: white;
border: none;
border-radius: 10px;

margin: 1.5rem 0;
`


export const CompletedTasks = styled.div`

  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

export const CompletedTask = styled.div`
  background-color: white;
  color: #949494;

  width: 100%;

  padding: 1rem 0;
  margin: 0.2rem 0;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const CompletedPlayButton = styled.button`
  font-size: 10px;

  padding: 0.3rem;

  text-align: center;

  background-color: #fb281017;
  color: #fb281066;

  border: none;
  border-radius: 100%;

  margin: 0 0.6rem 0 0.45rem;
`

export const DropDownDiv = styled.div`
  box-shadow: 0px 0px 5px 1px #d7d7d7;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

`

export const PomodoroWidgetDiv = styled.div`
    color: #7e7e7e;

    border-bottom: 1px solid gray;
    padding: 0 0 1.25rem 0;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .pomodoro-adjuster-div {
        width: 90%;
        border: 1px solid #d7d7d7;
        border-radius: 10px;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .pomodoro-button {
        border: none;
        border-radius: 10px;
        padding: 0.7rem;
        margin: 0 0.2rem;
    }

    .timer-icon {
        font-size: 18px;
        color: red;
    }
`

export const PriorityWidgetDiv = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  .priority-flags-div {
      width: 90%;

      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      margin: 0;
  }

  button {
      border: none;
      color: none;
      background-color: white;
      font-size: 40px;
  }
  .gray-flag,
  .green-flag,
  .orange-flag,
  .red-flag{
    border-radius: 10%;
    padding: 0 0.3rem;
  }
  .gray-flag {
      color: #aeaeae;
  }
  .green-flag {
      color: green;
  }
  .orange-flag {
      color: orange;
  }
  .red-flag {
      color: red;
  }

  .selected {
      background-color: #c2c2c22f;
  }
`
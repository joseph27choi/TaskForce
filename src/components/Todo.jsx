import styled from 'styled-components';
import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { db } from "../shared/firebase";
import { ref, child, set, update, remove } from "firebase/database";
import { uid } from 'uid';
import { useDispatch, useSelector } from 'react-redux';
import { __getTask } from '../redux/modules/taskModule';

const Todo = () => {

    const [tasks, setTasks] = useState([]);
    const userInputRef = useRef(null);

    const [showCompletedTasks, setShowCompletedTasks] = useState(false);

    const SHOWSTRING = "Show Completed Tasks ▼";
    const HIDESTRING = "Hide Completed Tasks ▲";
    const [showHideBtnString, setShowHideBtnString] = useState(SHOWSTRING);

    const [showContextMenu, setShowContextMenu] = useState(false);

    // to use redux here, must import function from redux
    const dispatch = useDispatch();
    const tasksLoadedFromStore = useSelector( (stores) => stores.taskModule);

    
    useEffect(() => {
      dispatch(__getTask());
    }, []);
    
    console.log(tasksLoadedFromStore);
    
    const handleAddBtn = async () => {
        // this is for creating a secure endpoint
        const uuid = uid();

        // figure out what you want to add by a default click
        const newlyEnteredTask = { "content": userInputRef.current.value, "completed": false, "timed": 0, "priority": "gray" };

        // add it all together
        await set(ref(db, "/TaskDB/" + uuid), newlyEnteredTask);

        // set the input field back to an empty string
        userInputRef.current.value = "";
    }

    const handleUpdateBtn = async (idParam) => {
        const completedTask = tasks.find((task) => task.id === idParam);
        completedTask.completed = !completedTask.completed;

        // to omit id from being added to the updated field, consider making a special object that you can just insert in
        const newObj = {
            completed: completedTask.completed,
            timed: completedTask.timed,
            content: completedTask.content,
            priority: completedTask.priority
        }

        await update(child(ref(db), `TaskDB/${idParam}`), newObj);

        // done with the database but still need to update the array with the tasks stored in it
        const updatedTasks = tasks.map((task) => {
            if (task.id === idParam) {
                return completedTask;
            }
            return task;
        });

        setTasks(updatedTasks);
        console.log(tasks);
    }

    const handleDeleteBtn = async (idParam) => {
        // delete from database with built in firebase function, recall to use await because it is a server side function
        await remove(child(ref(db), `TaskDB/${idParam}`));

        // filter returns the elements that meet the following condition
        const filteredArrOfTasks = tasks.filter((task) => task.id !== idParam);
        setTasks(filteredArrOfTasks);
    }

    const handleShowHideBtn = () => {
        setShowCompletedTasks(!showCompletedTasks);
        showCompletedTasks ? setShowHideBtnString(SHOWSTRING) : setShowHideBtnString(HIDESTRING);
    }

    const handleEditBtn = () => {
        setShowContextMenu(!showContextMenu);
    }

    const minusBtnHandler = async (idParam) => {

        console.log(idParam)

        // finding task in server
        const subtractedTimeTask = tasks.find((task) => task.id === idParam);

        subtractedTimeTask.timed !== 0 ? subtractedTimeTask.timed -= 1 : subtractedTimeTask.timed = subtractedTimeTask.timed;

        // changing server side time property
        const newObj = {
            completed: subtractedTimeTask.completed,
            timed: subtractedTimeTask.timed,
            content: subtractedTimeTask.content,
            priority: subtractedTimeTask.priority
        }

        await update(child(ref(db), `TaskDB/${idParam}`), newObj);

        // change the array
        const arrWithUpdatedTimes = tasks?.map((task) => {
            if (task.id === idParam) {
                return newObj;
            }
            return task;
        })
        setTasks(arrWithUpdatedTimes);
    }

    const plusBtnHandler = async (idParam) => {

        console.log(idParam)

        // finding task in server
        const addedTimeTask = tasks.find((task) => task.id === idParam);

        addedTimeTask.timed < 5 ? addedTimeTask.timed += 1 : addedTimeTask.timed = addedTimeTask.timed;

        // changing server side time property
        const newObj = {
            completed: addedTimeTask.completed,
            timed: addedTimeTask.timed,
            content: addedTimeTask.content,
            priority: addedTimeTask.priority
        }

        await update(child(ref(db), `TaskDB/${idParam}`), newObj);

        // change the array
        const arrWithUpdatedTimes = tasks?.map((task) => {
            if (task.id === idParam) {
                return newObj;
            }
            return task;
        })
        setTasks(arrWithUpdatedTimes);
    }



    return (
        <StyledContainer>
            <StyledTodo>
                <BannerDiv>
                    <EstimatedTimeDiv>
                        <RedHeader>1h 15m</RedHeader>
                        <p>Estimated Time</p>
                    </EstimatedTimeDiv>
                    <TasksToCompleteDiv>
                        <RedHeader>3</RedHeader>
                        <p>Tasks to Complete</p>
                    </TasksToCompleteDiv>
                    <ElapsedTimeDiv>
                        <RedHeader>1h 40m</RedHeader>
                        <p>Elapsed Time</p>
                    </ElapsedTimeDiv>
                    <CompletedTasksDiv>
                        <RedHeader>4</RedHeader>
                        <p>Completed Tasks</p>
                    </CompletedTasksDiv>
                </BannerDiv>
                <InputDiv>
                    <SubmitBtn onClick={handleAddBtn}>+</SubmitBtn>
                    <Input placeholder='Add a task to "Tasks", press "+" button to save' type='text' ref={userInputRef} />
                </InputDiv>

                <TaskHeader>Tasks · 2h 15m</TaskHeader>
                <TasksDiv>
                    {tasks?.map((submittedTask, index) => {
                        if (submittedTask.completed === false) {
                            return (
                                <Task key={index} >
                                    <div>
                                        <input type='checkbox' checked={submittedTask.completed ? true : false} onChange={() => handleUpdateBtn(submittedTask.id)} />
                                        <PlayButton>▶</PlayButton>
                                        <span>{submittedTask.content}</span>
                                    </div>
                                    <div>
                                        <button onClick={handleEditBtn}>EDIT</button>
                                        {showContextMenu && (
                                            <DropDownDiv>
                                                <PomodoroWidgetDiv>
                                                    <p>Estimated Pomodoros:</p>
                                                    <div className='pomodoro-adjuster-div'>
                                                        <button className='pomodoro-button' onClick={() => minusBtnHandler(submittedTask.id)}>-</button>
                                                        <p><span className='timer-icon'>⏱</span>{submittedTask.timed}</p>
                                                        <button className='pomodoro-button' onClick={() => plusBtnHandler(submittedTask.id)}>+</button>
                                                    </div>
                                                </PomodoroWidgetDiv>
                                                <PriorityWidgetDiv>
                                                    <p>Priority:</p>
                                                    <div className='priority-flags-div'>
                                                        <button className='gray-flag'>⚑</button>
                                                        <button className='green-flag'>⚑</button>
                                                        <button className='orange-flag'>⚑</button>
                                                        <button className='red-flag'>⚑</button>
                                                    </div>
                                                </PriorityWidgetDiv>
                                            </DropDownDiv>
                                        )}
                                    </div>
                                </Task>
                            );
                        }
                    })}
                </TasksDiv>

                <ShowHideDiv>
                    <ShowHideBtn onClick={handleShowHideBtn}>{showHideBtnString}</ShowHideBtn>
                </ShowHideDiv>

                <CompletedTasks>
                    {showCompletedTasks && tasks?.map((submittedTask, index) => {
                        if (submittedTask.completed === true) {
                            return (
                                <CompletedTask key={index}>
                                    <div>
                                        <input type='checkbox' checked={submittedTask.completed ? true : false} onChange={() => handleUpdateBtn(submittedTask.id)} />
                                        <CompletedPlayButton>▶</CompletedPlayButton>
                                        <span><s>{submittedTask.content}</s></span>
                                    </div>
                                    <button onClick={() => handleDeleteBtn(submittedTask.id)}>DELETE</button>
                                </CompletedTask>
                            )
                        }
                    })}

                </CompletedTasks>

            </StyledTodo>
        </StyledContainer>
    )
}

export default Todo

const StyledContainer = styled.div`
    height: 100vh;
    
    background-color: #e4e4e46e;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

`;

const StyledTodo = styled.div`

    height: 50rem;
    width: 65rem;


    border-radius: 20px;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

`;

const BannerDiv = styled.div`
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

const RedHeader = styled.h5`
    color: #fb2710d3;
    font-size: 28px;
    margin: 0.5rem 0 0 0;
`

const EstimatedTimeDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
`;

const TasksToCompleteDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
`;

const ElapsedTimeDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
`;

const CompletedTasksDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space space-evenly;
    align-items: center;
`;

const InputDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    height: 3.5rem;
    width: 100%;
    background-color: white;

`;

const Input = styled.input`
    font-size: 16px;

    height: 100%;
    width: 100%;

    border: none;
`;

const SubmitBtn = styled.button`
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

const TaskHeader = styled.p`
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    font-size: 16px;
`

const TasksDiv = styled.div`
    font-size: 16px;
    width: 100%;

`

const Task = styled.div`
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

const PlayButton = styled.button`
    font-size: 10px;

    padding: 0.3rem;

    text-align: center;

    background-color: #fb281026;
    color: #fb2710d3;

    border: none;
    border-radius: 100%;

    margin: 0 0.6rem 0 0.45rem;
`


const ShowHideDiv = styled.div`
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

const ShowHideBtn = styled.button`
    font-size: 14px;

    background-color: white;
    border: none;
    border-radius: 10px;

    margin: 1.5rem 0;
`


const CompletedTasks = styled.div`

    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`

const CompletedTask = styled.div`
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


const CompletedPlayButton = styled.button`
    font-size: 10px;

    padding: 0.3rem;

    text-align: center;

    background-color: #fb281017;
    color: #fb281066;

    border: none;
    border-radius: 100%;

    margin: 0 0.6rem 0 0.45rem;
`

const DropDownDiv = styled.div`
    box-shadow: 0px 0px 5px 1px #d7d7d7;
    border-radius: 10px;

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;

`

const PomodoroWidgetDiv = styled.div`
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

const PriorityWidgetDiv = styled.div`
    
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

    .gray-flag {
        color: #aeaeae;
        border-radius: 10%;
        padding: 0 0.3rem;
    }

    .green-flag {
        color: green;
        border-radius: 10%;
        padding: 0 0.3rem;
    }

    .orange-flag {
        color: orange;
        border-radius: 10%;
        padding: 0 0.3rem;
    }

    .red-flag {
        color: red;
        border-radius: 10%;
        padding: 0 0.3rem;
    }

    .selected {
        background-color: #c2c2c22f;
    }
`



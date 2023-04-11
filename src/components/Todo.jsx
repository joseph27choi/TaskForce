import styled from 'styled-components';
import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { db } from "../shared/firebase";
import { ref, get, child, onValue, set, update } from "firebase/database";
import { uid } from 'uid';

const Todo = () => {

    const [tasks, setTasks] = useState([]);
    const userInputRef = useRef(null);

    useEffect(() => {
        // always declare and call fetcher function first
        const fetchData = async () => {
            // load images if you have any (don't)

            // find the data location and store in pointer, recall, db comes from firebase.js
            const dataRef = await ref(db);

            // to transform the data into readable array, follow the next steps
            await onValue(dataRef, (snapshot) => {

                // snapshot.val() will have the info as a JSON, need to store it
                const dataJson = snapshot.val();

                // see if data is null or not
                if (dataJson) {

                    // then convert it into a readable array, and then export?
                    const arrayOfKeys = Object.keys(dataJson.TaskDB);

                    // map through the new array, updating the objects inside, and return results to temp
                    const tempArrOfObjects = arrayOfKeys.map((key) => {
                        // for each element, return an object with {"id": key, "second": "string", "completed": bool}
                        return { "id": key, ...dataJson.TaskDB[key] };
                    })

                    setTasks(tempArrOfObjects);

                }
            });

        };
        fetchData();

    }, []);


    const handleAddBtn = async () => {
        // this is for creating a secure endpoint
        const uuid = uid();

        // figure out what you want to add by a default click
        const newlyEnteredTask = { "task": userInputRef.current.value, "completed": false, "timed": false };

        // add it all together
        await set(ref(db, "/TaskDB/" + uuid), newlyEnteredTask);

        // set the input field back to an empty string
        userInputRef.current.value = "";
    }

    const handleUpdateBtn = async (idParam) => {
        const completedTask = tasks.find( (task) => task.id === idParam);
        completedTask.completed = !completedTask.completed;

        update(child(ref(db), `TaskDB/${idParam}`), completedTask);

        // done with the database but still need to update the array with the tasks stored in it
        const updatedTasks = tasks.map( (task) => {
            if (task.id === idParam) {
                console.log(completedTask)
                return completedTask ;
            }
            return task;
        } );

        setTasks(updatedTasks);
        console.log(tasks);
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
                    {/* this is where the logic should go for returning new task tabs*/}

                    {/* check if the array of tasks exists, it cannot be printed otherwise */}
                    {tasks?.map((submittedTask, index) => {
                        return (
                            <Task key={index} >
                                <input type='checkbox' onClick={() => handleUpdateBtn(submittedTask.id)}/>
                                <span>{ submittedTask.task }</span>
                            </Task>
                        );
                    })}
                </TasksDiv>

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

    padding: 1rem 0;
    margin: 0.2rem 0;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`
import styled from 'styled-components';
import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { db } from "../shared/firebase";
import { ref, get, child, onValue } from "firebase/database";
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
            await onValue( dataRef, (snapshot) => {

                // snapshot.val() will have the info as a JSON, need to store it
                const dataJson = snapshot.val();

                // see if data is null or not
                if (dataJson) {
                    // then convert it into a readable array, and then export?
                    const arrayOfKeys = Object.keys(dataJson);

                    // map through the new array, updating the objects inside, and return results to temp
                    const tempArrOfObjects = arrayOfKeys.map( (key) => {
                        // for each element, return an object with {"id": key, "second": "string", "completed": bool}
                        return {"id": key, ...dataJson[key] };
                    })

                    setTasks(tempArrOfObjects);

                    // there is nothing being printed on screen for some reason
                    tasks && console.log(tasks); 
                }
            });

        };
        fetchData();
    }, []);


    const handleAddBtn = () => {
        const uuid = uid();
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
                    <Task>
                        <input type='checkbox' />
                        <p>Update</p>
                    </Task>
                    <Task>
                        <input type='checkbox' />
                        <p>Delete</p>
                    </Task>
                    <Task>
                        <input type='checkbox' />
                        <p>Refactor</p>
                    </Task>
                    <Task>
                        <input type='checkbox' />
                        <p>Navigate</p>
                    </Task>
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

    margin: 0.2rem 0;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`
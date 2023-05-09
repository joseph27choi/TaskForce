import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { __addTask, __deleteTask, __finishTask, __getTask, __updateColor } from '../../redux/modules/taskModule';
import LoadingSpinner from '../LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import { BannerDiv, CompletedPlayButton, CompletedTask, CompletedTasks, CompletedTasksDiv, DropDownDiv, ElapsedTimeDiv, EstimatedTimeDiv, Input, InputDiv, PlayButton, PomodoroWidgetDiv, PriorityWidgetDiv, RedHeader, ShowHideBtn, ShowHideDiv, StyledContainer, StyledTodo, SubmitBtn, Task, TaskHeader, TasksDiv, TasksToCompleteDiv } from './styles';

const Todo = () => {

  // const [tasks, setTasks] = useState([]);
  const userInputRef = useRef(null);

  const [showCompletedTasks, setShowCompletedTasks] = useState(false);

  const SHOWSTRING = "Show Completed Tasks ▼";
  const HIDESTRING = "Hide Completed Tasks ▲";
  const [showHideBtnString, setShowHideBtnString] = useState(SHOWSTRING);

  const [showContextMenu, setShowContextMenu] = useState(false);

  // to use redux here, must import function from redux
  const dispatch = useDispatch();
  // don't understand this part
  const { tasksInStore, loading } = useSelector((stores) => stores.taskModule);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(__getTask());
  }, []);

  if (loading) {
    return <LoadingSpinner />
  }

  const handleAddBtn = async () => {
    dispatch(__addTask(userInputRef.current.value))
    userInputRef.current.value = "";
  }

  const handleUpdateBtn = async (idParam) => {
    dispatch(__finishTask(idParam));
  }

  const handleDeleteBtn = async (idParam) => {
    dispatch(__deleteTask(idParam));
  }

  const handleShowHideBtn = () => {
    setShowCompletedTasks(!showCompletedTasks);
    showCompletedTasks ? setShowHideBtnString(SHOWSTRING) : setShowHideBtnString(HIDESTRING);
  }

  const handleEditBtn = () => {
    setShowContextMenu(!showContextMenu);
  }

  const handleFlagBtn = (idParam, flagColor) => {
    dispatch(__updateColor(idParam, flagColor));
  }

  const minusBtnHandler = async (idParam) => {

    // console.log(idParam)

    // // finding task in server
    // const subtractedTimeTask = tasks.find((task) => task.id === idParam);

    // subtractedTimeTask.timed !== 0 ? subtractedTimeTask.timed -= 1 : subtractedTimeTask.timed = subtractedTimeTask.timed;

    // // changing server side time property
    // const newObj = {
    //   completed: subtractedTimeTask.completed,
    //   timed: subtractedTimeTask.timed,
    //   content: subtractedTimeTask.content,
    //   priority: subtractedTimeTask.priority
    //  id: idParam
    // }

    // await update(child(ref(db), `TaskDB/${idParam}`), newObj);

    // // change the array
    // const arrWithUpdatedTimes = tasks?.map((task) => {
    //   if (task.id === idParam) {
    //     return newObj;
    //   }
    //   return task;
    // })
    // setTasks(arrWithUpdatedTimes);
  }

  const plusBtnHandler = async (idParam) => {

    // console.log(idParam)

    // // finding task in server
    // const addedTimeTask = tasks.find((task) => task.id === idParam);

    // addedTimeTask.timed < 5 ? addedTimeTask.timed += 1 : addedTimeTask.timed = addedTimeTask.timed;

    // // changing server side time property
    // const newObj = {
    //   completed: addedTimeTask.completed,
    //   timed: addedTimeTask.timed,
    //   content: addedTimeTask.content,
    //   priority: addedTimeTask.priority
    //  id: idParam
    // }

    // await update(child(ref(db), `TaskDB/${idParam}`), newObj);

    // // change the array
    // const arrWithUpdatedTimes = tasks?.map((task) => {
    //   if (task.id === idParam) {
    //     return newObj;
    //   }
    //   return task;
    // })
    // setTasks(arrWithUpdatedTimes);
  }

  const handlePlayButton = (submittedObj) => {
    navigate("/pomodoro", {
      state: { timed: submittedObj.submittedTask.timed, id: submittedObj.submittedTask.id, content: submittedObj.submittedTask.content, priority: submittedObj.submittedTask.priority }
    })
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
          {tasksInStore?.map((submittedTask, index) => {
            if (submittedTask.completed === false) {
              return (
                <Task key={index} >
                  <div>
                    <input type='checkbox' checked={submittedTask.completed ? true : false} onChange={() => handleUpdateBtn(submittedTask.id)} />
                    <PlayButton onClick={() => handlePlayButton({ submittedTask })}>▶</PlayButton>
                    <span>{submittedTask.content}</span>
                  </div>
                  <div>
                    <button onClick={handleEditBtn}>EDIT</button>
                    {showContextMenu && (
                      <DropDownDiv>
                        {/* <PomodoroWidgetDiv>
                          <p>Estimated Pomodoros:</p>
                          <div className='pomodoro-adjuster-div'>
                            <button className='pomodoro-button' onClick={() => minusBtnHandler(submittedTask.id)}>-</button>
                            <p><span className='timer-icon'>⏱</span>{submittedTask.timed}</p>
                            <button className='pomodoro-button' onClick={() => plusBtnHandler(submittedTask.id)}>+</button>
                          </div>
                        </PomodoroWidgetDiv> */}
                        <PriorityWidgetDiv>
                          <p>Priority:</p>
                          <div className='priority-flags-div'>
                            <button className='gray-flag' onClick={() => handleFlagBtn(submittedTask.id, 'gray')}>⚑</button>
                            <button className='green-flag' onClick={() => handleFlagBtn(submittedTask.id, 'green')}>⚑</button>
                            <button className='orange-flag' onClick={() => handleFlagBtn(submittedTask.id, 'orange')}>⚑</button>
                            <button className='red-flag' onClick={() => handleFlagBtn(submittedTask.id, 'red')}>⚑</button>
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
          {showCompletedTasks && tasksInStore?.map((submittedTask, index) => {
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





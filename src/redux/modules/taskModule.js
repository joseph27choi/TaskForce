import { child, get, ref, remove, set, update } from "firebase/database";
import { db } from "../../shared/firebase";
import { uid } from "uid";

// initial state -- mini store (global variable management)

const initialState = {
    tasksInStore: [],
    loading: false,
    completed: false,
    error: null
}

// action type -- api name (deposit, withdrawal, loading, etc.)
const GET_TASK = "TaskDB/GET_TASK";
const LOADING = "TaskDB/LOADING";
const ADD_TASK = "TaskDB/ADD_TASK";
const FINISH_TASK = "TaskDB/FINISH_TASK";
const DELETE_TASK = "TaskDB/DELETE_TASK";

// action function -- google translate (from chinese to english)
const getTask = (payload) => ({ type: GET_TASK, payload: payload });
const loadingTask = (payload) => ({ type: LOADING, payload: payload });
const addTask = (payload) => ({ type: ADD_TASK, payload: payload });
const finishTask = (payload) => ({ type: FINISH_TASK, payload: payload });
const deleteTask = (payload) => ({ type: DELETE_TASK, payload: payload });

// thunk function -- interact with server (request response)
// get functions do not need any inputs, void input
export const __getTask = () => async (dispatch, getState) => {
    dispatch(loadingTask(true));
    try {
        // make a pointer to the database
        const dataRef = ref(db);
        // extract all the data from the endpoint "TaskDB"
        // to transform the data into readable array, follow the next steps
        const payload = await get(child(dataRef, "/TaskDB")).then((snapshot) => {
            // see if data is null or not
            if (snapshot.exists()) {
                const dataJson = snapshot.val();
                // then convert it into a readable array, and then export?
                const arrayOfKeys = Object.keys(dataJson);
                // map through the new array, updating the objects inside, and return results to temp
                const tempArrOfObjects = arrayOfKeys.map((key) => {
                    // for each element, return an object with {"id": key, "second": "string", "completed": bool}
                    return { "id": key, ...dataJson[key] };
                })
                return tempArrOfObjects;
            }
        });
        dispatch(getTask(payload))
    } catch (error) {
        console.log(error)
    } finally {
        dispatch(loadingTask(false))
    };
}

// let payload be the entered content of the todo
export const __addTask = (payload) => async (dispatch, getState) => {
    dispatch(loadingTask(true));
    try {
        // this is for creating a secure endpoint
        const uuid = uid();
        // figure out what you want to add by a default click
        const newlyEnteredTask = { "content": payload, "completed": false, "timed": 0, "priority": "gray" };
        // add it all together
        await set(ref(db, "/TaskDB/" + uuid), newlyEnteredTask);

        dispatch(addTask(newlyEnteredTask));
    } catch (error) {
        console.log(error);
    } finally {
        dispatch(loadingTask(false));
    }
}

// let payload be the updated task's id
export const __finishTask = (payload) => async (dispatch, getState) => {
    dispatch(loadingTask(true));
    try {
        const arrOfTasks = getState().taskModule.tasksInStore;

        const completedTask = arrOfTasks?.find( (task) => task.id === payload);

        completedTask.completed = !completedTask.completed;

        // to omit id from being added to the updated field, consider making a special object that you can just insert in
        const newObj = {
          completed: completedTask.completed,
          timed: completedTask.timed,
          content: completedTask.content,
          priority: completedTask.priority
        }

        await update(child(ref(db), `TaskDB/${payload}`), newObj);

        // don't know if I still need to process it in reducer
        // because we already updated the server and the get function fetches updated info

    } catch (error) {
        console.log(error);
    } finally {
        dispatch(loadingTask(false));
    }
}

// let payload be the id of deleted task
export const __deleteTask = (payload) => async (dispatch, getState) => {
    dispatch(loadingTask(true));
    try {
        const arrOfTasks = getState().taskModule.tasksInStore;
        const deletedTask = arrOfTasks?.find( (task) => task.id === payload);
        console.log(deletedTask.content)

        // delete from database
        await remove(child(ref(db), `TaskDB/${payload}`));
        // removed from db

        // time to remove it from the store, literally update the array
        const filteredArrOfTasks = arrOfTasks.filter((task) => task.id !== payload )

        // send this updated list to reducer through the action function
        dispatch(deleteTask(filteredArrOfTasks));

    } catch (error) {
        console.log(error);
    } finally {
        dispatch(loadingTask(false));
    }
}

// export reducer -- editor boy
const taskModule = (state = initialState, action) => {
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                loading: action.payload,
            }
        case GET_TASK:
            return {
                ...state,
                tasksInStore: [...action.payload],
            }
        case ADD_TASK:
            return {
                ...state,
                tasksInStore: [...state.tasksInStore, action.payload],
            }
        // case FINISH_TASK:
        //     return {
        //         ...state,
        //         tasksInStore: [...action.payload],
        //     }
        case DELETE_TASK:
            return {
                ...state,
                tasksInStore: [...action.payload],
            }
        default:
            return state;
    }
}

export default taskModule;
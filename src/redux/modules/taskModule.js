import { child, get, ref } from "firebase/database";
import { db } from "../../shared/firebase";

// initial state -- mini store (global variable management)

const initialState = {
    task: [],
    loading: false,
    error: null
}

// action type -- api name (deposit, withdrawal, loading, etc.)
const GET_TASK = "TaskDB/GET_TASK";
const LOADING = "TaskDB/LOADING";

// action function -- google translate (from chinese to english)
const getTask = (payload) => ({ type: GET_TASK, payload: payload });
const loadingTask = (payload) => ({ type: LOADING, payload: payload });

// thunk function -- interact with server (request response)
export const __getTask = (payload) => async (dispatch, getState) => {
    dispatch(loadingTask(true));
    try {
        // make a pointer to the database
        const dataRef = await ref(db);
        // extract all the data from the endpoint "TaskDB"
        // to transform the data into readable array, follow the next steps
        const payload = await get(child(dataRef, "/TaskDB")).then((snapshot) => {
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
                return tempArrOfObjects;
            }
        });
        dispatch(getTask(payload))
    } catch (error) {
    } finally {
        dispatch(loadingTask(false))
    };
}



// export reducer -- the final logic that saves the data into the big store
const taskModule = (state = initialState, action) => {
    switch (action.type) {
        case GET_TASK:
            return {
                ...state,
                task: [...action.payload],
            }
        case LOADING:
            return {
                ...state,
                loading: action.payload,
            }
        default:
            return state;
    }
}

export default taskModule;


import { combineReducers } from "redux";
import taskModule from "./taskModule";

const combinedModules = combineReducers({
    taskModule
});

export default combinedModules;

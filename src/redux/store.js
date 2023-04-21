import { applyMiddleware, createStore } from "redux";
import combinedModules from "./modules/combine";
import thunk from "redux-thunk";

const middlewares = [thunk];
const enhancer = applyMiddleware(...middlewares);

const store = createStore(combinedModules, enhancer);

export default store;
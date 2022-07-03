/* file nay la noi tong hop cac reducer */
import { combineReducers } from "redux";
import useReducer from "./reducer";

const rootReducer = combineReducers({
    user: useReducer
});

export default rootReducer;
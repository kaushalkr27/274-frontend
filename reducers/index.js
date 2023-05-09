import { combineReducers } from "redux";
import isLoadingReducer from "./isLoadingReducer";

const rootReducer = combineReducers({
    isLoadingReducer
});

export default rootReducer;
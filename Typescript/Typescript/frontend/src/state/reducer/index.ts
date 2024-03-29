import { combineReducers } from "redux";
import productReducer from "./productReducer";

const reducers = combineReducers({
  repo: productReducer,
});

export default reducers;

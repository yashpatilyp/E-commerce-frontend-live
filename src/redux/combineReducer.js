import {combineReducers} from "redux";

import { userReducer } from "./userReducer";
// Combine reducers and export the combined reducer
export const combineReducer = combineReducers({userReducer:userReducer});
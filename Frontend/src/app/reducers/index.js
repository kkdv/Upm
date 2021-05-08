import { combineReducers } from "redux";
import authReducer from "./authReducer";
import courseReducer from "./courseReducer";

export default combineReducers({
  courses: courseReducer,
  auth: authReducer,
});

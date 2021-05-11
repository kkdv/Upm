import { combineReducers } from "redux";
import authReducer from "./authReducer";
import cartReducer from "./cartReducer";
import courseReducer from "./courseReducer";

export default combineReducers({
  courses: courseReducer,
  auth: authReducer,
  cart: cartReducer,
});

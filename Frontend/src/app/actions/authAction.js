import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../../utils/setAuthToken";
import { SET_CURRENT_USER } from "./types";

export const registeruser = (userData) => (dispatch) => {
  axios.post("http://localhost:5000/api/users/signup", userData);
};

export const loginUser = (userData) => (dispatch) => {
  axios.post("http://localhost:5000/api/users/login", userData).then((res) => {
    const { token } = res.data;
    localStorage.setItem("jwtToken", token);
    setAuthToken(token);
    const decoded = jwt_decode(token);
    dispatch(setCurrentUser(decoded));
  });
};

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../../utils/setAuthToken";
import {
    SET_CURRENT_USER,
    GET_FORM_ERRORS
} from "./types";

const api_host = process.env.REACT_APP_API_HOST;
export const registeruser = (userData, history) => (dispatch) => {

    axios
        .post(`https://${api_host}:5443/api/users/signup`, userData)
        .then((res) => {
            const {
                token
            } = res.data;
            localStorage.setItem("jwtToken", token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
            history.push("/");
        })
        .catch((err) =>
            dispatch({
                type: GET_FORM_ERRORS,
                payload: err.response.data,
            })
        );
};

export const saveuserprofile = (userData, history) => (dispatch) => {
    axios
        .post(`https://${api_host}:5443/api/users/saveuserprofile`,
            userData)
        .then((res) => {
            const {
                token
            } = res.data;
            localStorage.setItem("jwtToken", token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
            history.push("/");
        })
        .catch((err) =>
            dispatch({
                type: GET_FORM_ERRORS,
                payload: err.response.data,
            })
        );
};

export const loginUser = (userData, history) => (dispatch) => {
    axios
        .post(`https://${api_host}:5443/api/users/login`, userData)
        .then((res) => {
            const {
                token
            } = res.data;
            localStorage.setItem("jwtToken", token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));

            //console.log("DEBUG(loginUser): res.data:=>" + JSON.stringify(res.data));
            history.push("/");
        })
        .catch((err) =>

            dispatch({
                type: GET_FORM_ERRORS,
                payload: err.response.data,

                //payload: err.response.data,
            })
        );
};

export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded,
    };
};

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    dispatch(setCurrentUser({}));
};

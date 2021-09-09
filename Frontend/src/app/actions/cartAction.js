import axios from "axios";
import {
    ADD_TO_BASKET,
    REMOVE_FROM_BASKET
} from "./types";
const api_host = process.env.REACT_APP_API_HOST;
export const addToCart = (course) => async (dispatch) => {
    await axios.post(`http://${api_host}:5000/api/users/cart/add`, {
        course: course,
    });

    dispatch({
        type: ADD_TO_BASKET,
    });
};

export const removeFromCart = (title) => async (dispatch) => {
    await axios.post(`http://${api_host}:5000/api/users/cart/remove`, {
        title: title,
    });

    dispatch({
        type: REMOVE_FROM_BASKET,
    });
};

export const addAllToCart = () => async (dispatch) => {};

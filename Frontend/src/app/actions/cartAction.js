import axios from "axios";
import { ADD_ALL, ADD_TO_BASKET, REMOVE_FROM_BASKET } from "./types";

export const addToCart = (course) => async (dispatch) => {
  await axios.post("http://localhost:5000/api/users/cart/add", {
    course: course,
  });

  dispatch({
    type: ADD_TO_BASKET,
  });
};

export const removeFromCart = (title) => async (dispatch) => {
  await axios.post("http://localhost:5000/api/users/cart/remove", {
    title: title,
  });

  dispatch({
    type: REMOVE_FROM_BASKET,
  });
};

export const addAllToCart = () => async (dispatch) => {};

import axios from "axios";
import {
  ADD_COURSES_FAIL,
  ADD_COURSES_REQUEST,
  ADD_COURSES_SUCCESS,
  ADD_SINGAL_COURSES_SUCCESS,
  CLEAR_ERRORS,
  ADD_FILTERD_COURSES_SUCCESS,
} from "./types";

export const getCourses = () => async (dispatch) => {
  try {
    dispatch({ type: ADD_COURSES_REQUEST });

    const { data } = await axios.get("http://localhost:5000/api/courses");

    dispatch({
      type: ADD_COURSES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_COURSES_FAIL,
      payload: error.message,
    });
  }
};

export const getFilteredCourses = (category) => async (dispatch) => {
  try {
    dispatch({ type: ADD_COURSES_REQUEST });

    const { data } = await axios.get("http://localhost:5000/api/courses");

    const filterdData = await data.courses.filter(
      (course) => course.category === category
    );

    dispatch({
      type: ADD_FILTERD_COURSES_SUCCESS,
      payload: filterdData,
    });
  } catch (error) {
    dispatch({
      type: ADD_COURSES_FAIL,
      payload: error.message,
    });
  }
};

export const getSingalCourse = (id) => async (dispatch) => {
  try {
    dispatch({ type: ADD_COURSES_REQUEST });

    console.log(`http://localhost:5000/api/course1/${id}`);

    console.log('hello');

    const { data } = await axios.get(`http://localhost:5000/api/course/${id}`);
    dispatch({
      type: ADD_SINGAL_COURSES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_COURSES_FAIL,
      payload: error.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

import axios from "axios";
import {
    ADD_COURSES_FAIL,
    ADD_COURSES_REQUEST,
    ADD_COURSES_SUCCESS,
    ADD_SINGLE_COURSES_SUCCESS,
    CLEAR_ERRORS,
    ADD_FILTERD_COURSES_SUCCESS,
} from "./types";

const api_host = process.env.REACT_APP_API_HOST;

export const getCourses = () => async (dispatch) => {
    try {
        dispatch({
            type: ADD_COURSES_REQUEST
        });

        const {
            data
        } = await axios.get(`https://${api_host}:5443/api/courses`);

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
        dispatch({
            type: ADD_COURSES_REQUEST
        });

        const {
            data
        } = await axios.get(`https://${api_host}:5443/api/courses`);

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

export const getSingleCourse = (id) => async (dispatch) => {
    try {
        dispatch({
            type: ADD_COURSES_REQUEST
        });

        const {
            data
        } = await axios.get(`https://${api_host}:5443/api/course/${id}`);
        dispatch({
            type: ADD_SINGLE_COURSES_SUCCESS,
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

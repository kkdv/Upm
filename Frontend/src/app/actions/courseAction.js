import axios from "axios";
import { ADD_COURSES } from "./types";

export const fetchCourses = () => (dispatch) => {
  axios.get("http://localhost:5000/api/users").then((courseData) => {
    console.log(courseData.data);
    dispatch(addCourses(courseData.data));
  });
};

export const addCourses = (courseData) => {
  return {
    type: ADD_COURSES,
    payload: courseData,
  };
};

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../app/actions/courseAction";

function Test() {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.courses);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [fetchCourses]);
  return <div>{courses && courses[2].title}</div>;
}

export default Test;

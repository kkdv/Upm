import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { ADD_ALL_COURSES } from "../../app/actions/types";
// import { REMOVE_FROM_MYCOURSES } from "../app/actions/types";
import "./MyCoursesItem.css";

function MyCoursesItem(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const courseItem = useSelector((state) => state.cart.courseItem);

  const onClickHandler = async () => {
    await axios.post("http://localhost:5000/api/mycourses/remove", {
      title: props.title,
    });
    await dispatch({
      type: ADD_ALL_COURSES,
      payload: courseItem - 1,
    });
  };

  return (
    <div className="myCoursesItem">
      <img
        className="myCoursesItem__image"
        src={props.imageURL}
        alt={props.title}
      />
      <div className="myCoursesItem__info">
        <p className="myCoursesItem__title">{props.title}</p>
        <p className="myCoursesItem__author">By {props.author}</p>
      </div>
      <div className="myCoursesItem__down">
        <p onClick={() => history.push(`/course/${props._id}`)}>START COURSE</p>
        <p onClick={onClickHandler}>REMOVE COURSE</p>
      </div>
    </div>
  );
}

export default MyCoursesItem;

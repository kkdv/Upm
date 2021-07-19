import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { ADD_ALL_COURSES } from "../../app/actions/types";
// import { REMOVE_FROM_MYCOURSES } from "../app/actions/types";
import "./MyCoursesItem.css";
import "../Subscribe/UserList.css";

import VideoAd from "../MainPage/VideoAd";
import MyCourses from "./MyCourses";

function MyCoursesItem(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const usertype = useSelector((state) => state.auth.usertype);
  const [data, setData] = useState([]);
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

  const StartCourse = async () => {
    await axios
      .post("http://localhost:5000/api/mycourses/start", {
        title: props.title,
        id: props._id,
      })
      .then((response) => {
        console.log("Start Course-->" + JSON.stringify(response, null, "\t"));
        setData(response.data.course);
        setData((state) => {
          return state;
        });
      });
    dispatch({
      type: ADD_ALL_COURSES,
      payload: courseItem,
    });
  };

  return (
    <div className="userlist">
      <div className="userlist__info">
        <div className="myCoursesItem">
          <img
            className="myCoursesItem__image"
            src={props.imageURL}
            alt={props.title}
          />
          <div className="myCoursesItem__info">
            <p className="myCoursesItem__title"> {props.title} </p>
            <p className="myCoursesItem__author"> By {props.author} </p>
          </div>
          <div className="myCoursesItem__down">
            <p onClick={StartCourse}> START COURSE </p>
            <p onClick={onClickHandler}> REMOVE COURSE </p>
          </div>
        </div>
      </div>
      <div className="userlist__info">
        <VideoAd docURL={data.docURL} title={data.docURL} />
      </div>
    </div>
  );
}

export default MyCoursesItem;

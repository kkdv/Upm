import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { ADD_ALL_COURSES } from "../../app/actions/types";
// import { REMOVE_FROM_MYCOURSES } from "../app/actions/types";

import "./MyCoursesItem.css";
import "../MainPage/Banner.scss";
import "../Subscribe/UserList.css";
import "../Search/SearchList.css";
import PDFLogo from "../../images/logo/lms/PDF_icon.jpg";

import VideoPlayer from "../MainPage/VideoPlayer";

function MyCoursesItem(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.auth.user);
  const usertype = useSelector((state) => state.auth.usertype);

  const [data, setData] = useState([]);

  const courseItem = useSelector((state) => state.cart.courseItem);
  const [loading, setLoading] = useState(false);

  const onClickHandler = async () => {
    await axios.post("http://localhost:5000/api/mycourses/remove", {
      title: props.title,
    });
    await dispatch({
      type: ADD_ALL_COURSES,
      payload: courseItem - 1,
    });
  };

  const openInNewTab = (videoURL, docURL) => {
    const newWindow = window.open(
      videoURL,
      "_blank",
      "noopener,noreferrer,height=100,width=100"
    );
    if (newWindow) newWindow.opener = null;
  };

  return (
    <div className="myCoursesItem">
      <div className="myCoursesItem__info">
        <p className="myCoursesItem__title"> {props.title} </p> <p> </p>
        <p className="myCoursesItem__author"> By {props.author} </p>
        <div className="myCoursesItem__down">
          <button
            className="green_button"
            onClick={() =>
              //history.push(`/startcourse/${encodeURIComponent(props.videoURL)}`)
              history.push(`/startcourse/${encodeURIComponent(props.id)}`)
            }
          >
            START
          </button>
          <p>
            <button className="red_button" onClick={onClickHandler}>
              DROP
            </button>
          </p>
        </div>
      </div>
      <div className="myCoursesItem__info">
        <VideoPlayer
          videoURL={props.videoURL}
          title={props.title}
          height={340}
          width={440}
          isEnrolled={false}
        />
      </div>
      <div className="myCoursesItem__info">
        <p className="myCoursesItem__title"> Downloadable Content </p> <p></p>
        <div className="myCoursesItem__image">
          <img
            className="myCoursesItem__image"
            alt="Document"
            src={PDFLogo}
          ></img>
        </div>
      </div>
    </div>
  );
}

export default MyCoursesItem;

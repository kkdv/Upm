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
import "../MainPage/Header";
import PDFLogo from "../../images/logo/lms/PDF_icon.jpg";

import VideoAd from "../MainPage/VideoAd";
import StartCourse from "./StartCourse";

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
    <div className="searchcard">
      <div className="searchcard__info">
        {/* <img
          src={props.imageURL}
          className="myCoursesItem__image"
          alt={props.title}
        /> */}
        <div className="myCoursesItem__info">
          <p className="myCoursesItem__title">{props.title}</p>
          <p className="myCoursesItem__author">By {props.author} </p>
        </div>
        <div className="myCoursesItem__down">
          {/*   <p onClick={() => openInNewTab(props.videoURL, props.docURL)}>
          <p onClick={() => history.push(`/course/${props.id}`)}>START</p>
            START
          </p> */}
          <div className="myCoursesItem__down">
            <button
              className="header__btn header__login"
              onClick={() =>
                history.push(
                  `/startcourse/${encodeURIComponent(props.videoURL)}`
                )
              }
            >
              START
            </button>

            <p>
              <button onClick={onClickHandler}> DROP </button>
            </p>
          </div>
        </div>
      </div>
      <div className="myCoursesItem__info">
        <VideoAd
          videoURL={props.videoURL}
          title={props.title}
          height={340}
          width={440}
          isEnrolled={false}
        />
      </div>
      <div className="myCoursesItem__info">
        <img
          className="myCoursesItem__image"
          alt="Document"
          src={PDFLogo}
        ></img>
      </div>
    </div>
  );
}

export default MyCoursesItem;

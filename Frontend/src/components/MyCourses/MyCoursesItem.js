import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { ADD_ALL_COURSES } from "../../app/actions/types";
// import { REMOVE_FROM_MYCOURSES } from "../app/actions/types";
import "./MyCoursesItem.css";
import "../MainPage/Banner.scss";
import "../Subscribe/UserList.css";
import "../Search/SearchList.css";
import "../MainPage/Header";
import PDFLogo from "../../images/logo/lms/PDF_icon.jpg";

import VideoAd from "../MainPage/VideoAd";
import MyCourses from "./MyCourses";

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

  const openInNewTab = (url) => {
    const newWindow = window.open(
      url,
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
          <p> START </p> <p onClick={onClickHandler}> DROP </p>
        </div>
      </div>

      <td>
        <VideoAd
          videoURL={props.videoURL}
          title={props.title}
          height={240}
          width={340}
        />
      </td>
      <td>
        <img
          onClick={() => openInNewTab(props.docURL)}
          className="myCoursesItem__image"
          alt="Document"
          src={PDFLogo}
        ></img>
      </td>
    </div>
  );
}

export default MyCoursesItem;

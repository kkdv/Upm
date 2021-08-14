import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

// import { REMOVE_FROM_MYCOURSES } from "../app/actions/types";
import "./StartCourse.css";

import PDFLogo from "../../images/logo/lms/PDF_icon.jpg";

import VideoAd from "../MainPage/VideoAd";

function StartCourse() {
  const dispatch = useDispatch();

  const history = useHistory();

  const user = useSelector((state) => state.auth.user);
  const usertype = useSelector((state) => state.auth.usertype);

  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);

  const { vURL } = useParams();

  const openInNewTab = (videoURL, docURL) => {
    const newWindow = window.open(
      videoURL,
      "_blank",
      "noopener,noreferrer,height=100,width=100"
    );
    if (newWindow) newWindow.opener = null;
  };
  //const { courseID } = useParams();
  /* async function fetchData(courseID) {
    const rs = await axios.get(`http://localhost:5000/api/course/${courseID}`);
    console.log("rs=" + JSON.stringify(rs, null, "\t"));
    vURL = rs.courseIncludes[0].videoURL;
  }
  fetchData(courseID); */

  return (
    <div>
      <div className="StartCourses__container">
        <div className="course_video">
          <VideoAd
            videoURL={decodeURIComponent(vURL)}
            title="video title"
            height={"560"}
            width={"1000"}
            isEnrolled={true}
          />
        </div>

        <div className="course_details">
          Dive in and learn React.js from scratch! Learn Reactjs, Hooks, Redux,
          React Routing, Animations, Next.js and way more! If the promise is
          rejected, catch returns a new promise with undefined payload (data).
          If there is a return statement in the handler function, it returns a
          fulfilled promise with that return value as the payload. finally
          returns a new promise with undefined payload (data). If there is a
          return statement in the handler function, it returns a fulfilled
          promise with that return value as the payload. Only first then is
          invoked when the promise is fulfilled and only first catch is invoked
          when the promise is rejected. After that, depending on the appearance
          of then and catch handlers, the handler function will be called. Let’s
          see an example of this in details.
        </div>
        <div className="course_progress">
          <img
            className="StartCourses__image"
            onClick={() => openInNewTab("docURL...")}
            alt="Document"
            src={PDFLogo}
          ></img>
        </div>
        <div className="course_timer">
          Other stuff <button className="red_button">Test</button>
        </div>
      </div>
    </div>
  );
}

export default StartCourse;

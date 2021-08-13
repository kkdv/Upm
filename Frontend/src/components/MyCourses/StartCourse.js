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
      <div className="StartCoursesItem">
        <div className="StartCoursesItem__Info">
          <VideoAd
            videoURL={decodeURIComponent(vURL)}
            title="video title"
            height={"550px"}
            width={"1000px"}
            isEnrolled={true}
          />
        </div>
      </div>
      <div className="StartCoursesItem">
        <div className="StartCoursesItem__Info">Lots of Text Stuff</div>
      </div>
      <div className="StartCoursesItem">
        <div className="StartCoursesItem__image">
          <img
            onClick={() => openInNewTab("docURL...")}
            alt="Document"
            src={PDFLogo}
          ></img>
        </div>
        <div className="StartCoursesItem__image">Other stuff</div>
      </div>
    </div>
  );
}

export default StartCourse;

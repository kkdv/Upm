import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as fn from "../Helpers/Helper";

import "./StartCourse.css";

import PDFIcon from "../../images/logo/lms/PDF_icon.jpg";

import VideoPlayer from "../MainPage/VideoPlayer";

function StartCourse() {
  /* const dispatch = useDispatch();
  const history = useHistory();
  const usertype = useSelector((state) => state.auth.usertype);
 */
  const user = useSelector((state) => state.auth.user);

  // intitalize the data array to the correct JSON structure for first render
  const [cdata, setData] = useState({
    data: {
      success: true,
      courses: {
        learn: [" "],
        courseIncludes: [
          {
            Icon: " ",
            title: " ",
            videoURL: "",
          },
          {
            Icon: " ",
            title: " ",
            docURL: " ",
          },
          {
            Icon: " ",
            title: " ",
          },
          {
            Icon: " ",
            title: " ",
          },
          {
            Icon: " ",
            title: " ",
          },
          {
            Icon: " ",
            title: " ",
          },
        ],
        audience: [""],
        _id: " ",
        ratings: "",
        orgPrice: "",
        noOfStudents: "",
        category: " ",
        imageURL: " ",
        title: " ",
        description: " ",
        author: " ",
        stars: 0,
        currPrice: 0,
        bestSeller: true,
        language: "",
        __v: 0,
      },
    },
  });

  const [loading, setLoading] = useState(false);

  //const { vURL } = useParams();

  const openInNewTab = (videoURL, docURL) => {
    const newWindow = window.open(
      videoURL,
      "_blank",
      "noopener,noreferrer,height=100,width=100"
    );
    if (newWindow) newWindow.opener = null;
  };

  const { courseID } = useParams();
  //console.log("OutcourseID=" + courseID);
  const api_host = process.env.REACT_APP_API_HOST;
  useEffect(() => {
    async function fetchData(p_courseID) {
      //console.log("p_courseID=" + p_courseID);
      const rs = await axios.get(
        `https://${api_host}/api/course/${p_courseID}`
      );
      //console.log("rs=" + JSON.stringify(rs, null, "\t"));
      return rs;
    }
    async function updateUserData() {
      console.log("updating user: " + user.email);
      //const courseid = "12345";
      const rs = await axios.get(
        `https://${api_host}/api/users/updateuser/${user.id}/${courseID}`
      );
      // params: { userid: user.id, courseid: "123445666" },

      return rs;
    }

    setLoading(true);
    fetchData(courseID).then((cid) => {
      /* console.log(
        "fetchData:MyCourses->" +
          courseID +
          ":" +
          JSON.stringify(cid, null, "\t")
      ); */

      //Product Analytics
      fn.pa("Course Video Started");

      setData(cid);
      setData((state) => {
        return state;
      });
      updateUserData().then((rs) => {
        console.log(
          "back form updateuser=" + JSON.stringify(rs.data, null, "\t")
        );
      });
    });

    setLoading(false);
  }, [setData, courseID]);

  return (
    <div>
      {!loading && (
        <div className="StartCourses__container">
          <div className="course_video">
            <VideoPlayer
              videoURL={cdata.data.courses.courseIncludes[0].videoURL}
              //videoURL="http://vjs.zencdn.net/v/oceans.mp4"
              //videoType="video/youtube"
              title="video title"
              height={"760"}
              width={"1050"}
              isEnrolled={true}
            />
          </div>

          <div className="course_details">
            <p className="StartCoursesItem__author">
              {cdata.data.courses.learn[0]}
            </p>
          </div>
          <div className="course_add_content">
            <p>
              <h4> Documents Available</h4>
            </p>
            <div className="StartCourses__image">
              <img
                className="StartCourses__image"
                onClick={() =>
                  openInNewTab(cdata.data.courses.courseIncludes[1].docURL)
                }
                alt="Document"
                src={PDFIcon}
              ></img>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StartCourse;

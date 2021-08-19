import React, { useEffect, useState } from "react";
import MyCoursesItem from "./MyCoursesItem";
import "./MyCourses.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useParams } from "react-router-dom";

function MyCourses() {
  //const myCourses = useSelector((state) => state.courses.courses);
  // const userEmail = useSelector((state) => state.user.userData);
  const courseItem = useSelector((state) => state.cart.courseItem);
  const history = useHistory();

  //console.log("state=" + state.cart.courseItem);
  const [myC, setmyCourses] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      //console.log("Executing FetchData");

      // Get myCourses from the users table
      const rs = await axios.get("http://localhost:5000/api/mycourses/get");
      let wD_arr = JSON.parse(JSON.stringify(rs));
      let i = 0;
      // Lookup course by ID and creeate a new key/value pair in the courses object
      for (const index of rs.data) {
        const crs = await axios.post(
          "http://localhost:5000/api/mycourses/start",
          {
            payd: index._id,
          }
        );
        /* console.log("After FetchCourseData crs=" + JSON.stringify(crs, null, "\t")); */

        // Insert the new key/value pair of courseIncludes
        wD_arr.data[i].courseIncludes = [
          {
            videoURL: "",
          },
          {
            docURL: "",
          },
        ];

        wD_arr.data[i].courseIncludes[0]["videoURL"] =
          crs.data.courseIncludes[0].videoURL;

        wD_arr.data[i].courseIncludes[1]["docURL"] =
          crs.data.courseIncludes[1].docURL;

        i++;

        //wD_arr.data[i++].courseIncludes = crs.data.courseIncludes[0].videoURL;
      }
      return wD_arr;
    }

    setloading(true);
    fetchData()
      .then((rs) => {
        setmyCourses(rs);
        setmyCourses((state) => {
          return state;
        });
        //console.log("fetchData:MyCourses->" + JSON.stringify(rs, null, "\t"));
        setloading(false);
      })
      .catch(function (err) {
        console.log("Error FetchData:" + err.response.data);
        if (err.response.status === 404) {
          history.push("/logout");
        }
      });
  }, [setmyCourses, courseItem]);

  return (
    <div>
      <div className="myCourses__top">
        <h3> Courses Assigned to You </h3>{" "}
      </div>{" "}
      <div className="myCourses__info">
        {" "}
        {loading && (
          <div className="course__loader">
            <ClipLoader loading={loading} size={60} color="#3c3b37" />
          </div>
        )}{" "}
        {myC.data &&
          myC.data.map((item, index) => (
            <MyCoursesItem
              key={index}
              id={item._id}
              videoURL={item.courseIncludes[0].videoURL}
              docURL={item.courseIncludes[1].docURL}
              imageURL={item.imageURL}
              title={item.title}
              author={item.author}
              index={index}
            />
          ))}{" "}
      </div>{" "}
      {myC.data && myC.data.length === 0 && (
        <p className="cannotfind">
          When you are assigned a course, it will appear here.{" "}
          <Link className="browse" to="/">
            <span> Browse now. </span>{" "}
          </Link>{" "}
        </p>
      )}{" "}
    </div>
  );
}

export default MyCourses;

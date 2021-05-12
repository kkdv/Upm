import React, { useEffect, useState } from "react";
import MyCoursesItem from "./MyCoursesItem";
import "./MyCourses.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";

function MyCourses() {
  // const myCourses = useSelector((state) => state.courses.courses);
  // const userEmail = useSelector((state) => state.user.userData);
  const courseItem = useSelector((state) => state.cart.courseItem);
  const [myCourses, setmyCourses] = useState();
  const [loading, setloading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setloading(true);
      const response = await axios.get(
        "http://localhost:5000/api/mycourses/get"
      );
      console.log(response);
      await setmyCourses(response.data);
      setloading(false);
    }
    fetchData();
  }, [courseItem]);

  return (
    <div>
      <div className="myCourses__top">
        <h3>My Learning</h3>
      </div>
      <div className="myCourses__info">
        {myCourses &&
          myCourses.map((item) => (
            <MyCoursesItem
              _id={item._id}
              imageURL={item.imageURL}
              title={item.title}
              author={item.author}
            />
          ))}
        {loading && (
          <div className="course__loader">
            <ClipLoader loading={loading} size={60} color="#3c3b37" />
          </div>
        )}
      </div>

      {myCourses && myCourses.length === 0 && (
        <p className="cannotfind">
          When you enroll in a course, it will appear here.
          <Link className="browse" to="/">
            <span> Browse now.</span>
          </Link>
        </p>
      )}
    </div>
  );
}

export default MyCourses;

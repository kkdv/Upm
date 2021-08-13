import { React, useEffect, useState } from "react";
import SearchList from "./SearchList";
import "./Search.css";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { List } from "react-content-loader";
import { useHistory } from "react-router";
import video_icon from "../../images/logo/lms/video_icon.png";
import pdf_icon from "../../images/logo/lms/PDF_icon.jpg";

function Search() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const isLogin = useSelector((state) => state.auth.isAuthenticated);
  const usertype = useSelector((state) => state.auth.usertype);
  const history = useHistory();

  useEffect(() => {
    fetchData();
    async function fetchData() {
      setLoading(true);
      //console.log("DEBUG: location.state.detail: " + location.state.detail);
      const response = await axios.get(
        `http://localhost:5000/api/course/find/${location.state.detail}`
      );
      setData(response.data.response);
      console.log("Search.js->" + JSON.stringify(response, null, "\t"));
      setLoading(false);
    }
  }, [location]);

  const mapCourse = (
    /*    <div
          className="searchcard"
          onClick={() => history.push(`/course/${props.id}`)}
        > */
    <div>
      {" "}
      {!loading && data ? (
        data.map((course) => {
          return (
            <SearchList
              key={course._id}
              id={course._id}
              title={course.title}
              image={course.imageURL}
              videoURL={
                isLogin && usertype === "I"
                  ? course.courseIncludes[0].videoURL
                  : course.courseIncludes[0].videoURL
              }
              docURL={
                isLogin && usertype === "I"
                  ? course.courseIncludes[1].docURL
                  : pdf_icon
              }
              description={course.description}
              author={course.author}
              stars={course.stars}
              noOfStudents={course.noOfStudents}
              currPrice={course.currPrice}
              orgPrice={course.orgPrice}
              bestSeller={course.bestSeller}
            />
          );
        })
      ) : (
        <List />
      )}{" "}
    </div>
  );

  return (
    <div>
      {" "}
      {mapCourse}{" "}
      {data && !loading && data.length === 0 && (
        <p className="cannotfind">
          Cannot find content for <br /> "{location.state.detail}"{" "}
        </p>
      )}{" "}
    </div>
  );
}

export default Search;

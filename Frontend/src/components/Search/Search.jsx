import { React, useEffect, useState } from "react";
import SearchList from "./SearchList";
import "./Search.css";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { List } from "react-content-loader";
//import video_icon from "../../images/logo/lms/video_icon.png";
import pdf_icon from "../../images/logo/lms/PDF_icon.jpg";

function Search() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const isLogin = useSelector((state) => state.auth.isAuthenticated);
  const usertype = useSelector((state) => state.auth.usertype);
  //const history = useHistory();
  const api_host = process.env.REACT_APP_API_HOST;
  useEffect(() => {
    fetchData();
    async function fetchData() {
      setLoading(true);
      //console.log("DEBUG: location.state.detail: " + location.state.detail);
      const response = await axios.get(
        `https://${api_host}:5443/api/course/find/${location.state.detail}`
      );
      setData(response.data.response);
      //console.log("Search.js->" + JSON.stringify(response, null, "\t"));
      setLoading(false);
    }
  }, [location]);

  return (
    <div>
      <div className="myCourses__top">
        <h3> Available Courses on {location.state.detail} </h3>
      </div>
      <div className="myCourses__info">
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
        )}
      </div>
      {data && !loading && data.length === 0 && (
        <p className="cannotfind">
          Cannot find course content for <br /> "{location.state.detail}"
        </p>
      )}
    </div>
  );
}

export default Search;

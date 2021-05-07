import { React, useEffect, useState } from "react";
import SearchList from "./SearchList";
import "./Search.css";
import { useLocation } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import axios from "axios";

function Search() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/course/find/${location.state.detail}`)
      .then(
        (response) => {
          setData(response.data.response);
        },
        (error) => {
          console.log(error);
        }
      );
    setLoading(false);
  }, [location]);

  const mapCourse = (
    <div>
      {!loading && data ? (
        data.map((course) => {
          return (
            <SearchList
              key={course._id}
              id={course._id}
              title={course.title}
              image={course.imageURL}
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
        <div className="course__loader">
          <ClipLoader loading={loading} size={60} color="#3c3b37" />
        </div>
      )}
    </div>
  );

  return (
    <div>
      {location.data}
      {mapCourse}
      {data && !loading && data.length === 0 && (
        <p className="cannotfind">
          Sorry, we couldn't find any results for <br />"{location.state.detail}
          "
        </p>
      )}
    </div>
  );
}

export default Search;

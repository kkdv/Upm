import { React, useEffect, useState } from "react";
import SearchList from "./SearchList";
import "./Search.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { List } from "react-content-loader";

function Search() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    fetchData();
    async function fetchData() {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/api/course/find/${location.state.detail}`
      );
      setData(response.data.response);
      setLoading(false);
    }
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
        <List />
      )}
    </div>
  );

  return (
    <div>
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

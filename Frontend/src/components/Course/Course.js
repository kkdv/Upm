import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CourseTop from "./CourseTop";
import CourseHeader from "./CourseHeader";
import "./Course.scss";

import { ClipLoader } from "react-spinners";
import { ReactComponent as Tick } from "../../images/logo/tick.svg";
import CourseCard from "./CourseCard";
import { useDispatch, useSelector } from "react-redux";
import { getSingalCourse } from "../../app/actions/courseAction";

const Course = () => {
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const [loading, setLoading] = useState(true);

  const courses = useSelector((state) => state.courses.activeCourse);

  useEffect(() => {
    dispatch(getSingalCourse(courseId));
    setLoading(false);
  }, [dispatch, courseId]);

  return (
    <div className="course">
      {!loading ? (
        <>
          <CourseHeader data={courses} />
          {<CourseTop data={courses} />}
          <div className="course__body">
            <div className="course__left">
              <div className="course__includes">
                <h3>What you'll learn</h3>
                <div className="course__points">
                  <ul>
                    {courses?.learn?.map((point, index) => (
                      <li key={index}>
                        <Tick />
                        <p>{point}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="course__audience">
                <h3>Who this course is for: </h3>
                <ul>
                  {courses?.audience?.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
            {<CourseCard data={courses} />}
          </div>
        </>
      ) : (
        <div className="course__loader">
          <ClipLoader size={60} color="#3c3b37" />
        </div>
      )}
    </div>
  );
};

export default Course;

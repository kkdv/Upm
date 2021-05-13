import { useEffect, useState } from "react";
import Card from "./Card";
import "./Row.css";
import ItemsCarousel from "react-items-carousel";
import { useDispatch, useSelector } from "react-redux";
import { getCourses, getFilteredCourses } from "../app/actions/courseAction";
import { List } from "react-content-loader";

const Row = ({ title, description, category }) => {
  const dispatch = useDispatch();
  const { courses, loading, filteredCourse } = useSelector(
    (state) => state.courses
  );

  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;

  useEffect(() => {
    dispatch(getCourses());
    dispatch(getFilteredCourses(category));
  }, [dispatch, category]);
  const cardsJsx = courses.map((course) => (
    <Card key={course._id} data={course} />
  ));
  const filteredCardsJsx = filteredCourse.map((course) => (
    <Card key={course._id} data={course} />
  ));

  return (
    <div className="mainRow">
      <div className="row">
        <h3>{category ? title + category : title}</h3>
        {description && <p>{description}</p>}
      </div>
      {!loading ? (
        <ItemsCarousel
          requestToChangeActive={setActiveItemIndex}
          activeItemIndex={activeItemIndex}
          numberOfCards={5}
          gutter={20}
          slidesToScroll={4}
          leftChevron={<button className="carousel__button_left">{"<"}</button>}
          rightChevron={
            <button className="carousel__button_right">{">"}</button>
          }
          outsideChevron
          chevronWidth={chevronWidth}
        >
          {category ? filteredCardsJsx : cardsJsx}
        </ItemsCarousel>
      ) : (
        <List />
      )}
    </div>
  );
};

export default Row;

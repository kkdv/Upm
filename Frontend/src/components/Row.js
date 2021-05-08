import { useEffect, useState } from "react";
import Card from "./Card";
import "./Row.css";
import ItemsCarousel from "react-items-carousel";
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "../app/actions/courseAction";
import { List } from "react-content-loader";

const Row = ({ title, description }) => {
  const dispatch = useDispatch();
  const { courses, loading } = useSelector((state) => state.courses);

  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);
  const cardsJsx = courses.map((course) => (
    <Card key={course._id} data={course} />
  ));

  return (
    <div className="mainRow">
      <div className="row">
        <h3>{title}</h3>
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
          {courses && cardsJsx}
        </ItemsCarousel>
      ) : (
        <List />
      )}
    </div>
  );
};

export default Row;

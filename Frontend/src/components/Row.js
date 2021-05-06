import { useEffect, useState } from "react";
import Card from "./Card";
import "./Row.css";
import ItemsCarousel from "react-items-carousel";
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "../app/actions/courseAction";
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/core";

const Row = ({ title, description }) => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.courses);

  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [loading, setloading] = useState(true);
  const chevronWidth = 40;

  useEffect(() => {
    dispatch(getCourses());
    setloading(false);
  }, [dispatch]);
  const cardsJsx = courses.map((course) => (
    <Card key={course._id} data={course} />
  ));

  //loader style
  const override = css`
    display: block;
    margin: 0 auto;
  `;

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
        <div className="course__loader">
          <ClipLoader size={20} css={override} color="#3c3b37" />
        </div>
      )}
    </div>
  );
};

export default Row;

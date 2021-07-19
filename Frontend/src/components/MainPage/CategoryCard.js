import React from "react";
import { useHistory } from "react-router";
import "./CategoryCard.css";

function CategoryCard(props) {
  const history = useHistory();

  const onCardClickHandler = () => {
    history.push({
      pathname: `/search`,
      search: `?category=${props.title}`,
      state: { detail: props.title },
    });
  };

  return (
    <div className="categoryCard" onClick={onCardClickHandler}>
      <img
        src={props.imgSrc}
        alt={props.title + " img"}
        className="categoryImg"
      ></img>
      <h3 className="categoryTitle">{props.title}</h3>
    </div>
  );
}

export default CategoryCard;

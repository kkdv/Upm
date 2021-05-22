import React from "react";
import "./SearchList.css";

import { useHistory } from "react-router";

function SearchList(props) {
  const history = useHistory();

  return (
    <div>
      <div
        className="searchcard"
        onClick={() => history.push(`/course/${props.id}`)}
      >
        <div className="searchcard__image">
          <div className="searchcard__imageWrapper"></div>
          <img
            src={props.image}
            alt="2021 Complete Python Bootcamp From Zero to Hero in Python"
          />
        </div>
        <div className="searchcard__info">
          <h3>{props.title}</h3>
          <h4>{props.description}</h4>
          <small>{props.author}</small>
          <p className="searchcard__starContainer">
            <strong>
              <span className="searchcard__rating">{props.stars}</span>
            </strong>
            <span className="searchcard__star">⭐</span>
            <span className="searchcard__noBuys">({props.noOfStudents})</span>
          </p>
          {props.bestSeller ? (
            <div className="bestSeller">Bestseller</div>
          ) : null}
        </div>
        <div className="searchcard__priceinfo">
          <p className="searchcard__price">
            <span className="searchcard__currentPrice">
              <strong>&#36;{props.currPrice}</strong>
            </span>
            <span className="searchcard__originalPrice">
            &#3;{props.orgPrice}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SearchList;

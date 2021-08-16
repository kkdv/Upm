import React from "react";
import "./SearchList.css";

import { useHistory } from "react-router";
import VideoPlayer from "../MainPage/VideoPlayer";
import PDFLogo from "../../images/logo/lms/PDF_icon.jpg";

function SearchList(props) {
  const history = useHistory();

  return (
    <div
      className="searchcard"
      onClick={() => history.push(`/course/${props.id}`)}
    >
      <div className="searchcard__info">
        <p className="searchcard__title"> {props.title} </p>
        <p className="searchcard__title"> {props.description} </p>
        <p className="searchcard__author"> {props.author} </p>
        <p className="searchcard__starContainer">
          <strong>
            <span className="searchcard__rating"> {props.stars} </span>
          </strong>
          <span className="searchcard__star"> ⭐ </span>
          <span className="searchcard__noBuys"> ({props.noOfStudents}) </span>
        </p>
        {props.bestSeller ? (
          <div className="bestSeller"> Bestseller </div>
        ) : null}
      </div>
      <div className="searchcard__info">
        <VideoPlayer
          videoURL={props.videoURL}
          title={props.title}
          height={340}
          width={440}
        />
      </div>
      <div className="searchcard__info">
        <div className="searchcard__image">
          <div className="searchcard__image">
            <img
              className="searchcard__image"
              alt="Document"
              src={PDFLogo}
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchList;

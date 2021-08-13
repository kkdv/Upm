import React from "react";
import "./SearchList.css";

import { useHistory } from "react-router";
import VideoAd from "../MainPage/VideoAd";
import PDFLogo from "../../images/logo/lms/PDF_icon.jpg";

function SearchList(props) {
  const history = useHistory();

  const openInNewTab = (url) => {
    const newWindow = window.open(
      url,
      "_blank",
      "noopener,noreferrer,height=100,width=100"
    );
    if (newWindow) newWindow.opener = null;
  };

  return (
    <div
      className="searchcard"
      onClick={() => history.push(`/course/${props.id}`)}
    >
      <div className="searchcard__info">
        <h2> {props.title} </h2> <h4> {props.description} </h4> <p></p>
        <small> {props.author} </small>
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
        <VideoAd
          videoURL={props.videoURL}
          title={props.title}
          height={440}
          width={540}
        />
      </div>
      <div className="searchcard_image">
        <img
          className="myCoursesItem__image"
          alt="Document"
          src={PDFLogo}
        ></img>
      </div>
    </div>
  );
}

export default SearchList;

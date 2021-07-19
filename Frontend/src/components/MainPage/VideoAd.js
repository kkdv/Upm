import React from "react";
import "./VideoAd.css";

function VideoAd(props) {
  return (
    <div className="videoAdDiv">
      <div className="videoDiv">
        <iframe
          title={props.title}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen=""
          src={props.docURL}
          width="260"
          height="215"
          frameBorder="0"
        ></iframe>
      </div>
      {/* <div className="content">
        <h2 className="heading">Transform your life through education</h2>
        <p className="about">
          Mohamad Alaloush launched a new career in software development by
          taking courses on Udemy. What will you be able to do?
        </p>
      </div> */}
    </div>
  );
}

export default VideoAd;

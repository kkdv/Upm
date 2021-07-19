import React from "react";
import "./VideoAd.css";

function VideoAd(props) {
  return (
    <div className="videoAdDiv">
      <div className="videoDiv content">
        <iframe
          title={props.title}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen=""
          src={props.docURL}
          frameBorder="0"
          height="300"
          width="300"
        ></iframe>
      </div>
    </div>
  );
}

export default VideoAd;

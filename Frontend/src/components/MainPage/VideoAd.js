import React, { useEffect, useState } from "react";
import "./VideoAd.css";
import "../MainPage/Header";

function VideoAd(props) {
  return (
    <div>
      <div className="videoAdDiv">
        <div className="videoDiv content">
          <iframe
            title={props.title}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; enablejsapi"
            allowFullScreen="true"
            src={props.videoURL}
            frameBorder="0"
            height={props.height}
            width={props.width}
          ></iframe>
          <div>
            {/*  <video
              id="vid1"
              className="video-js vjs-default-skin"
              controls
              autoPlay
              width="640"
              height="264"
              data-setup='{ "techOrder": ["youtube"], "sources": [{ "type": "video/youtube", "src": "https://www.youtube.com/watch?v=xjS6SftYQaQ"}], "youtube": { "ytControls": 2 } }'
            ></video> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoAd;

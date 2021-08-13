import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./VideoAd.css";
import "../MainPage/Header";

function VideoAd(props) {
  const gvt = () => {
    //console.log("props=" + props.videoURL);
    const youtube_video_id = props.videoURL
      .match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/)
      .pop();

    if (youtube_video_id.length === 11) {
      const video_thumbnail =
        "https://img.youtube.com/vi/" + youtube_video_id + "/0.jpg";
      return video_thumbnail;
    }
  };
  const imgURL = gvt(); // get Youtube thumbnail image
  const isEnrolled = useSelector((state) => state.auth.isEnrolled);

  return (
    <div className="videoAdDiv" onClick={() => gvt(props.videoURL)}>
      <div className="videoDiv content">
        {props.isEnrolled && (
          <iframe
            className="iframe1"
            title={props.title}
            allow="accelerometer; autoplay; encrypted-media; gyroscope;picture-in-picture; enablejsapi; controls"
            allowFullScreen={true}
            src={props.videoURL}
            frameBorder="0"
            height={props.height}
            width={props.width}
          ></iframe>
        )}

        {!props.isEnrolled && (
          <img
            height={props.height / 2}
            width={props.width / 2}
            alt="video"
            src={imgURL}
          ></img>
        )}
        <div>
          {/*  
          <iframe
            className="iframe1"
            title={props.title}
            allow="accelerometer; autoplay; encrypted-media; gyroscope;picture-in-picture; enablejsapi; controls=1"
            allowFullScreen={true}
            src={props.videoURL}
            frameBorder="0"
            height={props.height}
            width={props.width}
          ></iframe>
          <video
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
  );
}

export default VideoAd;

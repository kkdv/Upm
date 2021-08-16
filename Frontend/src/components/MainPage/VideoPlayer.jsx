import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./VideoPlayer.css";
import "./Header";
import VideoJS from "./Videojs";

function VideoPlayer(props) {
  const gvt = () => {
    //return "fakeimage.jpg";
    let video_array = [];
    var regExp =
      /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (props.videoURL.match(regExp)) {
      if (props.videoURL.length < 11) {
        return "not found";
      }
      //console.log("props=" + props.videoURL);
      const youtube_video_id = props.videoURL
        .match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/)
        .pop();

      if (youtube_video_id.length === 11) {
        video_array[0] = props.videoURL
        video_array[1] = "video/youtube";
        video_array[2] =
          "https://img.youtube.com/vi/" + youtube_video_id + "/0.jpg";
      }
    } else {
      video_array[0] = props.videoURL;
      video_array[1] = "video/mp4";
      video_array[2] = "Thumbnail image";
    }
    return video_array;
  };
  const [videoURL, videoType, thumbnailURL] = gvt(); // get Youtube thumbnail image

  //alert(imgType + ":" + imgURL);

  const videoJsOptions = {
    // lookup the options in the docs for more options
    //autoplay: true,
    playbackRates: [0.5, 1, 1.5, 2],
    height: props.height,
    width: props.width,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: videoURL,
        type: videoType,
      },
    ],
  };

  return (
    <div>
      {props.isEnrolled && (
        <div className="content" onClick={() => gvt(props.videoURL)}>
          <VideoJS options={videoJsOptions} />

          {/* <iframe
            className="iframe1"
            title={props.title}
            allow="accelerometer; autoplay; encrypted-media; gyroscope;picture-in-picture; enablejsapi; controls"
            src={props.videoURL}
            frameBorder="0"
            height={props.height}
            width={props.width}
          ></iframe> */}
        </div>
      )}
      {!props.isEnrolled && (
        <img
          height={props.height / 2}
          width={props.width / 2}
          alt={thumbnailURL}
          src={thumbnailURL}
        ></img>
      )}
    </div>
  );
}

export default VideoPlayer;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./VideoPlayer.css";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-youtube/dist/Youtube.min.js";
import "@devmobiliza/videojs-vimeo/dist/videojs-vimeo.cjs";

export const VideoJS = (props) => {
  const videoRef = React.useRef(null);
  const { options } = props;

  // This seperate functional component fixes the removal of the videoelement
  // from the DOM when calling the dispose() method on a player
  const VideoHtml = (props) => (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-big-play-centered" />
    </div>
  );

  useEffect(() => {
    const videoElement = videoRef.current;
    let player;
    if (videoElement) {
      player = videojs(videoElement, options, () => {
        console.log("player is ready");
      });
    }
    return () => {
      if (player) {
        player.dispose();
      }
    };
  }, [options]);

  return <VideoHtml />;
};

export default VideoJS;

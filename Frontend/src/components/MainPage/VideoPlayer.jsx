import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-youtube/dist/Youtube.min.js";
import "@devmobiliza/videojs-vimeo/dist/videojs-vimeo.cjs";
import "./VideoPlayer.css";

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

function VideoPlayer(props) {
  const gvt = () => {
    let video_array = [];

    //const rExp =
    // "/^(?:https?://)?(?:m.|www.)?(?:youtu.be/|youtube.com/(?:embed/|v/|watch?v=|watch?.+&v=))((w|-){11})(?:S+)?$/";

    //"/^http://(?:.*?).?(youtube|vimeo).com/(watch?[^#]*v=(w+)|(d+)).+$/";

    // "(https?://)www.(youtube.com/watch[?]v=([a-zA-Z0-9_-]{11}))|https?://(www.)?vimeo.com/([0-9]{9})/g"
    // new RegExp(
    //"/^(?:https?://)?(?:m.|www.)?(?:youtu.be/|youtube.com/(?:embed/|v/|watch?v=|watch?.+&v=))((w|-){11})(?:S+)?$/"
    // "(https?:\\/\\/)www.(youtube.com\\/watch[?]v=([a-zA-Z0-9_-]{11}))|https?:\\/\\/(www.)?vimeo.com\\/([0-9]{9})"
    //"/^http://(?:.*?).?(youtube|vimeo).com/(watch?[^#]*v=(w+)|(d+)).+$/"
    //);
    //const re = props.videoURL.match(rExp);

    if (props.videoURL.includes("youtube")) {
      const regExp =
        /(http:|https:|)\/\/(player.|www.|m.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/;
      // "/^(?:https?://)?(?:m.|www.)?(?:youtu.be/|youtube.com/(?:embed/|v/|watch?v=|watch?.+&v=))((w|-){11})(?:S+)?$/";

      if (props.videoURL.length < 11) {
        return "not found";
      }
      //console.log("props=" + props.videoURL);
      const youtube_video_id = props.videoURL
        .match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/)
        .pop();

      video_array[0] = props.videoURL;
      video_array[1] = "video/youtube";
      video_array[2] =
        "https://img.youtube.com/vi/" + youtube_video_id + "/0.jpg";
    } else if (props.videoURL.includes("vimeo")) {
      const regExp =
        /(http:|https:|)\/\/(player.|www.|m.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/;
      const vimeo_video_id = props.videoURL

        .match(/vimeo\.com.*(\/)(.{9})/)
        .pop();
      video_array[0] = props.videoURL;
      video_array[1] = "video/vimeo";
      axios
        .get("https://vimeo.com/api/v2/video/" + vimeo_video_id + ".json")
        .then((rs) => {
          const vimeo_data = JSON.parse(rs);
          video_array[2] =
            vimeo_data[0].thumbnail_large !== null
              ? vimeo_data[0].thumbnail_large
              : "Vimeo thumbnail";
        })
        .catch((err) => {
          video_array[2] = "Vimeo thumbnail" + err;
        });
    } else if (props.videoURL.includes("mp4")) {
      video_array[0] = props.videoURL;
      video_array[1] = "video/mp4";
      video_array[2] = "MP4 thumbnail image";
    }
    return video_array;
  };

  const [videoURL, videoType, thumbnailURL] = gvt(); // get Youtube thumbnail image

  //console.log(videoType + ":" + thumbnailURL);

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

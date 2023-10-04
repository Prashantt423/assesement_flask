import React from "react";
import ReactHlsPlayer from "react-hls-player";

function VideoFeed({ src }) {
  const playerRef = React.useRef();

  function playVideo() {
    playerRef.current.play();
  }

  function pauseVideo() {
    playerRef.current.pause();
  }

  function toggleControls() {
    playerRef.current.controls = !playerRef.current.controls;
  }

  return (
    <ReactHlsPlayer
      playerRef={playerRef}
      controls={true}
      //   src="https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"
      src={src}
    />
  );
}

export default VideoFeed;

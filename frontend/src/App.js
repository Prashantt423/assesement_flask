import React, { useState, useEffect } from "react";
import VideoFeed from "./videoFeed";
import axios from "axios";
function App() {
  const [overlaySettings, setOverlaySettings] = useState([]);
  const [isStarted, setIsStarted] = useState(false);
  const [url, setUrl] = useState("");
  const [newOverlay, setNewOverlay] = useState({
    positionX: 0,
    positionY: 0,
    size: 20,
    content: "Your text or logo here",
    fontColor: "white",
  });
  const server_url = "http://localhost:5000";
  const [rtspStreamUrl, setRtspStreamUrl] = useState();

  const fetchOverlays = () => {
    fetch(server_url + "/overlays")
      .then((response) => response.json())
      .then((data) => setOverlaySettings(data[0]));
  };
  useEffect(() => {
    fetchOverlays();
  }, []);

  const handleCreateOverlay = () => {
    // Send a POST request to create a new overlay
    fetch(server_url + "/overlays", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newOverlay),
    })
      .then((response) => response.json())
      .then(() => {
        // Refresh overlay settings after creation
        fetchOverlays();
      });
  };

  const handleDeleteOverlay = (id) => {
    // Send a DELETE request to delete an overlay
    fetch(server_url + `/overlays/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        // Refresh overlay settings after deletion
        fetch("/overlays")
          .then((response) => response.json())
          .then((data) => setOverlaySettings(data));
      });
  };
  function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
      end = new Date().getTime();
    }
  }
  const handleStartStream = async () => {
    console.log(rtspStreamUrl);
    if (!Boolean(rtspStreamUrl)) {
      console.log("Invalid url");
      return;
    }
    const res = await axios.get(
      server_url + `/livestream?action=start&url=${rtspStreamUrl}`
    );
    if (res.status === 200) {
      console.log("Stream started successfully!");
      // wait for 5s
      wait(30000);
      setIsStarted(true);
    }
  };
  const handleStopStream = async () => {
    const res = await axios.get(server_url + "/livestream?action=stop");
    if (res.status === 200) {
      console.log("Stream stopped successfully!");
      setIsStarted(false);
    }
  };

  const handleUrl = (e) => {
    console.log(e);
    setRtspStreamUrl(e.target.value);
  };

  return (
    <div>
      <h1>RTSP Livestream Player with Overlays</h1>
      <div>
        <input
          type="text"
          onChange={handleUrl}
          placeholder="Type url to RTSP video"
        />
        <button onClick={handleStartStream}>Start Stream</button>
        <button onClick={handleStopStream}>Stop Stream</button>
      </div>

      <div
        className="video-container"
        style={{
          position: "relative",
        }}
      >
        {/* React Player for displaying the HLS livestream */}
        {isStarted ? (
          <VideoFeed src={server_url + "/video/stream"} controls />
        ) : (
          <h3>Stream is not live..</h3>
        )}
        {isStarted && (
          <div
            className="overlay"
            style={{
              position: "absolute",
              zIndex: "100",
              width: "20%",
              height: "20%",
              top: overlaySettings.positionY + "px",
              left: overlaySettings.positionX + "px",
              color: overlaySettings.fontColor,
            }}
          >
            {overlaySettings.content}
          </div>
        )}
      </div>

      <h2>Overlay Settings</h2>

      <h3>Create Overlay</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        Position X:{" "}
        <input
          type="text"
          value={newOverlay.positionX}
          onChange={(e) =>
            setNewOverlay({ ...newOverlay, positionX: e.target.value })
          }
        />
        Position Y:{" "}
        <input
          type="text"
          value={newOverlay.positionY}
          onChange={(e) =>
            setNewOverlay({ ...newOverlay, positionY: e.target.value })
          }
        />
        Size:{" "}
        <input
          type="text"
          value={newOverlay.size}
          onChange={(e) =>
            setNewOverlay({ ...newOverlay, size: e.target.value })
          }
        />
        Content:{" "}
        <input
          type="text"
          value={newOverlay.content}
          onChange={(e) =>
            setNewOverlay({ ...newOverlay, content: e.target.value })
          }
        />
        Font Color:{" "}
        <input
          type="text"
          value={newOverlay.fontColor}
          onChange={(e) =>
            setNewOverlay({ ...newOverlay, fontColor: e.target.value })
          }
        />
        <button onClick={handleCreateOverlay}>Create Overlay</button>
      </div>
    </div>
  );
}

export default App;

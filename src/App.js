import "./App.scss";
import React, { useState } from "react";
import { Player } from "./components/Player/Player";

const App = () => {
  const [playerDataObject, setPlayerDataObject] = useState({
    mediatailor: {},
    channelassembly: {},
  });

  const [urls, setUrls] = useState({
    mediatailor: "",
    channelassembly: "",
  });

  const [playbackurls, setPlaybackUrls] = useState({
    mediatailor: "",
    channelassembly: "",
  });

  const handleStartClick = (event) => {
    const { value, name } = event.target;
    if (playerDataObject) {
      playerDataObject[name].play();
    }
  };

  const handleStopClick = (event) => {
    const { value, name } = event.target;
    if (playerDataObject) {
      playerDataObject[name].pause();
    }
  };

  const handlePlayerRefUpdate = (playerRef) => {
    setPlayerDataObject({ ...playerDataObject, [playerRef.id_]: playerRef });
  };

  const onInputChange = (event) => {
    const { value, name } = event.target;
    setUrls({ ...urls, [name]: value });
  };

  const onButtonClick = (event) => {
    const { value, name } = event.target;
    let key = name + 'Url';

    playerDataObject[name].src(urls[key]);
  };

  return (
    <div className="video-player-container">
      <div className="left-video-player">
        <h1>Channel Assembly</h1>
        <div className="video-player">
          <Player
            options={{
              id: "channelassembly",
              src:
                "https://a6147787aa566c372cc8b596d98bb894.p05sqb.channel-assembly.mediatailor.us-west-2.amazonaws.com/v1/channel/blender/blender.m3u8",
              autoplay: true,
              preload: "auto",
              controls: true,
              width: "640",
              height: "360",
            }}
            playerRef={handlePlayerRefUpdate}
          ></Player>
          <div className="controls">
            <div class="ui fluid icon input">
              <button
                name="channelassembly"
                class="ui button"
                onClick={onButtonClick}
              >
                Load
              </button>

              <input
                onChange={onInputChange}
                name="channelassemblyUrl"
                type="text"
                placeholder="Channel Assembly playback url..."
              />
            </div>
            <div className="buttons">
              <button class="ui button" name="channelassembly" onClick={handleStopClick}>
                Stop
              </button>
              <button class="ui button" name="channelassembly" onClick={handleStartClick}>
                Play
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="right-video-player">
        <h1>Media Tailor </h1>
        <div className="video-player ui video">
          <Player
            options={{
              id: "mediatailor",
              src:
                "https://53763fffbfee48248df08b4a039e4366.mediatailor.us-west-2.amazonaws.com/v1/master/f7445d658014c395c5cb4da59a944aa82a31d187/ca_blender/blender.m3u8",
              autoplay: true,
              preload: "auto",
              controls: true,
              width: "640",
              height: "360",
            }}
            playerRef={handlePlayerRefUpdate}
          ></Player>

          <div className="controls">
            <button 
              name="mediatailor"
              class="ui button"
              onClick={onButtonClick}
              >Load
            </button>

            <div class="ui fluid icon input">
              <input
                onChange={onInputChange}
                name="mediatailorUrl"
                type="text"
                placeholder="MediaTailor playback url..."
              />
            </div>
            <div className="buttons">
              <button class="ui button" name="mediatailor" onClick={handleStopClick}>
                Stop
              </button>
              <button class="ui button" name="mediatailor" onClick={handleStartClick}>
                Play
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

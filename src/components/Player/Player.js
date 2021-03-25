import React from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-contrib-hls.js";
import PropTypes from "prop-types";
import "./Player.scss";

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.cueInt = null;
    this.player = null;
  }

  componentDidMount() {
    let stateRef = this;

    this.player = videojs(this.videoNode, this.props.options);
    this.player.ready(function () {
      let player = this;
      let trackIndex = -1;

      stateRef.props.playerRef(player);

      // player.textTracks().addEventListener(
      //   "change",
      //   function (addTrackEvent) {
      //     trackIndex += 1;
      //     if (this.cueInt) clearInterval(this.cueInt);
      //     if (player.textTracks().length <= 0) return;
      //     track = player.textTracks()[trackIndex];

      //     if (track) {
      //       let cueChangeCb = function (cueChangeEvent) {
      //         if (track.activeCues) {
      //           if (track.activeCues.length <= 0) return; // there is not active metadata at the moment.
      //           title = album = composer = url = "";
      //           for (
      //             let cueIdx = 0;
      //             cueIdx < track.activeCues.length;
      //             ++cueIdx
      //           ) {
      //             let cue = track.activeCues[cueIdx];

      //             let frame = cue.value;
      //             console.log(frame)
      //             switch (frame.key) {
      //               case "TIT2":
      //                 title = frame.data;
      //                 break;
      //               case "TPE1":
      //                 artist = frame.data;
      //                 break;
      //               case "TALB":
      //                 album = frame.data;
      //                 break;
      //               case "TCOM":
      //                 composer = frame.data;
      //                 break;
      //               case "WXXX":
      //                 url = frame.url;
      //                 break;
      //             }
      //             stateRef.props.callbackFunc({
      //               title: title,
      //               artist: artist
      //             });
      //           }
      //         }
      //       };

      //       if (track.oncuechange !== undefined) {
      //         track.addEventListener("cuechange", cueChangeCb, false);
      //       } else {
      //         // workaround for https://bugzilla.mozilla.org/show_bug.cgi?id=1033144
      //         this.cueInt = window.setInterval(cueChangeCb, 1000);
      //       }
      //     }
      //   },
      //   false
      // );
    });
  }

  componentWillUnmount() {
    if (this.cueInt) clearInterval(this.cueInt);
    // if (this.player) {
    //   this.player.dispose();
    // }
  }

  componentDidCatch(error, info) {
    console.log("error catch");
  }

  render() {
    return (
      <div className="player">
        <div data-vjs-player>
          <video ref={(node) => (this.videoNode = node)} className="video-js">
            <source
              src={this.props.options.src}
              type={this.props.options.type}
            />
          </video>
        </div>
      </div>
    );
  }
}

Player.propTypes = {
  callbackFunc: PropTypes.func,
  playerRef: PropTypes.func,
};

export { Player };

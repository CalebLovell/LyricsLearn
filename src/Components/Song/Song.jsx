import React, { Component } from "react";
import "./Song.css";

class Song extends Component {
  render() {
    return (
      <div className="song-page">
        <div className="song-page-top-banner">
          <div className="song-page-display-box">
            <div className="album-art-box">
              <img
                src="https://pixy.org/images/placeholder.png"
                alt="album art"
              />
            </div>
            <div className="song-details-box">
              <h1>Song Title</h1>
              <h4>Artist Name</h4>
              <p>Choose a Language Below</p>
              <button>Language</button>
            </div>
          </div>
        </div>
        <div className="explanation-box" />
      </div>
    );
  }
}

export default Song;

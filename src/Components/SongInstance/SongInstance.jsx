import React from "react";
import "./SongInstance.scss";

function SongInstance(props) {
  return (
    <div className="song-instance-box">
      <div
        className="art-box"
        style={{ backgroundImage: `url(${props.song.song_instance_art})` }}
      />
      <div className="song-instance-descriptions-box">
        <h5>{props.song.song_instance_title}</h5>
        <h6>{props.song.artist_name}</h6>
      </div>
    </div>
  );
}

export default SongInstance;

import React from "react";
import "./SongInstance.scss";
import { Link } from "react-router-dom";

function SongInstance(props) {
  return (
    <div className="song-instance-box">
      <Link to={`/song/${props.song.song_instance_id}`}>
        <div
          className="art-box"
          style={{ backgroundImage: `url(${props.song.song_instance_art})` }}
        />
      </Link>

      <div className="song-instance-descriptions-box">
        <Link to={`/song/${props.song.song_instance_id}`}>
          <h5>{props.song.song_instance_title}</h5>
        </Link>

        <h6>{props.song.artist_name}</h6>
        {props.userID && (
          <button
            className="song-delete-button"
            onClick={() => props.deleteSongInstance(props.song.song_instance_id)}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default SongInstance;

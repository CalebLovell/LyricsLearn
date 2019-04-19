import React, { Component } from "react";
import "./Song.css";
import { connect } from "react-redux";
import { getUserData, killUser } from "./../../ducks/userReducer";
import axios from 'axios';

class Song extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songArt: "",
      songTitle: "",
      artistName: "",
      userName: "",
      languageName: ""
    };
  }

  componentDidMount() {
    this.getSongInfo();
  }

  getSongInfo = async (id) => {
    await axios
      .get(`/song/${id}`)
  }

  render() {
    return (
      <div className="song-page">
        <div className="song-page-top-banner">
          <div className="song-page-display-box">
            <div className="album-art-box">
              <img
                src={`${this.state.songArt}`}
                alt="album art"
              />
            </div>
            <div className="song-details-box">
              <h1>Song Title{this.state.songTitle}</h1>
              <h4>Artist Name{this.state.artistName}</h4>
              <h4>User Author Name{this.state.userName}</h4>
              <p>Choose a Language Below</p>
              <div>Flag</div>
              <button>Language{this.state.languageName}</button>
            </div>
          </div>
        </div>
        <div className="explanation-box" />
      </div>
    );
  }
}

const mapState = reduxState => reduxState;

export default connect(
  mapState,
  { getUserData, killUser }
)(Song);

import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Landing.scss";
import { connect } from "react-redux";
import { getUserData } from "./../../ducks/userReducer";
import SongInstance from "../SongInstance/SongInstance";
import axios from "axios";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recentSongs: [],
      englishSongs: []
    };
  }

  componentDidMount = async () => {
    this.getSongs();
  };

  getSongs = async () => {
    try {
      const result = await axios.get(`/songs`);
      this.setState({
        recentSongs: result.data.recentSongs,
        englishSongs: result.data.englishSongs
      });
    } catch (err) {
      console.log(
        `The getSongs method on the Landing component had a problem: ${err}`
      );
    }
  };
  render() {
    let mappedRecentSongs = this.state.recentSongs.map((song, i) => {
      return (
        <Link to={`/song/${song.song_instance_id}`}>
          <SongInstance key={i} song={song} />
        </Link>
      );
    });
    let mappedEnglishSongs = this.state.englishSongs.map((song, i) => {
      return (
        <Link to={`/song/${song.song_instance_id}`}>
          <SongInstance key={i} song={song} />
        </Link>
      );
    });
    return (
      <div className="landing-page">
        <div className="top-banner">
          <div className="welcome-container">
            <h1>Welcome!</h1>
            <div className="buttons-container">
              <Link to="/login">
                <div className="lefty">
                  <button className="left-button">Login</button>
                </div>
              </Link>
              <Link to="/signup">
                <div className="righty">
                  <button className="right-button">Sign Up</button>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="main-banner one">
          <div className="main-banner-container">
            <h1>Most Recent Translations</h1>
            <div className="first-four-songs-container">
              {mappedRecentSongs}
            </div>
          </div>
        </div>
        <div className="main-banner two">
          <div className="main-banner-container">
            <h1>Popular Songs in English</h1>
            <div className="first-four-songs-container">
              {mappedEnglishSongs}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = reduxState => reduxState;

export default connect(
  mapState,
  { getUserData }
)(Landing);

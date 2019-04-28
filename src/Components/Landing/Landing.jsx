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
      userSongs: []
    };
  }

  componentDidMount = async () => {
    this.getRecentSongs();
  };

  getRecentSongs = async () => {
    try {
      const result = await axios.get(`/songs/recent`);
      this.setState({
        userSongs: result.data.recentSongs
      });
    } catch (err) {
      console.log(
        `The getRecentSongs method on the Landing component had a problem: ${err}`
      );
    }
  };
  render() {
    let mappedSongs = this.state.userSongs.map((song, i) => {
      return (
        <Link to={`/song/${song.song_instance_id}`}>
          <SongInstance key={i} song={song} />
        </Link>
      );
    });
    return (
      <div className="landing-page">
        <div className="top-banner">
          <div className="search-container">
            <h1>Welcome to LyricsLearn!</h1>
            <h1>
              Explore our song library below to start learning, or login to
              start contributing.
            </h1>
            <Link to="/signup">
              <button>Sign Up</button>
            </Link>
            <Link to="/login">
              <button>Login</button>
            </Link>
          </div>
        </div>
        <div className="main-banner">
          <div className="main-banner-organizer">
            <h1>Most Recent Translations</h1>
            <div className="first-four-songs-container">{mappedSongs}</div>
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

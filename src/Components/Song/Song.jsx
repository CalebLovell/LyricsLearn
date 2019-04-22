import React, { Component } from "react";
import "./Song.css";
import { connect } from "react-redux";
import { getUserData, killUser } from "./../../ducks/userReducer";
import axios from "axios";

class Song extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songArt: "",
      songTitle: "",
      artistName: "",
      userName: "",
      languageName: "",
      languageFlag: "",
      lineLyricsArr: [],
      lineExplanationArr: [],
      lineIndexArr: []
    };
  }

  componentDidMount() {
    this.getSongInfo();
  }

  getSongInfo = async () => {
    try {
      const { id } = this.props.match.params;
      const result = await axios.get(`/song/${id}`);
      const {
        song_instance_title,
        song_instance_art,
        user_name,
        language_name,
        artist_name,
        language_flag,
        line_lyrics,
        line_explanation,
        line_index
      } = result.data.songInstance[0];
      this.setState({
        songArt: song_instance_art,
        songTitle: song_instance_title,
        artistName: artist_name,
        userName: user_name,
        languageName: language_name,
        languageFlag: language_flag,
        lineLyricsArr: line_lyrics,
        lineExplanationArr: line_explanation,
        lineIndexArr: line_index
      });
    } catch (err) {
      console.log(
        `The getSongInfo method on the Profile component had a problem: ${err}`
      );
    }
  };

  render() {
    let mappedLineLyrics = this.state.lineLyrics.map((line, i) => {
      return (
        <div className="line-slot" key={i}>
          <p className="line-lyrics">{line.line_lyrics}</p>
        </div>
      );
    });
    return (
      <div className="song-page">
        <div className="song-page-top-banner">
          <div className="song-page-display-box">
            <div className="album-art-box">
              <img src={`${this.state.songArt}`} alt="album art" />
            </div>
            <div className="song-details-box">
              <h1>{this.state.songTitle}</h1>
              <h4>{this.state.artistName}</h4>
              <h5>{this.state.userName}</h5>
              <p>choose a language below</p>
              <div className="language-button-container">
                <div className="language-button">
                  <div className="language-flag-div">
                    <img src={this.state.languageFlag} alt="language flag" />
                  </div>
                  <span>{this.state.languageName}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lines-box">{mappedLineLyrics}</div>
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

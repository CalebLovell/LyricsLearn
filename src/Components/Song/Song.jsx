import React, { Component } from "react";
import "./Song.css";
import { connect } from "react-redux";
import { getUserData } from "./../../ducks/userReducer";
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
      songTranslationLanguages: [],
      songLines: [],
      songTranslation: []
    };
  }

  componentDidMount() {
    this.getSongInstance();
  }

  getSongInstance = async () => {
    try {
      const { songID } = this.props.match.params;
      const result = await axios.get(`/song/${songID}`);
      const {
        song_instance_title,
        song_instance_art,
        user_name,
        language_name,
        artist_name,
        language_flag
      } = result.data.songInfo[0];
      this.setState({
        songArt: song_instance_art,
        songTitle: song_instance_title,
        artistName: artist_name,
        userName: user_name,
        languageName: language_name,
        languageFlag: language_flag,
        songLines: result.data.songLines,
        songTranslationLanguages: result.data.songTranslationLanguages
      });
    } catch (err) {
      console.log(
        `The getSongInstance method on the Song component had a problem: ${err}`
      );
    }
  };

  getSongTranslation = async languageID => {
    try {
      const { songID } = this.props.match.params;
      const result = await axios.get(`/song/${songID}/${languageID}`);
      this.setState({
        songTranslation: result.data.songTranslation
      });
    } catch (err) {
      console.log(
        `The getSongTranslation method on the Song component had a problem: ${err}`
      );
    }
  };

  render() {
    let mappedLyrics = this.state.songLines.map((line, i) => {
      return (
        <div className="line-slot" key={i}>
          <p className="line-lyrics">{line.line_lyrics}</p>
        </div>
      );
    });
    let mappedTranslation = this.state.songTranslation.map((line, i) => {
      return (
        <div className="line-slot" key={i}>
          <p className="line-lyrics">{line.line_translation_lyrics}</p>
        </div>
      );
    });
    let mappedLanguages = this.state.songTranslationLanguages.map(
      (translationLanguage, i) => {
        return (
          <div
            className="language-button"
            key={i}
            onClick={() => this.getSongTranslation(translationLanguage.language_id)}
          >
            <div className="language-flag-div">
              <img
                src={translationLanguage.language_flag}
                alt="language flag"
              />
            </div>
            <span>{translationLanguage.language_name}</span>
          </div>
        );
      }
    );
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
              <div className="language-button-container">{mappedLanguages}</div>
            </div>
          </div>
        </div>
        <div className="lyrics-box">{mappedLyrics}</div>
        <div className="translation-box">{mappedTranslation}</div>
        <div className="explanation-box" />
      </div>
    );
  }
}

const mapState = reduxState => reduxState;

export default connect(
  mapState,
  { getUserData }
)(Song);

import React, { Component } from "react";
import "./Song.scss";
import { connect } from "react-redux";
import { getUserData } from "./../../ducks/userReducer";
import axios from "axios";
import Slot from "./Slot/Slot";

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
      songTranslation: [],
      visibleExplanation: "",
      isExplanationHidden: true
    };
  }

  componentDidMount() {
    this.getSongInstance();
  }

  getSongInstance = async () => {
    try {
      const { songID } = this.props.match.params;
      const result = await axios.get(`/song/${songID}`);
      // console.log(result);
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
      // console.log(result);
      this.setState({
        songTranslation: result.data.songTranslation,
        newArr: result.data.newArr
      });
    } catch (err) {
      console.log(
        `The getSongTranslation method on the Song component had a problem: ${err}`
      );
    }
  };

  editSong = () => {
    
  }

  setExplanation = async explanation => {
    this.setState({
      visibleExplanation: explanation
    });
  };

  isExplanationHidden = bool => {
    if (this.state.songTranslation[0]) {
      this.setState({
        isExplanationHidden: bool
      });
    }
  };

  render() {
    console.log(this.state);
    let mappedSlots = this.state.songLines.map((line, i) => {
      let filteredLine = this.state.songTranslation.filter(
        transLine => transLine.line_id === line.line_id
      );
      return (
        <Slot
          ogLine={line}
          transLine={filteredLine}
          setExplanation={this.setExplanation}
          isExplanationHidden={this.isExplanationHidden}
        />
      );
    });
    let mappedLanguages = this.state.songTranslationLanguages.map(
      (translationLanguage, i) => {
        return (
          <div
            className="language-button"
            key={i}
            onClick={() =>
              this.getSongTranslation(translationLanguage.language_id)
            }
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
              <div className="languages-box">{mappedLanguages}</div>
              <div className="bottom-line">
                <h5>Author: {this.state.userName}</h5>
                {this.state.songTranslation[0] && <button onClick={() => this.editSong()}>Edit Song</button>}
              </div>
            </div>
          </div>
        </div>
        <div className="song-page-main-space">
          <div
            className="lyrics-space"
            onMouseOver={() => this.isExplanationHidden(false)}
            onMouseOut={() => this.isExplanationHidden(true)}
          >
            {mappedSlots}
          </div>
          <div className="explanation-box-holder">
            {!this.state.isExplanationHidden && (
              <div className="explanation-box">
                <div className="explanation">
                  <p>{this.state.visibleExplanation}</p>
                </div>
              </div>
            )}
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
)(Song);

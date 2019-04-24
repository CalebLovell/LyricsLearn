import React, { Component } from "react";
import "./Song.scss";
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
      songTranslation: [],
      visibleExplanation: "",
      // lineID: "",
      // transID: ""
    };
    // this.slot = React.createRef();
  }

  componentDidMount() {
    this.getSongInstance();
  }

  getSongInstance = async () => {
    try {
      const { songID } = this.props.match.params;
      const result = await axios.get(`/song/${songID}`);
      console.log(result.data)
      // console.log(result.data.songLines[5].line_id);
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
      console.log(result.data.songTranslation[5].line_id);
      this.setState({
        songTranslation: result.data.songTranslation
      });
    } catch (err) {
      console.log(
        `The getSongTranslation method on the Song component had a problem: ${err}`
      );
    }
  };

  setExplanation = async explanation => {
    this.setState({
      visibleExplanation: explanation
    });
    console.log(this.slot)
  };

  // highlight = (lineID) => {
  //   style="red"
  // }

  // setLineID = (lineID) => {
  //   this.setState({
  //     lineID
  //   })
  //   console.log(lineID)
  // }

  // setTransID = (transID) => {
  //   this.setState({
  //     transID
  //   })
  //   console.log(transID)
  // }

  render() {
    let mappedLyrics = this.state.songLines.map((line, i) => {
      
      return (
        <div
          className="line-slot"
          // ref={this.slot}
          key={i}
          onClick={() => this.setExplanation(line.line_explanation)}
          // onMouseOver={() => this.highlight(line.line_id)}
          // style={(this.state.lineID === this.state.transID) ? {color: '#fc4a1a'} : {}}
        >
          <p className="line-lyrics">{line.line_lyrics}</p>
        </div>
      );
    });
    let mappedTranslation = this.state.songTranslation.map(
      (translatedLine, i) => {
        return (
          <div
            className="line-slot"
            // ref={this.slot}
            key={i}
            onClick={() =>
              this.setExplanation(translatedLine.line_translation_explanation)
            }
            // onMouseOver={() => this.setTransID(translatedLine.line_id)}
          >
            <p className="line-lyrics">
              {translatedLine.line_translation_lyrics}
            </p>
          </div>
        );
      }
    );
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
              <div className="languages-box">
                {mappedLanguages}

                <div className="language-button">
                  <div className="language-flag-div">
                    <img
                      src="https://cdn2.iconfinder.com/data/icons/flags_gosquared/64/Italy_flat.png"
                      alt="language flag"
                    />
                  </div>
                  <span>Italian</span>
                </div>
              </div>
              <h5>Translator: {this.state.userName}</h5>
            </div>
          </div>
        </div>
        <div className="song-page-main-space">
          <div className="lyrics-space">
            <div className="lyrics-box">{mappedLyrics}</div>
            <div className="translation-box">{mappedTranslation}</div>
          </div>
          <div className="explanation-box">
            <div className="explanation">
              <p>{this.state.visibleExplanation}</p>
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
)(Song);

// const slot = document.getElementsByClassName("line-slot")
// const leftSlot = slot.getElementsByClassName("left")[i];
// const rightSlot = slot.getElementsByClassName("right")[i];
// leftSlot.onmouseover = function() {
//   leftSlot.style.color = "red";
//   rightSlot.style.color = "red";
// }
// leftSlot.onmouseout = function() {
//   leftSlot.style.color = "red";
//   rightSlot.style.color = "white";
// };
// rightSlot.onmouseover = function() {
//   leftSlot.style.color = "red";
//   rightSlot.style.color = "red";
// }
// rightSlot.onmouseout = function() {
//   leftSlot.style.color = "white";
//   rightSlot.style.color = "white";
// };

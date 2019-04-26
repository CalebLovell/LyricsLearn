import React, { Component } from "react";
import "./Add.scss";
import { connect } from "react-redux";
import { getUserData } from "./../../ducks/userReducer";
import axios from "axios";

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songInstanceTitle: "",
      artistName: "",
      languageName: "",
      songInstanceArt: "",
      lineLyrics: "",
      lineTranslationLyrics: "",
      lineTranslationExplanations: ""
    };
  }

  componentDidMount() {
    this.props.getUserData();
  }

  splitText() {
    const arrayOfLines = this.state.lineLyrics.split("\n");
    for (let i = arrayOfLines.length - 1; i > 0; i--) {
      if (arrayOfLines[i] === "") {
        arrayOfLines.splice(i, 1);
      }
    }
    console.log(arrayOfLines);
  }

  submitSongInfo = async () => {
    const { id } = this.props.user;
    console.log(id);
    const {
      songInstanceTitle,
      artistName,
      languageName,
      songInstanceArt,
      lineLyrics,
      lineTranslationLyrics,
      lineTranslationExplanations
    } = this.state;
    try {
      const { id } = this.props.user;
      const result = await axios.post("/create", {
        id,
        songInstanceTitle,
        artistName,
        languageName,
        songInstanceArt,
        lineLyrics,
        lineTranslationLyrics,
        lineTranslationExplanations
      });
      if (result.data.submitted === true) {
        this.props.history.push("/profile");
      } else {
        alert(`Song submission failed.`);
      }
    } catch (err) {
      console.log(`There was a problem in your submitSongInfo method: ${err}`);
    }
  };

  render() {
    // console.log(this.state);
    return (
      <div className="add-page">
        <button onClick={() => this.splitText()}>Split</button>
        <div className="add-page-details-form">
          <input
            onChange={e => this.setState({ songInstanceTitle: e.target.value })}
            value={this.state.songInstanceTitle}
            type="text"
            placeholder="Enter Song Title"
          />
          <input
            onChange={e => this.setState({ artistName: e.target.value })}
            value={this.state.artistName}
            type="text"
            placeholder="Enter Artist Name"
          />
          <input
            onChange={e => this.setState({ languageName: e.target.value })}
            value={this.state.languageName}
            type="text"
            placeholder="Enter Language Name"
          />
          <input
            onChange={e => this.setState({ songInstanceArt: e.target.value })}
            value={this.state.songInstanceArt}
            type="text"
            placeholder="Enter Instance Art"
          />
        </div>
        <div className="add-page-text-areas">
          <textarea
            className="og-lyrix text-area"
            placeholder="Enter Lyrics"
            onChange={e => this.setState({ lineLyrics: e.target.value })}
            value={this.state.lineLyrics}
            type="text"
          />
          <textarea
            className="trans-lyrix text-area"
            placeholder="Enter Translations"
            onChange={e =>
              this.setState({ lineTranslationLyrics: e.target.value })
            }
            value={this.state.lineTranslationLyrics}
            type="text"
          />
          <textarea
            className="explanations text-area"
            placeholder="Enter Explanations"
            onChange={e =>
              this.setState({ lineTranslationExplanations: e.target.value })
            }
            value={this.state.lineTranslationExplanations}
            type="text"
          />
        </div>
        <button onClick={() => this.submitSongInfo()}>Submit</button>
      </div>
    );
  }
}

const mapState = reduxState => reduxState;

export default connect(
  mapState,
  { getUserData }
)(Add);

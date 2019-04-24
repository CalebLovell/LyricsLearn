import React, { Component } from "react";
import "./Add.scss";
import { connect } from "react-redux";
import { getUserData } from "./../../ducks/userReducer";
import axios from "axios";

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: "",
      songInstanceTitle: "",
      artistName: "",
      languageName: "",
      songInstanceArt: "",
      lineLyrics: "",
      lineExplanation: "",
      lineIndex: "",
      lineTranslationLyrics: "",
      lineTranslationExplanation: ""
    };
  }

  render() {
    return (
      <div className="add-page">
        <div className="add-page-top-banner">
          <div className="add-page-display-box">
            <div className="add-details-form">
              <input
                onChange={e =>
                  this.setState({ songInstanceTitle: e.target.value })
                }
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
                onChange={e =>
                  this.setState({ songInstanceArt: e.target.value })
                }
                value={this.state.songInstanceArt}
                type="text"
                placeholder="Enter Instance Art"
              />
            </div>
          </div>
        </div>
        <div className="add-page-main-space">
          <div className="og-lyrix-input" />
          <div className="trans-lyrix-input" />
        </div>
      </div>
    );
  }
}

export default Add;

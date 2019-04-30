import React, { Component } from "react";
import "./Profile.scss";
import { connect } from "react-redux";
import { getUserData, killUser } from "./../../ducks/userReducer";
import { Link } from "react-router-dom";
import axios from "axios";
import SongInstance from "../SongInstance/SongInstance";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userSongs: []
    };
  }

  componentDidMount = async () => {
    await this.props.getUserData();
    this.getUserSongs(this.props.user.id);
  };

  getUserSongs = async id => {
    try {
      const result = await axios.get(`/user/songs/${id}`);
      this.setState({
        userSongs: result.data.userSongsList
      });
    } catch (err) {
      console.log(
        `The getUserSongs method on the Profile component had a problem: ${err}`
      );
    }
  };

  deleteSongInstance = async songID => {
    // try {
      await axios.delete(`/song/${songID}`);
    // } catch (err) {
    //   console.log(
    //     `The deleteSongInstance method on the Profile component had a problem: ${err}`
    //   );
    // }
  };

  render() {
    const { id, name, image } = this.props.user;
    let mappedUserSongs = this.state.userSongs.map((song, i) => {
      return (
        <SongInstance
          key={i}
          song={song}
          userID={id}
          deleteSongInstance={this.deleteSongInstance}
        />
      );
    });
    return (
      <>
        {id && (
          <div className="profile-page">
            <div className="top-banner">
              <div className="account-info-container">
                <div className="account-pic">
                  <img src={`${image}`} alt="profile pic" />
                </div>
                <h1>{`${name}`}</h1>
                <div className="buttons-container">
                  <Link to="/add">
                    <div className="lefty">
                      <button className="left-button">Add a Song</button>
                    </div>
                  </Link>
                  <Link to="/editInfo">
                    <div className="righty">
                      <button className="right-button">Edit Account</button>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="main-banner">
              <div className="users-songs-title">
                <h1>Your Songs</h1>
              </div>
              <div className="user-songs-container">{mappedUserSongs}</div>
            </div>
          </div>
        )}
      </>
    );
  }
}
const mapState = reduxState => reduxState;

export default connect(
  mapState,
  { getUserData, killUser }
)(Profile);

import React, { Component } from "react";
import "./Profile.css";
import { connect } from "react-redux";
import { getUserData, killUser } from "./../../ducks/userReducer";
import { Link } from "react-router-dom";
import axios from "axios";

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

  viewSong = () => {

  }

  render() {
    const { id, name, image } = this.props.user;
    let mappedUserSongs = this.state.userSongs.map((song, i) => {
      return (
        // <button ></button>
        <div className="song-instance-box" onClick={e => this.viewSong()} key={i}>
          <div className="album-art-container">
            <img src={`${song.song_instance_art}`} alt="album art" />
          </div>
          <p>{song.song_instance_title}</p>
          <p>{song.artist_name}</p>
          <p>{song.user_name}</p>
        </div>
      );
    });
    return (
      <>
        {id && (
          <div className="profile-page">
            <div className="account-info-container">
              <div className="account-pic">
                <img src={`${image}`} alt="profile pic" />
              </div>
              <h1>{`${name}`}</h1>
              <div className="account-buttons-container">
                <Link to="/add">
                  <button>Add a Song</button>
                </Link>
                <Link to="/editInfo">
                  <button>Edit Account Info</button>
                </Link>
              </div>
            </div>
            <div className="user-songs-container">{mappedUserSongs}</div>
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

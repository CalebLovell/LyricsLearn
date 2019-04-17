import React, { Component } from "react";
import { connect } from "react-redux";
import { getData, killUser } from "./../../ducks/userReducer";
import { Link } from "react-router-dom";
import "./Profile.css";

class Profile extends Component {
  componentDidMount() {
    this.props.getData();
  }

  render() {
    const { id, name, image } = this.props.user;
    console.log(this.props.user);
    return (
      <div className="profile-page">
        {id ? (
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
        ) : (
          <div>
            <p>Please log in first</p>
            <Link to="/login">
              <button>Login</button>
            </Link>
          </div>
        )}
      </div>
    );
  }
}
const mapState = reduxState => reduxState;

export default connect(
  mapState,
  { getData, killUser }
)(Profile);

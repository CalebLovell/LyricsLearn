import React, { Component } from "react";
import { connect } from "react-redux";
import { getData, killUser } from "./../../ducks/userReducer";
import { Link } from "react-router-dom";

class Profile extends Component {
  componentDidMount() {
    this.props.getData();
  }

  render() {
    const { id, name, image } = this.props.user;
    console.log(this.props);
    return (
      <div>
        {id ? (
          <>
            <h1>Profile</h1>
            <div>
              <img src={`${image}`} alt="profile pic" />
            </div>
            <h1>{`${name}`}</h1>
            <button>Edit account information</button>
            <Link to="/add">
              <button>Add a Song</button>
            </Link>
          </>
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
